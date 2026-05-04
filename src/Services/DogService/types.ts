export interface Breed {
  id?: string;
  origin?: string;
  name?: string;
  temperament?: string;
  weight?: { imperial?: string; metric?: string };
  description?: string;
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  life_span?: string;
  indoor?: number;
  lap?: number;
  alt_names?: string;
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligenc?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
  experimental?: number;
  hairless?: number;
  natural?: number;
  rare?: number;
  rex?: number;
  suppressed_tail?: number;
  short_legs?: number;
  wikipedia_url?: string;
  hypoallergenic?: number;
  reference_image_id?: string;
  image?: { id: string; width: number; height: number; url: string };
}

export interface BreedInfo {
  id: number;
  name: string;
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  reference_image_id?: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  image?: {
    url: string;
  };
}

export type SearchBreedResponse = Breed[];

export interface ImageResponse {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
  categories: [];
}

export type SearchImageResponse = ImageResponse[];

export interface SearchImageParams {
  breed_id?: number;
  limit?: number;
  page?: number;
  order?: 'ASC' | 'DESC' | 'RANDOM';
  species_id?: string;
  breed_groups?: string;
  exclude_breed_groups?: string;
  lang?: string;
  has_breeds?: boolean;
  include_breeds?: boolean;
  include_categories?: boolean;
  account_id?: string;
  sub_id?: string;
}
