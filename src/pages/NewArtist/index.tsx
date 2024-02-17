import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

interface Artist {
  id: string;
  name: string;
  image: string;
}

const NewArtist: React.FC = () => {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const { artistId } = useParams();
  const history = useNavigate();

  useEffect(() => {
    const loadArtist = async () => {
      try {
        const response = await api.get<Artist>(`/artists/${artistId}`);
        setId(response.data.id);
        setName(response.data.name);
        setImage(response.data.image);
      } catch (error) {
        console.error('Error recovering artist:', error);
        history('/artists');
      }
    };
  
    if (artistId !== '0') {
      loadArtist();
    }
  }, [artistId, history]);
  

  async function createOrSaveBook(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      id,
      name,
      image
    };

    try {
      if (artistId === '0') {
        await api.post('artists', data);
      } else {
        if (id) {
          data.id = id;
          await api.put(`artists/${id}`, data);
        }
      }

      history('/artists');
    } catch (error) {
      alert("Error while recording Artist. Try again.");
    }
  }

  return (
    <div className="new-artist-container">
      <div className="content">
        <section className="form">
          <h1>{artistId === '0' ? 'Add new artist' : 'Update artist'}</h1>
          <Link className='back-link' to='/artists'>
            <FiArrowLeft size={16} color='#251FC5' /> Back
          </Link>
        </section>
        <form onSubmit={createOrSaveBook}>
          <input
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder='Image URL'
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <button className='button' type='submit'>{artistId === '0' ? 'Add' : 'Update'}</button>
        </form>
      </div>
    </div>
  );
}

export default NewArtist;
