import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";
import { BILL_PHOTOS_BUCKET } from "./requestInvestmentReceipts";

export const requestDeleteInvestmentReceipt = async (
  investmentId: string,
  fileName: string,
) => {
  const filePath = `${investmentId}/${fileName}`;

  const response = await supabase.storage
    .from(BILL_PHOTOS_BUCKET)
    .remove([filePath]);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
