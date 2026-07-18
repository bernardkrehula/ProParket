import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestLogout = async () => {
  const response = await supabase.auth.signOut();

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
