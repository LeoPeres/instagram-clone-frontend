import React from 'react';
import api from '../services/api';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

const Article = ({post}) => {
    const { _id, author, place, image, likes, description, hashtags } = post;

    const handleLike = async () => {
        await api.post(`/posts/${_id}/like`);
    }

    return( 
        <article>
                <header>
                    <div className="user-info">
                        <span>{author}</span>
                        <span className="place">{place}</span>
                    </div>

                    <img src={more} alt="Mais"/>
                </header>

                    <img src={`http://localhost:3333/files/${image}`} alt="scrum"/>

                    <footer>
                        <div className="actions">
                            <button type="button" onClick={handleLike}>
                                <img src={like} alt="Like"/>
                            </button>
                            <img src={comment} alt="Comment"/>
                            <img src={send} alt="Send"/>
                        </div>

                        <strong>{likes} likes</strong>

                        <p>
                            {description}
                            <span>
                                {hashtags}
                            </span>
                        </p>
                    </footer>
                
            </article>
    )
}

export default Article;