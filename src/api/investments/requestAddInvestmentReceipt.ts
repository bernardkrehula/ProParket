import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { handleSupabaseError } from "#/lib/handleSupabaseError";
import imageCompression from "browser-image-compression";
import { BILL_PHOTOS_BUCKET } from "./requestInvestmentReceipts";

export const MAX_BILL_PHOTO_SIZE_BYTES = 1 * 1024 * 1024;

export const requestAddInvestmentReceipt = async (
  investmentId: string,
  receipt: File,
) => {
  const compressedReceipt = await imageCompression(receipt, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  });

  if (compressedReceipt.size > MAX_BILL_PHOTO_SIZE_BYTES) {
    throw new GenericError();
  }

  const filePath = `${investmentId}/${Date.now()}-${compressedReceipt.name}`;

  const response = await supabase.storage
    .from(BILL_PHOTOS_BUCKET)
    .upload(filePath, compressedReceipt);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
