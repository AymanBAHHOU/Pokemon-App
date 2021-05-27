import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GiBodyHeight, GiWeight, GiThorHammer } from 'react-icons/gi';
import { TiArrowRightOutline } from  'react-icons/ti';
import ProgressBar from './ProgressBar';
import Loading from './Loading';
import { fetchPokemon, fetchSpecies, fetchEvolutions } from '../utils/api';
import { API_CHAIN_URL, API_SPECIES_URL, API_URL, TYPE_COLORS } from '../utils/constants';

export default function ViewPokemon() {

  const { id } = useParams();

  const [pokemonData, setPokemonData] = useState({});
  const [evolutions, setEvolutions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const getEvols = (obj) => {
    let res = [];
    do {
      let evoDetails = obj['evolution_details'][0];
      res.push({
        "species_name": obj.species.name,
        "min_level": !evoDetails ? 1 : evoDetails.min_level,
        "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
        "url": obj.species.url
      });

      obj = obj['evolves_to'][0];
    } while (!!obj && obj.hasOwnProperty('evolves_to'));
    return res;
  };


  

  useEffect(() => {
    const getPokemonAndItsEvolutionsChain = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemon(`${API_URL}/${id}`);
        const evolChainNumber = await fetchSpecies(id);
        const evolChainId = evolChainNumber.evolution_chain.url.replace(API_CHAIN_URL, '').replaceAll('/', '');
        const chain = await fetchEvolutions(evolChainId);
        setEvolutions(chain);
        setPokemonData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    getPokemonAndItsEvolutionsChain();
  }, [id]);


  const { name, sprites, types, height, weight, abilities, stats } = pokemonData;
  const { chain } = evolutions;
  const firstType = pokemonData.types ? pokemonData.types[0].type.name : '';

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }


  return (
    <>
      { loading && <Loading />  }

      { error && <p className='center-text error'>{error}</p>}


      {
        (!isEmpty(pokemonData) &&  !isEmpty(evolutions) && error === null) ?  (
          <>
            <h2 className="pokemon__detail__header">{name}</h2>
            <div className='pokemon__detail__row'>
              <div className="pokemon__detail__img">
                <img src={sprites?.other['official-artwork'].front_default} alt={name} />
              </div>
              <div className="pokemon__detail__data">
                <h3>Pokémon data</h3>
                <div>
                  <div className="pokemon__detail__data__item">
                    <label>
                      National N°
                    </label>
                    <span>
                      {id}
                    </span>
                  </div>
                  <div className="pokemon__detail__data__item">
                    <label>
                      Types
                    </label>
                    <span>
                      {types.map((type, index) => {
                        return (
                          <small
                            key={index}
                            className="type"
                            style={{ background: `#${TYPE_COLORS[type.type.name]}` }}
                          >
                            <span>{type.type.name}</span>
                          </small>
                        );
                      })}
                    </span>
                  </div>


                  <div className="pokemon__detail__data__item">
                    <label>
                      Height <GiBodyHeight size={20}></GiBodyHeight>
                    </label>
                    <span>
                      {Math.floor(height * .1 * 100) / 100} m
                    </span>
                  </div>

                  <div className="pokemon__detail__data__item">
                    <label>
                      Weight <GiWeight size={20}></GiWeight>
                    </label>
                    <span>
                      {Math.floor(weight * .1 * 100) / 100} kg
                    </span>
                  </div>
                  <div className="pokemon__detail__data__item">
                    <label>
                      Abilities <GiThorHammer size={25}></GiThorHammer>
                    </label>
                    <span>
                      {abilities.map((ability, index) => {
                        return (
                          <small key={index} className="type">
                            <span>{ability.ability.name}</span>
                          </small>

                        );
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='pokemon__detail__base__stats'>
              <h3>Base Stats</h3>
              <div>
                {stats.map((stat, index) => {
                  return (
                    <div className='pokemon__detail__base__stats__items' key={index}>
                      <span>{stat.stat.name}</span>
                      <ProgressBar bgcolor={`#${TYPE_COLORS[`${firstType}`]}`} completed={stat.base_stat}></ProgressBar>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='pokemon__detail__evolution'>

              <h3>Evolution chart</h3>

              <div className='pokemon__detail__evolution__chain'>

                {getEvols(chain).map((level, index) => {
                  const route = `./${level.url.replace(API_SPECIES_URL, '').replaceAll('/', '')}`;
                  if (index === getEvols(chain).length - 1) {
                    return (
                      <div key={index} className="badge" style={{background: `#${TYPE_COLORS[`${firstType}`]}`}}>
                        <Link
                          to={{
                            pathname: route
                          }}
                          style={{ color: 'black' }}
                        >
                          <span>{level.species_name}</span>
                        </Link>
                        <small> Level<span>{level.min_level}</span></small>
                      </div>
                    );
                  }
                  return (

                    <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                      <div className="badge" style={{background: `#${TYPE_COLORS[`${firstType}`]}`}}>
                        <Link
                          to={{
                            pathname: route
                          }}
                          style={{ color: 'black' }}
                        >
                          <span>{level.species_name}</span>
                        </Link>

                        <small> Level<span>{level.min_level}</span></small>
                      </div>
                      <TiArrowRightOutline size={50} color={`#${TYPE_COLORS[`${firstType}`]}`}></TiArrowRightOutline>
                    </div>
                  )
                })}
              </div>
            </div>

          </>
        ) : <></>
      }
    </>

  )
}
