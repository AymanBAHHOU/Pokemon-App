import React from 'react';
import Error_404 from '../assets/Error_404.gif';

export default function NoMatch() {
  return (
    <div>
       <React.Fragment>
      <h5 className="loading-banner">Ouups !</h5>
      <img src={Error_404} width={500} height={400} alt='404 error'
        style={{ 'margin': '0 auto', 'display': 'block' }} />
    </React.Fragment>
    </div>
  )
}
