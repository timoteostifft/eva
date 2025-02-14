import { useState } from "react";
import { api, Request, ApiError } from "../services/api";

export function useApi<T>(request: Request) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetch = async () => {
    setLoading(true);

    try {
      const data = await api.send<T>(request);
      setData(data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetch };
}
