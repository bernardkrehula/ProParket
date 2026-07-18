import supabase from "#/config/supabaseClientVite";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
 const { data: session, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: () => hanldeSession(),
  });
 
  const hanldeSession = async () => {
    return supabase.auth.getSession();
  };
  const clearSession = () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      subscription.unsubscribe();
    });
  };

  return { session, clearSession, isLoading };
};