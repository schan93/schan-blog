import React, { Component } from 'react';
import '../../css/style.css';
import LazyLoad from 'react-lazyload';
import PostListViewComponent from './PostListViewComponent';

class PostListViewContainer extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getPosts().then(data =>{
      this.setState({posts: data, loading: true})
    })
  }

  getPosts = async () => {
    const response = await fetch('/api/posts');
    const allPosts = await response.json();
    return allPosts;
  }

  encodeFile = (data) => {
    let str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
  }

  createPostsTemplate = () => {
    return(
        this.state.posts.map((postObject) => (
          <LazyLoad 
            offset={100}
            key={postObject.id}
            height={200}
          >
           <PostListViewComponent
              post={postObject}
              isListView={true}
            />
          </LazyLoad>   
        ))
    )
  }

  render() {
    return(
      <div>
        {this.createPostsTemplate()}
      </div>
    )
  }
}

export default PostListViewContainer;