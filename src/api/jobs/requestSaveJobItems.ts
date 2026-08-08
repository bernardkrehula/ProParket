import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";

export type JobItemInput = {
  room: string | null;
  service_id: string;
  square_meters: number;
  price_per_m2: number;
  material_cost: number;
};

export const requestSaveJobItems = async (jobId: string, items: JobItemInput[]) => {
  const deleteResponse = await supabase.from("job_items").delete().eq("job_id", jobId);

  if (deleteResponse.error) {
    throw new GenericError(
      `job_items (brisanje): ${deleteResponse.error.message}`,
    );
  }

  if (items.length === 0) return deleteResponse;

  const insertResponse = await supabase
    .from("job_items")
    .insert(items.map((item) => ({ ...item, job_id: jobId })));

  if (insertResponse.error) {
    throw new GenericError(
      `job_items (spremanje): ${insertResponse.error.message}`,
    );
  }

  return insertResponse;
};
