import { useState } from "react";

type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useApi<T>(
  request: () => Promise<T>
): ApiState<T> & { execute: () => Promise<T | null> } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await request();
      setData(result);
      return result;
    } catch (requestError) {
      const normalizedError =
        requestError instanceof Error
          ? requestError
          : new Error("API request failed");

      setError(normalizedError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    execute,
  };
}