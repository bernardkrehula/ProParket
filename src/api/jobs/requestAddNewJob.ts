import supabase from "#/config/supabaseClientVite";
import type { JobType } from "#/types/Job.type";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export type NewJob = Omit<JobType, "id" | "created_at">;

export const requestAddNewJob = async (job: NewJob) => {
  const response = await supabase
    .from("jobs")
    .insert(job)
    .select();

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
