import { Component } from 'react';
import Card from './Card';

type CardListProps = {
  results: {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    gender: string;
  }[];
};

class CardList extends Component<CardListProps> {
  render() {
    const { results } = this.props;
    return (
      <div className="grid-container">
        {results.map((character) => (
          <Card key={character.name} {...character} />
        ))}
      </div>
    );
  }
}

export default CardList;
