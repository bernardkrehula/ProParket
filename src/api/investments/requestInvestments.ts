import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export type InvestmentRow = {
  id: string;
  name: string;
  category: string;
  unit_price: number;
  quantity: number;
  purchase_date: string;
  supplier: string | null;
  notes: string | null;
};

export const requestInvestments = async () => {
  const response = await supabase
    .from("investments")
    .select("id, name, category, unit_price, quantity, purchase_date, supplier, notes")
    .order("purchase_date", { ascending: false });

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
