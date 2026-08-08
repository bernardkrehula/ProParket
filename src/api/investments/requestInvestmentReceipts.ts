import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const INVESTMENT_RECEIPTS_BUCKET = "investment-receipts";

export const requestInvestmentReceipts = async (investmentId: string) => {
  const response = await supabase.storage
    .from(INVESTMENT_RECEIPTS_BUCKET)
    .list(investmentId);

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  const files = (response.data ?? []).filter((file) => file.id);
  const paths = files.map((file) => `${investmentId}/${file.name}`);

  if (paths.length === 0) return { ...response, data: [] };

  const signedResponse = await supabase.storage
    .from(INVESTMENT_RECEIPTS_BUCKET)
    .createSignedUrls(paths, 60 * 60);

  const signError = handleSupabaseError(signedResponse);
  if (signError) return signError;

  const receipts = files.map((file, i) => ({
    name: file.name,
    url: signedResponse.data?.[i]?.signedUrl,
  }));

  return { ...response, data: receipts };
};
