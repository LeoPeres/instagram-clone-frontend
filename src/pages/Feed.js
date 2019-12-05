import React, { useState, useEffect } from 'react';

import api from '../services/api';

import './Feed.css';

import Article from '../components/Article';
import io from 'socket.io-client'

const Feed = () => {
    const [feed, setFeed] = useState([]);

    useEffect(()=>{

        registerToSocket();

        async function fetchFeed(){
            const response = await api.get('posts');
            setFeed(response.data);
        }
        
        fetchFeed();
        
    }, []);

    const registerToSocket = () => {
        const socket = io('http://localhost:3333');

        socket.on('post', newPost => {
            setFeed(prevFeed=>([
                newPost,
                ...prevFeed
            ]));
        });

        socket.on('like', likedPost => {
            setFeed(prevFeed=>(
                prevFeed.map(post=>
                    post._id === likedPost._id ? likedPost : post
                )
            ))
        })
    }

    return(
        <section id="post-list">
            {feed.map(post=>(
                <Article post={post} key={post._id} />
            ))}        
        </section>
    );
}

export default Feed;