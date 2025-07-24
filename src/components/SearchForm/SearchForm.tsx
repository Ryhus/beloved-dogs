import { useState } from 'react';
import PopUpMessage from '../PopUpMessage/PopUpMessage';
import {
  searchBreeds,
  getAllBreeds,
} from '../../Services/DogService/DogService';

import type { Breed } from '../../Services/DogService/types';
import type { FormEvent, ChangeEvent } from 'react';

import './SearchFormStyles.scss';

interface SearchFormProps {
  onSearch: (breeds: Breed[]) => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [input, setInput] = useState(
    localStorage.getItem('lastSearchTerm') || ''
  );
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedInput = input.trim();

    setError('');

    localStorage.setItem('lastSearchTerm', trimmedInput);

    try {
      if (trimmedInput === '') {
        const breedList = await getAllBreeds();
        onSearch(breedList);
      } else {
        const foundBreeds = await searchBreeds(trimmedInput);
        onSearch(foundBreeds);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError('Failed to load dog breeds. Please try again later.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  const handleClear = () => {
    setInput('');
    setError('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span>🔍</span>
      <input type="text" name="breed" value={input} onChange={handleChange} />
      <button type="button" className="clear-btn" onClick={handleClear}>
        ✖
      </button>
      <button type="submit" className="submit-btn">
        Search
      </button>
      {error && <PopUpMessage message={error} onClose={() => setError('')} />}
    </form>
  );
}

export default SearchForm;
