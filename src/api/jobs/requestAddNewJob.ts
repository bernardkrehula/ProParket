import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";
import type { NewJob } from "#/types/job.types.ts/Job.type";

export const requestAddNewJob = async (job: NewJob) => {
  const response = await supabase.from("jobs").insert(job).select();

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
