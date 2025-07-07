import { useEffect, useState } from "react";

export const useFetch = <T>(
  fetchFuncton: () => Promise<T>,
  autoFetch = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  //   function to fetch the data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFuncton();

      setData(result);

      reset();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An Error occurred"));
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //   reset data
  const reset = async () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  //   useEffect to fetch execute the fetch data function
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};
