import { useSelectionStore } from '@/stores/selectionStore';
import { useSearchImage } from '@/hooks/queries/dogQueries';
import { ImageWithShimmer } from '../Shimmer';
import type { BreedInfo } from '@/Services/DogService/types';

import fallbackImage from '@/assets/fallback_dog.webp';

import './BreedCardStyles.scss';

interface BreedProps {
  breed: BreedInfo;
  onClick: () => void;
}

function BreedCard({ breed, onClick }: BreedProps) {
  const { toggleSelection, isSelected } = useSelectionStore();

  const { data: images = [], isLoading } = useSearchImage(breed.id);

  const selected = isSelected(breed.id);

  return (
    <div className="breed-card-container">
      <article className="breed-card" onClick={onClick}>
        <ImageWithShimmer
          src={images[0]?.url}
          alt={breed.name}
          isLoading={isLoading}
          fallback={fallbackImage}
        ></ImageWithShimmer>

        <h2>{breed.name}</h2>
      </article>
      <input
        className="card-checkbox"
        type="checkbox"
        checked={selected}
        onChange={() => toggleSelection(breed)}
      />
    </div>
  );
}

export default BreedCard;
