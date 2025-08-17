import { useState, useEffect } from 'react';

const SEARCH_KEY = 'searchQuery';

export function usePersistedSearchQuery() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(SEARCH_KEY);
    if (stored) {
      setQuery(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SEARCH_KEY, query);
  }, [query]);

  return [query, setQuery] as const;
}
