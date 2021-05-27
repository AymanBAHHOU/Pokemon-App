import React from 'react';
import PokemonCard from './PokemonCard';

export default function PokemonList(props) {
  const { pokemons } = props;
  return (
    <div className="pokemon-grid">
    {pokemons.map((pokemon) => {
      return <PokemonCard data={pokemon} key={pokemon.name} />;
    })}
  </div>
  )
}
