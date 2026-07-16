import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

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

  if (response.error) {
    if (isAuthApiError(response)) {
      return response.error;
    } else {
      throw new GenericError();
    }
  }

  return response;
};
