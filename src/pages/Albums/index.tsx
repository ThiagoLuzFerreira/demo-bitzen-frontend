import React, { useState, useEffect } from 'react';
import "./styles.css"
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

interface Album {
  id: number;
  title: string;
  year: string;
  image: string;
}

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [page, setPage] = useState<number>(0);

  const history = useNavigate();

  async function editAlbum(id: number) {
    try {
      history(`/albums/new/${id}`);
    } catch (error) {
      console.error('Error updating album:', error);
    }
  }

  async function deleteAlbum(id: number) {
    try {
      await api.delete(`/albums/${id}`);
      setAlbums(albums.filter(album => album.id !== id))
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  }

  async function fetchMoreAlbums() {
    try {
      const response = await api.get('/albums', {
        params: {
          pageNumber: page,
          pageSize: 4,
          sort: 'asc'
        }
      });
      setAlbums([...albums, ...response.data.content]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  }

  useEffect(() => {
    fetchMoreAlbums();
  }, []);

  return (
    <div className='album-container'>
      <header>
        <h1>Welcome to the Artists section</h1>
        <Link className='button' to="/albums/new/0">Add new album</Link>
      </header>
      <nav className="links">
        <Link to="/">Home</Link>
        <Link to="/artists">Artists</Link>
        <Link to="/musics">Musics</Link>
      </nav>

      <h1>Album List</h1>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            <strong>Title:</strong>
            <p>{album.title}</p>
            <strong>Year:</strong>
            <p>{album.year}</p>
            <strong>Image:</strong>
            <img src={album.image} alt={album.title} />
            <button onClick={() => editAlbum(album.id)} type='button'>
              <FiEdit size={20} color='#251FC5'/>
            </button>
            <button onClick={() => deleteAlbum(album.id)} type='button'>
              <FiTrash2 size={20} color='#251FC5'/>
            </button>
          </li>
        ))}          
      </ul>
      <button className="button" onClick={fetchMoreAlbums} type='button'>Load more</button>
    </div>
  );
}

export default Albums;
