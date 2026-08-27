import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for performing resilient asynchronous API requests.
 * @param {string} url - API endpoint URL
 * @param {Object} options - fetch options
 * @returns {{ data: any, loading: boolean, error: string|null, refetch: Function }}
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'An unexpected fetch error occurred');
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
