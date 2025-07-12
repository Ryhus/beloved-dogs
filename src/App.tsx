import React, { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import BreedList from './components/BreedList/BreedList';
import type { Breed } from './Services/DogService/types';

import './styles/main.scss';

interface AppState {
  breeds: Breed[];
}

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    breeds: [],
  };

  handleSearch = (breeds: Breed[]) => {
    this.setState({ breeds });
  };

  render(): React.ReactNode {
    return (
      <div className="app-layout">
        <SearchForm onSearch={this.handleSearch} />
        <BreedList breeds={this.state.breeds}></BreedList>
      </div>
    );
  }
}

export default App;
