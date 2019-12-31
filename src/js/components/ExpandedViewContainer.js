import React, { Component } from 'react';
import ExpandedViewComponent from './ExpandedViewComponent';

class ExpandedViewContainer extends Component {

    constructor() {
        super();
        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    // TODO: Query for some data
    getPosts = async() => {
        const id = this.props.match.params.id;
        const postResponse = await fetch('/api/posts/' + id);
        const postJson = await postResponse.json();
        this.setState({post : postJson});
    }

    render() {
        return (
            <ExpandedViewComponent
                key={this.state.post.id}
                post={this.state.post}
            />
        )
    }
}

export default ExpandedViewContainer;