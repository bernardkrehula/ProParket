import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export type JobMaterialInput = {
  room: string | null;
  name: string;
  quantity: number;
  unit_price: number;
};

export const requestSaveJobMaterials = async (
  jobId: string,
  materials: JobMaterialInput[],
) => {
  const deleteResponse = await supabase
    .from("job_materials")
    .delete()
    .eq("job_id", jobId);

  const deleteError = handleSupabaseError(deleteResponse);
  if (deleteError) return deleteError;

  if (materials.length === 0) return deleteResponse;

  const insertResponse = await supabase
    .from("job_materials")
    .insert(materials.map((material) => ({ ...material, job_id: jobId })));

  const insertError = handleSupabaseError(insertResponse);
  if (insertError) return insertError;

  return insertResponse;
};
