import React, { useState, useEffect, useCallback } from 'react';
import { fetchPokemonsByType, fetchTypes, fetchPokemon } from '../utils/api';
import Paginator from './Paginator';
import PokemonCard from './PokemonCard';
import Loading from './Loading';

export default function TypesList() {

  const [types, setTypes] = useState([]);
  const [pokemonsByType, setPokemonByType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    const getTypes = async () => {
      setLoading(true);
      const data = await fetchTypes();
      setTypes(data.results);
      setLoading(false);
    };

    getTypes();
  }, []);


  const sendRequest = useCallback(async (url) => {
    const getPokemonsByType = async (api_url) => {
      setLoading(true);
      const data = await fetchPokemonsByType(api_url);
      const promises = data.pokemon.map(async (p) => {
        return await fetchPokemon(p.pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemonByType(results);
      setLoading(false);
    };
    if (isSending) {
      return;
    }
    setIsSending(true);
    await getPokemonsByType(url);
    setIsSending(false)
  }, [isSending]);



  return (
    <div>
      <ul className='flex-center'>
        {types.map((type) => (
          <li key={type.name}
            onClick={() => sendRequest(type.url)}>
            <small
              className="type nav-link"
            >
              <span>{type.name}</span>
            </small>
          </li>
        ))}
      </ul>
      { loading ?  <Loading /> :
        pokemonsByType?.length ===  0 ?  (<p> Please select a type to load pokémons</p>) :
        (<Paginator
          data={pokemonsByType}
          RenderComponent={PokemonCard}
          pageLimit={3}
          dataLimit={20}
        />)
      }

    </div>
  )
}
