import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestJobs = async (search?: string) => {
  const query = supabase
    .from("jobs")
    .select("*")
    .order("date", { ascending: false });

  let response;

  const term = search?.trim();
  if (term) {
    // Match address, client name or phone number. Commas and parentheses are
    // the PostgREST `or` separators, so strip them from the user's term.
    const safe = term.replace(/[(),]/g, " ");
    response = await query.or(
      `address.ilike.%${safe}%,client_name.ilike.%${safe}%,phone.ilike.%${safe}%`,
    );
  } else {
    response = await query;
  }

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
