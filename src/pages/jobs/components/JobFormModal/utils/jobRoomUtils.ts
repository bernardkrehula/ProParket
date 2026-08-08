import type { JobItemInput } from "#/api/jobs/requestSaveJobItems";
import type { JobMaterialInput } from "#/api/jobs/requestSaveJobMaterials";
import type { JobMaterialRow } from "#/api/jobs/requestJobMaterials";
import type { JobType } from "#/types/job.types.ts/Job.type";
import { toDateInputValue } from "#/utils/format";
import { getTotalPrice } from "#/utils/getTotalPrice";
import {
  EMPTY_JOB_FORM_VALUES,
  type JobFormValues,
} from "./jobFormModalConfig";

export type JobMaterialFormItem = {
  id: string;
  name: string;
  quantity: string;
  unit_price: string;
};

export type JobRoomFormItem = {
  id: string;
  room: string;
  services: string[];
  square_meters: string;
  price_per_m2: string;
  materials: JobMaterialFormItem[];
};

export type JobItemsFieldsHandle = {
  getValues: () => JobRoomFormItem[];
};

type JobItemRow = {
  room: string | null;
  service_id: string;
  square_meters: number | null;
  price_per_m2: number | null;
  material_cost: number | null;
};

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export const createEmptyMaterial = (): JobMaterialFormItem => ({
  id: createId(),
  name: "",
  quantity: "1",
  unit_price: "",
});

export const createEmptyRoom = (): JobRoomFormItem => ({
  id: createId(),
  room: "",
  services: [],
  square_meters: "",
  price_per_m2: "",
  materials: [],
});

export const getMaterialTotal = (material: JobMaterialFormItem) => {
  const total =
    (Number(material.quantity) || 0) * (Number(material.unit_price) || 0);
  return Math.round(total * 100) / 100;
};

export const getRoomMaterialsTotal = (materials: JobMaterialFormItem[]) => {
  const total = materials.reduce(
    (sum, material) => sum + getMaterialTotal(material),
    0,
  );
  return Math.round(total * 100) / 100;
};

export const getRoomsTotal = (rooms: JobRoomFormItem[]) =>
  rooms.reduce(
    (sum, room) => sum + getTotalPrice(room.square_meters, room.price_per_m2),
    0,
  );

export const getRoomsMaterialsTotal = (rooms: JobRoomFormItem[]) =>
  rooms.reduce((sum, room) => sum + getRoomMaterialsTotal(room.materials), 0);

/**
 * Jobs created before the per-material breakdown existed only carry a single
 * `material_cost` number per room. Surface that as one editable line so the old
 * figure stays visible and is not silently dropped on the next save.
 */
const legacyMaterial = (materialSum: number): JobMaterialFormItem[] =>
  materialSum > 0
    ? [
        {
          id: createId(),
          name: "Materijal",
          quantity: "1",
          unit_price: String(materialSum),
        },
      ]
    : [];

export const groupJobItemsIntoRooms = (
  items: JobItemRow[],
  serviceIdToName: Map<string, string>,
  materials: JobMaterialRow[] = [],
): JobRoomFormItem[] => {
  type Acc = {
    id: string;
    room: string;
    services: string[];
    square_meters: string;
    priceSum: number;
    materialSum: number;
  };
  const roomsByName = new Map<string, Acc>();
  const order: string[] = [];

  items.forEach((item, index) => {
    const roomName = item.room ?? "";
    let room = roomsByName.get(roomName);
    if (!room) {
      room = {
        id: `room-${index}`,
        room: roomName,
        services: [],
        square_meters:
          item.square_meters != null ? String(item.square_meters) : "",
        priceSum: 0,
        materialSum: 0,
      };
      roomsByName.set(roomName, room);
      order.push(roomName);
    }
    const serviceName = serviceIdToName.get(item.service_id);
    if (serviceName) room.services.push(serviceName);
    room.priceSum += Number(item.price_per_m2) || 0;
    room.materialSum += Number(item.material_cost) || 0;
  });

  const materialsByRoom = new Map<string, JobMaterialFormItem[]>();
  materials.forEach((material) => {
    const roomName = material.room ?? "";
    const list = materialsByRoom.get(roomName) ?? [];
    list.push({
      id: material.id,
      name: material.name,
      quantity: String(material.quantity ?? ""),
      unit_price: String(material.unit_price ?? ""),
    });
    materialsByRoom.set(roomName, list);
  });

  // A room with no services selected produces no job_items rows, so it would
  // otherwise disappear on reload and take its materials with it.
  materialsByRoom.forEach((_list, roomName) => {
    if (roomsByName.has(roomName)) return;

    roomsByName.set(roomName, {
      id: `room-materials-${order.length}`,
      room: roomName,
      services: [],
      square_meters: "",
      priceSum: 0,
      materialSum: 0,
    });
    order.push(roomName);
  });

  // Only fall back to the old single figure when the job has no itemised
  // materials at all. Doing it per-room would relabel a genuinely empty room
  // as "Materijal" and hide a failed save behind plausible-looking data.
  const isLegacyJob = materials.length === 0;

  return order.map((name) => {
    const room = roomsByName.get(name)!;
    const stored = materialsByRoom.get(name) ?? [];

    return {
      id: room.id,
      room: room.room,
      services: room.services,
      square_meters: room.square_meters,
      price_per_m2: room.priceSum > 0 ? String(room.priceSum) : "",
      materials: isLegacyJob ? legacyMaterial(room.materialSum) : stored,
    };
  });
};

export const roomsToJobItems = (
  rooms: JobRoomFormItem[],
  serviceNameToId: Map<string, string>,
  servicePriceByName: Map<string, number>,
): JobItemInput[] =>
  rooms.flatMap((room) => {
    const squareMeters = Number(room.square_meters) || 0;
    const materialCost = getRoomMaterialsTotal(room.materials);

    const rows = room.services
      .map((serviceName) => {
        const serviceId = serviceNameToId.get(serviceName);
        if (!serviceId) return null;
        return {
          room: room.room.trim() || null,
          service_id: serviceId,
          square_meters: squareMeters,
          price_per_m2: servicePriceByName.get(serviceName) ?? 0,
          material_cost: 0,
        };
      })
      .filter((item): item is JobItemInput => item !== null);

    // The dashboard sums job_items.material_cost, so the room's material total
    // is folded onto its first row rather than duplicated across every service.
    if (rows.length > 0) rows[0].material_cost = materialCost;

    return rows;
  });

export const roomsToJobMaterials = (
  rooms: JobRoomFormItem[],
): JobMaterialInput[] =>
  rooms.flatMap((room) =>
    room.materials
      .filter((material) => material.name.trim() !== "")
      .map((material) => ({
        room: room.room.trim() || null,
        name: material.name.trim(),
        quantity: Number(material.quantity) || 0,
        unit_price: Number(material.unit_price) || 0,
      })),
  );

export const jobToFormValues = (job?: JobType | null): JobFormValues => {
  if (!job) return EMPTY_JOB_FORM_VALUES;

  return {
    address: job.address,
    client_name: job.client_name,
    phone: job.phone,
    date: toDateInputValue(job.date),
    end_date: toDateInputValue(job.end_date),
    start_time: job.start_time ?? "",
    date_finished: job.date_finished ?? "",
    notes: job.notes ?? "",
  };
};

export const REQUIRED_FIELDS: { key: keyof JobFormValues; label: string }[] = [
  { key: "address", label: "Adresa" },
  { key: "client_name", label: "Klijent" },
  { key: "phone", label: "Telefon" },
  { key: "date", label: "Planirani datum" },
  { key: "start_time", label: "Vrijeme početka" },
];
