import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export type LoginCredentials = {
  email: string;
  password: string;
};

export const requestLogin = async (credentials: LoginCredentials) => {
  const response = await supabase.auth.signInWithPassword(credentials);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
