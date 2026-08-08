import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export type NewInvestment = {
  name: string;
  category: string;
  unit_price: number;
  quantity: number;
  purchase_date: string;
  supplier: string | null;
  notes: string | null;
};

export const requestAddInvestment = async (values: NewInvestment) => {
  const response = await supabase.from("investments").insert(values).select();

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
