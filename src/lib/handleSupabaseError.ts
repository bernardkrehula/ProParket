import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const handleSupabaseError = <T>(response: { error: T | null }) => {
  if (!response.error) return null;
  if (isAuthApiError(response)) return response.error;
  throw new GenericError();
};
