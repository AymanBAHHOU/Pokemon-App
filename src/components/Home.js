import React, { useState, useEffect } from 'react';
import { fetchAllPokemons, fetchPokemon } from '../utils/api';
import PokemonList from './PokemonList';
import NextPreviousPage from './NextPreviousPage';
import Loading from './Loading';


function Home() {

  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPokemons = async (url) => {
    setLoading(true);
    try {
      const data = await fetchAllPokemons(url);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
      const promises = data.results.map(async (pokemon) => {
        return await fetchPokemon(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemonData(results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }

  };


  useEffect(() => {
    getPokemons();
  }, []);


  return (

    <React.Fragment>

      { loading && <Loading />  }

      { error && <p className='center-text error'>{error}</p>}

      {
        (pokemonData?.length > 0 && error === null) ? (
          <React.Fragment>
            <NextPreviousPage
              next={nextUrl}
              previous={prevUrl}
              onFetch={getPokemons} />
            <PokemonList pokemons={pokemonData} />
          </React.Fragment>
        ) : null
      }


    </React.Fragment>
  )
}

export default Home;