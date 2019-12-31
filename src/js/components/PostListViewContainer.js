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
      // construct a map for each image and post
      const postsMap = new Map(data.map(post => [post.img, post]));
      let imgs = data.map(post => post.img);
      // this.getPostImgs(data);
      this.setState({posts: data, loading: true})
      // this.getPostImages(postsMap, imgs);
    })
  }

  getPostImgs = async(posts) => {
    const postImgs = await fetch('/api/images');
    const postImgsJson = await response.json();
  }

  getPosts = async () => {
    // this says, get the posts, and await til they're all retrieved
    const response = await fetch('/api/posts');
    // once all the posts are retrieved, now we are to wait til the 
    // response is jsonified. this also returns a promise.
    // I think now what we can do is chain this with the getPostImages API 
    // which I believe we can run with a Promise.all
    // it will return once all the urls are retrieved I believe
    const allPosts = await response.json();
    return allPosts;
  }

  getPostImages = (postsMap, imgs) => {
    Promise.all(imgs.map(img => fetch('/api/image/' + img)
    .then(async(data) => {
      // here, we can asynchronously fetch all the images for each post.
      // this can be done in parallel 
      let imageData = await data.json();
      let post = postsMap.get(img);
      post.img = imageData.signedUrl;
    })
  )).then(allData => {
     // when all the posts are finished being retrieved, westo
      let resultPosts = [];
      for(let [key, value] of postsMap) {
        resultPosts.push(value);
      }
      this.setState({posts: resultPosts, loading: true});
    })
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