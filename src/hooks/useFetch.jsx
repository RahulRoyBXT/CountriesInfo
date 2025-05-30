import { useState, useEffect, useCallback } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  const fetchData = useCallback(async () => {
    // Abort previous requests
    if (controller) {
      controller.abort();
    }

    // Create a new AbortController
    const newController = new AbortController();
    setController(newController);

    try {
      setLoading(true);
      setError(null);

      // Check if we have cached data
      const cachedData = sessionStorage.getItem(url);
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      const response = await fetch(url, {
        signal: newController.signal,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      // Cache the result
      sessionStorage.setItem(url, JSON.stringify(result));
      
      setData(result);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error(`Failed to fetch data from ${url}:`, err);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();

    return () => {
      // Cleanup: abort fetch when component unmounts
      if (controller) {
        controller.abort();
      }
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useFetch;
