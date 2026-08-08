import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";
import type { NewInvestment } from "./requestAddInvestment";

export const requestUpdateInvestment = async (
  id: string,
  values: Partial<NewInvestment>,
) => {
  const response = await supabase
    .from("investments")
    .update(values)
    .eq("id", id)
    .select();

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
