import React, { useState } from 'react';
import api from '../services/api';

import './New.css';

const New = ({ history }) => {
    const [formData, setFormData] = useState({
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: ''
    });

    const handleChange = e => {
        e.persist();
        setFormData(prevData=>({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    const handleImageChange = e =>{
        e.persist();
        setFormData(prevData=>({
            ...prevData,
            image: e.target.files[0]
        }));
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        
        const data = new FormData();
        data.append('image', formData.image);
        data.append('author', formData.author);
        data.append('description', formData.description);
        data.append('place', formData.place);
        data.append('hashtags', formData.hashtags);

        await api.post('posts', data);

        history.push('/');
    }

   

    return(
        <form id="new-post">

            <input 
                type="file"
                onChange={handleImageChange}
            />

            <input 
                type="text"
                name="author"
                placeholder="Autor do post"
                onChange={handleChange}
                value={formData.author}
            />

            <input 
                type="text"
                name="place"
                placeholder="Local do post"
                onChange={handleChange}
                value={formData.place}
            />

            <input 
                type="text"
                name="description"
                placeholder="Descrição do post"
                onChange={handleChange}
                value={formData.description}
            />     

            <input 
                type="text"
                name="hashtags"
                placeholder="Hashtags do post"
                onChange={handleChange}
                value={formData.hashtags}
            />     

            <button type="submit" onClick={handleSubmit}>Enviar</button>
        </form>
    );
}

export default New;