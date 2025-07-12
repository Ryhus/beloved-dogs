import { Component } from 'react';
import BreedCard from '../BreedCard/BreedCard';
import type { Breed } from '../../Services/DogService/types';

import './BreedListStyles.scss';

interface BreedListProps {
  breeds: Breed[];
}

class BreedList extends Component<BreedListProps> {
  render(): React.ReactNode {
    return (
      <section className="breed-list">
        {this.props.breeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </section>
    );
  }
}

export default BreedList;
