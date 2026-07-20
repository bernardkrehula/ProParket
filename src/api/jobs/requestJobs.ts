import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestJobs = async (search?: string) => {
  const query = supabase
    .from("jobs")
    .select("*")
    .order("date", { ascending: false });

  let response;

  if (search) {
    response = await query.ilike("address", `%${search}%`);
  } else {
    response = await query;
  }

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
