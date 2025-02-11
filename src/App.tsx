import { Component } from 'react';
import Search from './components/Search/Search';
import Results from './components/Results';
import Header from './components/Header';
import Pagination from './components/Pagination';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

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

class App extends Component<object, State> {
  state = {
    searchTerm: '',
    isLoading: false,
    error: null,
    results: [],
    currentPage: 1,
    totalPages: 1,
  };

  componentDidMount() {
    const savedResults = localStorage.getItem('swapiResults');
    if (savedResults) {
      this.setState({ results: JSON.parse(savedResults) });
    }
  }

  clearResults = () => {
    localStorage.removeItem('swapiResults');
    this.setState({
      results: [],
      searchTerm: '',
      currentPage: 1,
      totalPages: 1,
    });
  };

  fetchData = async (searchTerm: string, page: number = 1) => {
    this.setState({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      this.setState({
        results: data.results,
        totalPages: Math.ceil(data.count / 10),
        currentPage: page,
      });

      localStorage.setItem('swapiResults', JSON.stringify(data.results));
    } catch (error) {
      this.setState({ error: (error as Error).message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlePageChange = (newPage: number) => {
    this.fetchData(this.state.searchTerm, newPage);
  };

  render() {
    return (
      <ErrorBoundary>
        <Header />
        <Search fetchData={this.fetchData} clearResults={this.clearResults} />
        <ErrorButton />
        <div className="main-content">
          <Results
            results={this.state.results}
            error={this.state.error}
            isLoading={this.state.isLoading}
          />
        </div>
        <Pagination
          className="pagination"
          currentPage={this.state.currentPage}
          totalPages={this.state.totalPages}
          onPageChange={this.handlePageChange}
        />
      </ErrorBoundary>
    );
  }
}

export default App;
