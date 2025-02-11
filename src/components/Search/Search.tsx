import React, { Component } from 'react';
import cl from './Search.module.css';

interface SearchProps {
  fetchData: (searchTerm: string) => void;
  clearResults: () => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  state = {
    searchTerm: '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    if (trimmedSearchTerm) {
      this.props.fetchData(trimmedSearchTerm);
    }
  };

  render() {
    return (
      <div className={cl.search_container}>
        <input
          className={cl.search_inp}
          type="text"
          placeholder="Search..."
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button className="button search-btn" onClick={this.handleSearch}>
          Search
        </button>
        <button className="button reset-btn" onClick={this.props.clearResults}>
          Clear
        </button>
      </div>
    );
  }
}

export default Search;
