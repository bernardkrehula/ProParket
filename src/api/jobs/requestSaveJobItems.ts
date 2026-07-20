import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export type JobItemInput = {
  service_id: string;
  square_meters: number;
  price_per_m2: number;
  material_cost: number;
};

export const requestSaveJobItems = async (jobId: string, items: JobItemInput[]) => {
  const deleteResponse = await supabase.from("job_items").delete().eq("job_id", jobId);

  const deleteError = handleSupabaseError(deleteResponse);
  if (deleteError) return deleteError;

  if (items.length === 0) return deleteResponse;

  const insertResponse = await supabase
    .from("job_items")
    .insert(items.map((item) => ({ ...item, job_id: jobId })));

  const insertError = handleSupabaseError(insertResponse);
  if (insertError) return insertError;

  return insertResponse;
};
