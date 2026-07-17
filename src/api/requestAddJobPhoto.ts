import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const MAX_JOB_PHOTO_SIZE_BYTES = 1 * 1024 * 1024;

export const requestAddJobPhoto = async (jobId: string, photo: File) => {
  if (photo.size > MAX_JOB_PHOTO_SIZE_BYTES) {
    throw new GenericError();
  }

  const filePath = `${jobId}/${Date.now()}-${photo.name}`;

  const response = await supabase.storage
    .from("job-photos")
    .upload(filePath, photo);

    const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
