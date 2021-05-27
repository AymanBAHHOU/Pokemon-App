import React from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header>
      <div className="brand">
        <Link to='/' >
          <img src={logo} alt='Logo' height={50} width={50} />
        </Link>
      </div>
      <nav>
        <ul>
          <Link to='/' >
            <li>Home</li>
          </Link>

          <Link to='/types' >
            <li>Types</li>
          </Link>

        </ul>
      </nav>
    </header>
  );
}
