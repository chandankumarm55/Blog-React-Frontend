import React from 'react';
import { format } from 'date-fns';
import { backEndUrl } from '../utils/constant';
import { Link } from 'react-router-dom';

const BlogCard = ({ _id, title, cover, summary, content, createdAt, author }) => {

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        } else {
            return text;
        }
    };

    return (
        <div>
            <div className="post">
                <div className="image">
                    <Link to={ `/post/${_id}` }>
                        <img src={ `${backEndUrl}/${cover}` } alt='images' />
                    </Link>
                </div>
                <div className="texts">
                    <Link to={ `/post/${_id}` }>
                        <h2>{ truncateText(title, 85) }</h2>
                    </Link>
                    <p className="info">
                        <a className='author'>@{ author?.username }</a>
                        <time>{ format(new Date(createdAt), 'MMM d, yyyy HH:mm') }</time>
                    </p>
                    <p className='summary'>{ truncateText(summary, 300) }</p>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
