import React, { Component } from 'react';
import '../../css/style.css';
import PostViewComponent from './PostViewComponent';
import { NavLink } from 'react-router-dom';

function ExpandedViewComponent(props) {
    
    return (
        <div>
            <img className="img-component-expanded" src={props.post.img} />
            <PostViewComponent
                isListView={false}
                post={props.post}
            />
            <NavLink className="form-button" to="/">Back to Home</NavLink>
        </div>
    )

}

export default ExpandedViewComponent;