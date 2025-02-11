import { Component } from 'react';
import CardList from './CardList';
import Spinner from './Spinner/Spinner';

interface ResultsProps {
  results: {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    gender: string;
  }[];
  error: string | null;
  isLoading: boolean;
}

class Results extends Component<ResultsProps> {
  render() {
    const { results, error, isLoading } = this.props;

    if (isLoading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;
    if (results.length === 0) return <p>No results found</p>;

    return <CardList results={results} />;
  }
}

export default Results;
