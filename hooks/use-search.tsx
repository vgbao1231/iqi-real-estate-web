'use client';

import { removeAccents } from '@/lib/utils';
import { useState, useMemo } from 'react';

type SearchKey<T> = keyof T;

export function useSearch<T extends Record<string, any>>(
  array: T[],
  keys: SearchKey<T>[] = [] // mặc định rỗng, có thể truyền ['name', 'description']
) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArray = useMemo(() => {
    if (!searchQuery.trim()) {
      return array;
    }

    const query = removeAccents(searchQuery.trim());

    return array.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        return (
          typeof value === 'string' && removeAccents(value).includes(query)
        );
      })
    );
  }, [array, searchQuery, keys]);
  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredArray,
    clearSearch,
    hasResults: filteredArray.length > 0,
    resultCount: filteredArray.length,
  };
}
