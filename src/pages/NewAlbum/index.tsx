import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

interface Album {
  id: number;
  title: string;
  year: string;
  image: string;
  artist: string;
}

const NewAlbum: React.FC = () => {
  const [id, setId] = useState<number | null>();
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [artist, setArtist] = useState<string>();

  const { albumId } = useParams();
  const history = useNavigate();

  useEffect(() => {
    const loadAlbum = async () => {
      try {
        const response = await api.get<Album>(`/albums/${albumId}`);
        setId(response.data.id);
        setTitle(response.data.title);
        setYear(response.data.year);
        setImage(response.data.image);
        setArtist(response.data.artist);
      } catch (error) {
        console.error('Error recovering album:', error);
        history('/albums');
      }
    };
  
    if (albumId !== '0') {
      loadAlbum();
    }
  }, [albumId, history]);
  

  async function createOrSaveAlbum(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      id,
      title,
      year,
      image,
      artist
    };

    try {
      if (albumId === '0') {
        await api.post('albums', data);
      } else {
        if (id) {
          data.id = id;
          await api.put(`albums`, data);
        }
      }

      history('/albums');
    } catch (error) {
      alert("Error while recording Album. Try again.");
    }
  }

  return (
    <div className="new-album-container">
      <div className="content">
        <section className="form">
          <h1>{albumId === '0' ? 'Add new album' : 'Update album'}</h1>
          <Link className='back-link' to='/albums'>
            <FiArrowLeft size={16} color='#251FC5' /> Back
          </Link>
        </section>
        <form onSubmit={createOrSaveAlbum}>
          <input
            placeholder='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            placeholder='Year'
            value={year}
            onChange={e => setYear(e.target.value)}
          />
          <input
            placeholder='Image URL'
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <input
            placeholder='Artist Id'
            value={artist}
            onChange={e => setArtist(e.target.value)}
          />
          <button className='button' type='submit'>{albumId === '0' ? 'Add' : 'Update'}</button>
        </form>
      </div>
    </div>
  );
}

export default NewAlbum;
