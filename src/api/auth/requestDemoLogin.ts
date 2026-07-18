import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestDemoLogin = async () => {
  const response = await supabase.auth.signInAnonymously();

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
