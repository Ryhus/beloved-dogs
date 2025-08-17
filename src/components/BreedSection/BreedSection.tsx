'use client';

import {
  BreedList,
  Pagination,
  NoResultsPlaceholder,
  Loader,
  ErrorComponent,
} from '@/components';
import { useBreeds, useInvalidateBreeds } from '@/hooks/queries/dogQueries';
import { useSearchParams } from 'next/navigation';

export default function BreedSection() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') || 1) - 1;

  const searchTerm =
    searchParams.get('breed') || localStorage.getItem('lastSearchTerm') || '';

  const {
    data: breeds = [],
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useBreeds(page, searchTerm);

  const invalidateBreeds = useInvalidateBreeds();

  if (isLoading) return <Loader />;
  if (isError)
    return <ErrorComponent error={error as Error} onRetry={refetch} />;

  if (breeds.length === 0) return <NoResultsPlaceholder />;

  return (
    <>
      <button onClick={invalidateBreeds} className="refresh-btn">
        {isFetching && !isLoading ? <span className="spinner" /> : '🔄 Refresh'}
      </button>
      <BreedList breeds={breeds} breedId={1} />
      {!searchTerm && (
        <Pagination itemsOnCurrentPage={breeds.length} currentPage={page} />
      )}
    </>
  );
}
