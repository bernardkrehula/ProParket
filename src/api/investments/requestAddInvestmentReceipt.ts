import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { handleSupabaseError } from "#/lib/handleSupabaseError";
import imageCompression from "browser-image-compression";
import { INVESTMENT_RECEIPTS_BUCKET } from "./requestInvestmentReceipts";

export const MAX_RECEIPT_SIZE_BYTES = 1 * 1024 * 1024;

export const requestAddInvestmentReceipt = async (
  investmentId: string,
  receipt: File,
) => {
  // Receipts are kept larger than job photos: a compressed-to-1024px bill is
  // often too soft to read the line items back off during an inspection.
  const compressedReceipt = await imageCompression(receipt, {
    maxSizeMB: 1,
    maxWidthOrHeight: 2000,
    useWebWorker: true,
  });

  if (compressedReceipt.size > MAX_RECEIPT_SIZE_BYTES) {
    throw new GenericError();
  }

  const filePath = `${investmentId}/${Date.now()}-${compressedReceipt.name}`;

  const response = await supabase.storage
    .from(INVESTMENT_RECEIPTS_BUCKET)
    .upload(filePath, compressedReceipt);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
