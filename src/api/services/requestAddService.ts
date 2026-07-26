import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestAddService = async (values: {
  name: string;
  price_per_m2: number;
}) => {
  const response = await supabase.from("services").insert(values).select();

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
