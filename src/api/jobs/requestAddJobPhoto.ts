import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { handleSupabaseError } from "#/lib/handleSupabaseError";
import imageCompression from "browser-image-compression";

export const MAX_JOB_PHOTO_SIZE_BYTES = 1 * 1024 * 1024;

export const requestAddJobPhoto = async (jobId: string, photo: File) => {
  const compressedPhoto = await imageCompression(photo, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  });

  if (compressedPhoto.size > MAX_JOB_PHOTO_SIZE_BYTES) {
    throw new GenericError();
  }

  const filePath = `${jobId}/${Date.now()}-${compressedPhoto.name}`;

  const response = await supabase.storage
    .from("job-photos")
    .upload(filePath, compressedPhoto);
  console.log(compressedPhoto)
  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
