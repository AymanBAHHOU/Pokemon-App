import React from 'react';
import { Link } from 'react-router-dom';
import { TYPE_COLORS } from '../utils/constants';

export default function PokemonCard(props) {
  const { data } = props;
  const { sprites, id, name, types } = data;
  const firstType = types[0]?.type.name;


  return (
    <div className="pokemon"
      style={{ background: `#${TYPE_COLORS[`${firstType}_light`]}` }}
    >
      <Link
        to={{
          pathname: `/pokemon/${id}`
        }}
        style={{ color: 'black' }}
      >

        <div className="pokemon-img-container">
          <div className="backgroud-disk" style={{ background: `#${TYPE_COLORS[`${firstType}_lighter`]}` }} >
            <img src={sprites.front_default} alt={name} />
          </div>
        </div>
        <div className="info">
          <span className="number">#{id}</span>
          <h3 className="name">
            {name}
          </h3>
          {types.map((type, index) => {
            return (
              <div key={index}>
                <small
                  className="type"
                  style={{ background: `#${TYPE_COLORS[type.type.name]}` }}>
                  <span>{type.type.name}</span>
                </small>
              </div>
            );
          })}
        </div>
      </Link>
    </div>
  )
}
