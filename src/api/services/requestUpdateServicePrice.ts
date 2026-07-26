import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestUpdateServicePrice = async (
  id: string,
  pricePerM2: number,
) => {
  const response = await supabase
    .from("services")
    .update({ price_per_m2: pricePerM2 })
    .eq("id", id)
    .select();

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
