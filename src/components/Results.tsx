import React from 'react';
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

const Results: React.FC<ResultsProps> = (props) => {
  const { results, error, isLoading } = props;
  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;
  if (results.length === 0) return <p>No results found</p>;
  return <CardList results={results} />;
};

export default Results;
