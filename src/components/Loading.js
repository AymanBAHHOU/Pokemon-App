import React from 'react';
import spinner from '../assets/spinner.gif';

export default function Loading() {
  return (
    <React.Fragment>
      <h5 className="loading-banner">Getting Pokémons...</h5>
      <img src={spinner} width={500} height={400} alt={'Loading'}
        style={{ 'margin': '0 auto', 'display': 'block' }} />
    </React.Fragment>
  )
}
