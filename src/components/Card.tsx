import { Component } from 'react';

type CardProps = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
};
class Card extends Component<CardProps> {
  render() {
    const { name, height, mass, birth_year, gender } = this.props;
    return (
      <div className="card">
        <h3 className="card-title">{name}</h3>
        <p>Height: {height} cm</p>
        <p>Mass: {mass} kg</p>
        <p>Birth Year: {birth_year}</p>
        <p>Gender: {gender}</p>
      </div>
    );
  }
}

export default Card;
