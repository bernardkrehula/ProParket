import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestDeleteJob = async (id: string) => {
  const deleteItemsResponse = await supabase.from("job_items").delete().eq("job_id", id);

  const itemsError = handleSupabaseError(deleteItemsResponse);
  if (itemsError) return itemsError;

  const response = await supabase.from("jobs").delete().eq("id", id);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  return response;
};
