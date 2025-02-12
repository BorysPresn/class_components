import React, { useState } from 'react';
import cl from './Search.module.css';

interface SearchProps {
  fetchData: (searchTerm: string) => void;
  clearResults: () => void;
}

interface SearchState {
  searchTerm: string;
}

const Search: React.FC<SearchProps> = ( props ) => {
  const [ state, setState ] = useState<SearchState>({searchTerm: ''})

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ searchTerm: event.target.value });
  };

  const handleSearch = () => {
    const trimmedSearchTerm = state.searchTerm.trim();
    if (trimmedSearchTerm) {
      props.fetchData(trimmedSearchTerm);
    }
  };

  return (
    <div className={cl.search_container}>
      <input
        className={cl.search_inp}
        type="text"
        placeholder="Search..."
        value={state.searchTerm}
        onChange={handleInputChange}
      />
      <button className="button search-btn" onClick={handleSearch}>
        Search
      </button>
      <button className="button reset-btn" onClick={props.clearResults}>
        Clear
      </button>
    </div>
  );
}

export default Search;