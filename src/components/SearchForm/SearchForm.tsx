import { Component } from 'react';
import {
  searchBreeds,
  getAllBreeds,
} from '../../Services/DogService/DogService';
import type { Breed } from '../../Services/DogService/types';
import type { FormEvent, ChangeEvent } from 'react';

import './SearchFormStyles.scss';

interface SearchFormState {
  input: string;
  error: string;
}

interface SearchFormProps {
  onSearch: (breeds: Breed[]) => void;
}

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  state: SearchFormState = {
    input: '',
    error: '',
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value, error: '' });
  };

  handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { input } = this.state;

    if (input.trim() === '') {
      const breedList = await getAllBreeds();
      this.props.onSearch(breedList);
      console.log(breedList);
    } else {
      console.log('Searching for:', input);
      const foundBreeds = await searchBreeds(input.trim());
      this.props.onSearch(foundBreeds);
      console.log(foundBreeds);
    }
  };

  handleClear = () => {
    this.setState({ input: '', error: '' });
  };

  render(): React.ReactNode {
    const { input, error } = this.state;

    return (
      <form className="search-bar" onSubmit={this.handleSubmit}>
        <span>🔍</span>
        <input
          type="text"
          name="breed"
          value={input}
          onChange={this.handleChange}
        />
        <button type="button" className="clear-btn" onClick={this.handleClear}>
          ✖
        </button>
        <button type="submit" className="submit-btn">
          Search
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    );
  }
}

export default SearchForm;
