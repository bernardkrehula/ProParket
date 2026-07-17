import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestJobPhotos = async (jobId: string) => {
  const response = await supabase.storage
    .from("job-photos")
    .list(jobId);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
