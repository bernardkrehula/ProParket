import type { JobItemInput } from "#/api/jobs/requestSaveJobItems";
import type { JobType } from "#/types/job.types.ts/Job.type";
import { toDateInputValue } from "#/utils/format";
import { getTotalPrice } from "#/utils/getTotalPrice";
import {
  EMPTY_JOB_FORM_VALUES,
  type JobFormValues,
} from "./jobFormModalConfig";

export type JobRoomFormItem = {
  id: string;
  room: string;
  services: string[];
  square_meters: string;
  price_per_m2: string;
  material_cost: string;
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

export const createEmptyRoom = (): JobRoomFormItem => ({
  id: createId(),
  room: "",
  services: [],
  square_meters: "",
  price_per_m2: "",
  material_cost: "",
});

export const getRoomsTotal = (rooms: JobRoomFormItem[]) =>
  rooms.reduce(
    (sum, room) => sum + getTotalPrice(room.square_meters, room.price_per_m2),
    0,
  );

export const groupJobItemsIntoRooms = (
  items: JobItemRow[],
  serviceIdToName: Map<string, string>,
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

  return order.map((name) => {
    const room = roomsByName.get(name)!;
    return {
      id: room.id,
      room: room.room,
      services: room.services,
      square_meters: room.square_meters,
      price_per_m2: room.priceSum > 0 ? String(room.priceSum) : "",
      material_cost: room.materialSum > 0 ? String(room.materialSum) : "",
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
    const materialCost = Number(room.material_cost) || 0;

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

    if (rows.length > 0) rows[0].material_cost = materialCost;

    return rows;
  });

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
