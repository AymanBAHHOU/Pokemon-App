import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function NextPreviousPage(props) {
  const { next, previous, onFetch } = props;
  const lockedStyle = {
    background: '#757171',
  }

  return (
    <div className="paginator-btn">
      <button
        className='btn'
        disabled={!previous}
        onClick={() => onFetch(previous)}
        style={!previous ? lockedStyle : null}
      >
        <AiOutlineLeft id="left" size={30}>
        </AiOutlineLeft>
      </button>
      <button
        className='btn'
        disabled={!next}
        onClick={() => onFetch(next)}
        style={!next ? lockedStyle : null}
      >
        <AiOutlineRight id="right" size={30} >
        </AiOutlineRight>
      </button>

    </div>
  )
}
