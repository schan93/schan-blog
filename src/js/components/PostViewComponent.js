import React from 'react';
import { Link } from 'react-router-dom';

function PostViewComponent(props) {
    return (
        <div className="post-details">
            {
                props.isListView ? 
                    <Link 
                        className="post-link" 
                        to={{pathname: `/posts/${props.post.id}`}} 
                        key={props.post.id}
                    >
                        <h2 className="post-title">{props.post.title}</h2>
                    </Link>
                : 
                    <h2 className="post-title">{props.post.title}</h2>
            }
            <p className="post-date">{props.post.postDate} &middot; {props.post.type}</p>
            <p className={(props.isListView ? "post-list-content " : "") + "content"}>{props.post.content}</p>
        </div>
    )
}

export default PostViewComponent;