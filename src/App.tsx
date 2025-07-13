import React, { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import BreedList from './components/BreedList/BreedList';
import { getAllBreeds } from './Services/DogService/DogService';
import Loader from './components/Loader/Loader';
import type { Breed } from './Services/DogService/types';

import './styles/main.scss';

interface AppState {
  breeds: Breed[];
  loading: boolean;
  forceError: boolean;
}

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    breeds: [],
    loading: false,
    forceError: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const breeds = await getAllBreeds();
      this.setState({ breeds });
    } catch (error) {
      console.error('Failed to fetch breeds on load', error);
    } finally {
      this.setState({ loading: false });
    }
  }

  handleSearch = async (breeds: Breed[]) => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ breeds, loading: false });
    }, 500);
  };

  triggerError = () => {
    this.setState({ forceError: true });
  };

  render(): React.ReactNode {
    const { loading, breeds, forceError } = this.state;

    if (forceError) throw new Error('Error is tested!');

    return (
      <div className="app-layout">
        <SearchForm onSearch={this.handleSearch} />
        {loading ? <Loader /> : <BreedList breeds={breeds} />}
        <button className="error-button" onClick={this.triggerError}>
          🐾 Trigger Error
        </button>
      </div>
    );
  }
}

export default App;
