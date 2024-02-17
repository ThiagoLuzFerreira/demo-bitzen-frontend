import React from 'react';
import { Link } from 'react-router-dom';
import "./styles.css"

import bitzenLogo from '../../assets/bitzen.jpg';

const Home = () => {
  return (
    <div className='home-container'>
      <section className='greeting'>
        <img src={bitzenLogo} alt='Bitzen'/>
        <h1>Demo client project for Bitzen</h1>
      </section>

      <div className="links">
        <Link to="/artists">Artists</Link>
        <Link to="/albuns">Albuns</Link>
        <Link to="/musics">Musics</Link>
      </div>
        
    </div>
  )
}

export default Home;