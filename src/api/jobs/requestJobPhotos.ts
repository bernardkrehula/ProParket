import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestJobPhotos = async (jobId: string) => {
  const response = await supabase.storage.from("job-photos").list(jobId);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  const files = (response.data ?? []).filter((file) => file.id);
  const paths = files.map((file) => `${jobId}/${file.name}`);

  if (paths.length === 0) return { ...response, data: [] };

  const signedResponse = await supabase.storage
    .from("job-photos")
    .createSignedUrls(paths, 60 * 60); 

  const signError = handleSupabaseError(signedResponse);
  if (signError) return signError;

  const photos = files.map((file, i) => ({
    name: file.name,
    url: signedResponse.data?.[i]?.signedUrl,
  }));

  return { ...response, data: photos };
};