import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestJobItems = async (jobId: string) => {
  const response = await supabase.from("job_items").select("*").eq("job_id", jobId);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
