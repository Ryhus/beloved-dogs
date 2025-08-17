'use client';

import {
  BreedList,
  Pagination,
  NoResultsPlaceholder,
  Loader,
  ErrorComponent,
} from '@/components';

import { useBreeds, useInvalidateBreeds } from '@/hooks/queries/dogQueries';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function BreedSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('home');
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

  const handleCardClick = (breedId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('details', breedId.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <button onClick={invalidateBreeds} className="refresh-btn">
        {isFetching && !isLoading ? <span className="spinner" /> : t('refresh')}
      </button>
      <BreedList breeds={breeds} onCardClick={handleCardClick} />
      {!searchTerm && (
        <Pagination itemsOnCurrentPage={breeds.length} currentPage={page} />
      )}
    </>
  );
}
