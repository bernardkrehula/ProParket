import supabase from "#/config/supabaseClientVite";
import { handleSupabaseError } from "#/lib/handleSupabaseError";

export const requestDashboardSummary = async () => {
  const response = await supabase
    .from("job_items")
    .select("price_per_m2, square_meters, material_cost");

  const authError = handleSupabaseError(response);
  if (authError) return authError;

  const items = response.data ?? [];

  const totalEarnings = items.reduce(
    (sum, item) => sum + item.price_per_m2 * item.square_meters,
    0,
  );
  const materialCost = items.reduce((sum, item) => sum + item.material_cost, 0);
  const netProfit = totalEarnings - materialCost;
  const jobsCount = items.length;

  return { totalEarnings, materialCost, netProfit, jobsCount };
};
