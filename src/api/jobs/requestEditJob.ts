import supabase from "#/config/supabaseClientVite";
import type { EditedJob, } from "#/types/Job.type";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestEditJob = async (id: string, job: EditedJob) => {
  const response = await supabase
    .from("jobs")
    .update(job)
    .eq("id", id);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
