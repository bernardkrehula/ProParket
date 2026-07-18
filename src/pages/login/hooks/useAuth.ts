import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = <T>(requestAuth: (payload: T) => Promise<unknown>) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (payload: T) => {
    setIsLoading(true);
    setError(null);

    try {
      await requestAuth(payload);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nešto je pošlo po krivu.");
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, handleAuth };
};
