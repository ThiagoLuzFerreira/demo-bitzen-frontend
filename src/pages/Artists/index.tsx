import React, { useState, useEffect } from 'react';
import "./styles.css"
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

interface Artist {
  id: number;
  name: string;
  image: string;
}

const Artists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [page, setPage] = useState<number>(0);

  const history = useNavigate();

  async function editArtist(id: number) {
    try {
      history(`/artists/new/${id}`);
    } catch (error) {
      console.error('Error updating artist:', error);
    }
  }

  async function deleteArtist(id: number) {
    try {
      await api.delete(`/artists/${id}`);
      setArtists(artists.filter(artist => artist.id !== id))
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  }

  async function fetchMoreArtists() {
    try {
      const response = await api.get('/artists', {
        params: {
          pageNumber: page,
          pageSize: 4,
          sort: 'asc'
        }
      });
      setArtists([...artists, ...response.data.content]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  }

  useEffect(() => {
    fetchMoreArtists();
  }, []);

  return (
    <div className='artist-container'>
      <header>
        <h1>Welcome to the Artists section</h1>
        <Link className='button' to="/artists/new/0">Add new artist</Link>
      </header>
      <nav className="links">
        <Link to="/">Home</Link>
        <Link to="/albums">Albuns</Link>
        <Link to="/musics">Musics</Link>
      </nav>

      <h1>Artists List</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            <strong>Name:</strong>
            <p>{artist.name}</p>
            <strong>Image:</strong>
            <img src={artist.image} alt={artist.name} />
            <button onClick={() => editArtist(artist.id)} type='button'>
              <FiEdit size={20} color='#251FC5'/>
            </button>
            <button onClick={() => deleteArtist(artist.id)} type='button'>
              <FiTrash2 size={20} color='#251FC5'/>
            </button>
          </li>
        ))}          
      </ul>
      <button className="button" onClick={fetchMoreArtists} type='button'>Load more</button>
    </div>
  );
}

export default Artists;
