import React from 'react';
import '../../css/style.css';
import PostViewComponent from './PostViewComponent';

function PostListViewComponent(props) {

  return (
      <div className="row-container">
        <img className="img-component" src={props.post.img} />
          <PostViewComponent
              post={props.post}
              isListView={props.isListView}
          />
      </div>
  )
}

export default PostListViewComponent;