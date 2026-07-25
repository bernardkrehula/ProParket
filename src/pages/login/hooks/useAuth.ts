
import { GenericError } from "#/utils/GenericError";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as v from "valibot";
import type { LoginScheme } from "../loginScheme";
import { isAuthApiError } from "@supabase/supabase-js";
import type { Credentials } from "#/types/Credentials.type";
import type { Handler } from "#/types/Handler.type";

export const useAuth = (
  handler: Handler,
  authScheme: typeof LoginScheme,
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const LocalErrorValidator = (credentials: Credentials) => {
    const response = v.parse(authScheme, credentials);
    return response;
  };


  const clearErorrs = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const handleAuth = async (credentials: Credentials) => {
    setIsLoading(true);
    try {
      if(credentials != null) LocalErrorValidator(credentials);
      const result = await handler(credentials);

      if (isAuthApiError(result)) {
        setError(result.message);
      } else {
        setData(result);
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof v.ValiError) {
        setError(error.message);
      } else if (error instanceof GenericError) {
        setError(error.message);
      } else {
        console.error("Unknown error:", error);
        setError("An unexpected error occurred");
      }
    }
    setIsLoading(false);
    clearErorrs();
  };

  return { data, error, isLoading, handleAuth };
};