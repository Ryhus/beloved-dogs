import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getAllBreeds,
  searchBreeds,
  getBreedById,
  searchImage,
} from '@/Services/DogService/DogService';

import type {
  BreedInfo,
  SearchImageResponse,
} from '@/Services/DogService/types';

const ITEMS_ON_PAGE = 10;

export function useBreeds(page: number, searchTerm: string) {
  const isSearch = Boolean(searchTerm?.trim());

  return useQuery<BreedInfo[]>({
    queryKey: ['breeds', { page, searchTerm }],
    queryFn: async () => {
      if (isSearch) {
        return await searchBreeds(searchTerm);
      }
      return await getAllBreeds(ITEMS_ON_PAGE, page);
    },
  });
}

export function useBreedDetails(breedId: number | undefined) {
  return useQuery<BreedInfo>({
    queryKey: ['breed', breedId],
    queryFn: async () => getBreedById(breedId),
    enabled: breedId != null,
  });
}

export function useSearchImage(breed_id: number | undefined) {
  return useQuery<SearchImageResponse>({
    queryKey: ['image', breed_id],
    queryFn: async () => searchImage({ breed_id }),
    enabled: breed_id != null,
  });
}

export function useInvalidateBreeds() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['breeds'] });
}
