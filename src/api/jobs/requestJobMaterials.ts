import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export type JobMaterialRow = {
  id: string;
  job_id: string;
  room: string | null;
  name: string;
  quantity: number;
  unit_price: number;
};

export const requestJobMaterials = async (jobId: string) => {
  const response = await supabase
    .from("job_materials")
    .select("id, job_id, room, name, quantity, unit_price")
    .eq("job_id", jobId)
    .order("created_at", { ascending: true });

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
