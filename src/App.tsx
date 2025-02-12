import Search from './components/Search/Search';
import Results from './components/Results';
import Header from './components/Header';
import Pagination from './components/Pagination';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';
import { useEffect, useState } from 'react';

type Character = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
};

interface State {
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  results: Character[];
  currentPage: number;
  totalPages: number;
}

const App: React.FC = () => {
  const [state, setState] = useState<State>({
    searchTerm: '',
    isLoading: false,
    error: null,
    results: [],
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    const savedResults = localStorage.getItem('swapiResults');
    if (savedResults) {
      setState((prevState) => ({
        ...prevState,
        results: JSON.parse(savedResults),
      }));
    }
  }, []);

  const fetchData = async (searchTerm: string, page: number = 1) => {
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }));

    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setState((prevState) => ({
        ...prevState,
        results: data.results,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      }));

      localStorage.setItem('swapiResults', JSON.stringify(data.results));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: (error as Error).message,
      }));
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  const clearResults = () => {
    localStorage.removeItem('swapiResults');
    setState((prevState) => ({
      ...prevState,
      results: [],
      searchTerm: '',
      currentPage: 1,
      totalPages: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    fetchData(state.searchTerm, newPage);
  };

  return (
    <ErrorBoundary>
      <Header />
      <Search fetchData={fetchData} clearResults={clearResults} />
      <ErrorButton />
      <div className="main-content">
        <Results
          results={state.results}
          error={state.error}
          isLoading={state.isLoading}
        />
      </div>
      <Pagination
        className="pagination"
        currentPage={state.currentPage}
        totalPages={state.totalPages}
        onPageChange={handlePageChange}
      />
    </ErrorBoundary>
  );
};

export default App;

//   render() {
//     return (

//     );
//   }
// }

//
