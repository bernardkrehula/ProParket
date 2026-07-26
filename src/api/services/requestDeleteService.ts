import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestDeleteService = async (id: string) => {
  const response = await supabase.from("services").delete().eq("id", id);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
