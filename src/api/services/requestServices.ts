import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export type ServiceRow = {
  id: string;
  name: string;
  price_per_m2: number;
};

export const requestServices = async () => {
  const response = await supabase
    .from("services")
    .select("id, name, price_per_m2")
    .order("name", { ascending: true });

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
