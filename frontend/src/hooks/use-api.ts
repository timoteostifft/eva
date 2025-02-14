import { useEffect, useState } from "react";
import { api, Request } from "../services/api";

export function useApi<T>(request: Request) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = async () => {
    setLoading(true);

    try {
      const data = await api.send<T>(request);
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao buscar dados"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, error, fetch };
}
