import { Component } from 'react';
import type { Breed } from '../../Services/DogService/types';

import './BreedCardStyles.scss';

interface BreedProps {
  breed: Breed;
}

class BreedCard extends Component<BreedProps> {
  render(): React.ReactNode {
    const { breed } = this.props;

    return (
      <article className="breed-card">
        <img src={breed.image?.url} alt={breed.name}></img>
        <h2>{breed.name}</h2>
      </article>
    );
  }
}

export default BreedCard;
