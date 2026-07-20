import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestDeleteJobPhoto = async (jobId: string, fileName: string) => {
  const filePath = `${jobId}/${fileName}`;

  const response = await supabase.storage.from("job-photos").remove([filePath]);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
