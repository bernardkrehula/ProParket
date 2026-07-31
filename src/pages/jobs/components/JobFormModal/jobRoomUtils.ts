import type { JobItemInput } from "#/api/jobs/requestSaveJobItems";
import { getTotalPrice } from "#/utils/getTotalPrice";

/** One editable room in the job form; its services share the same m² and cost. */
export type JobRoomFormItem = {
  id: string;
  room: string;
  /** One room can have several services selected in the same input. */
  services: string[];
  square_meters: string;
  price_per_m2: string;
  material_cost: string;
};

export type JobItemsFieldsHandle = {
  getValues: () => JobRoomFormItem[];
};

/** A stored `job_items` row: one service line of one room. */
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

/**
 * Flat job_items rows are grouped back into rooms by room name: a room's
 * services collapse into one multi-select, its price per m² is the sum of the
 * rows' rates, and its material cost the sum of the rows' material.
 */
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

/** Expands the form's rooms back into one job_items row per selected service. */
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
          // Each service is stored at its own price-list rate so per-service
          // earnings stay correct; the room total is their sum × m².
          price_per_m2: servicePriceByName.get(serviceName) ?? 0,
          material_cost: 0,
        };
      })
      .filter((item): item is JobItemInput => item !== null);

    // Attach the room's material cost to a single row to avoid double-counting.
    if (rows.length > 0) rows[0].material_cost = materialCost;

    return rows;
  });
