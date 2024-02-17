import React, {useEffect, useState} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

const NewArtist = () => {

    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const {artistId} = useParams();

    const history = useNavigate();

    async function loadArtist(){
        try {
            const response = await api.get(`/artists/${artistId}`);
            setId(response.data.id);
            setName(response.data.name);
            setImage(response.data.image);
        } catch (error) {
            console.error('Error recovering artist:', error);
            history('/artists');
        }
    }

    useEffect(() => {
        if(artistId === '0') return;
        else loadArtist();
    }, [artistId]);

    async function createOrSaveBook(e){
        e.preventDefault();

        const data = {
            name,
            image
        }

        try {

            if(artistId === '0'){
                await api.post('artists', data);
                history('/artists');
            } else {
                data.id = id;
                await api.put('artists', data);
                history('/artists');
            }

            
        } catch (error) {
            alert("Error while recording Artist. Try again.")
        }
    }

    return (
        <div className="new-artist-container">
            <div className="content">
                <section className="form">
                    <h1>{artistId === '0' ? 'Add new artist' : 'Update artist'}</h1>
                    <Link className='back-link' to='/artists'> 
                        <FiArrowLeft size={16} color='#251FC5'/> Back
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
    )
}

export default NewArtist