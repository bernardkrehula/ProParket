import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";
import { INVESTMENT_RECEIPTS_BUCKET } from "./requestInvestmentReceipts";

export const requestDeleteInvestmentReceipt = async (
  investmentId: string,
  fileName: string,
) => {
  const filePath = `${investmentId}/${fileName}`;

  const response = await supabase.storage
    .from(INVESTMENT_RECEIPTS_BUCKET)
    .remove([filePath]);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
