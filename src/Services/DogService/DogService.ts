import apiClient from './apiClient';

import type {
  BreedInfo,
  SearchImageResponse,
  SearchImageParams,
} from './types';

export async function getAllBreeds(limit: number = 10, page: number = 0) {
  const response = await apiClient.get<BreedInfo[]>(`/breeds`, {
    params: { limit, page },
  });
  return response.data;
}

export async function searchBreeds(q: string) {
  const response = await apiClient.get<BreedInfo[]>(`/breeds/search`, {
    params: { q },
  });
  return response.data;
}

export async function getBreedById(breedId: number | undefined) {
  const response = await apiClient.get<BreedInfo>(`/breeds/` + breedId);
  return response.data;
}

export async function searchImage(params: SearchImageParams) {
  const response = await apiClient.get<SearchImageResponse>(`/images/search`, {
    params,
  });

  return response.data;
}
