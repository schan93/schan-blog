import React, { Component } from 'react';
import '../../css/style.css';

class ImageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }
  

    handleLoad = () => {
        this.setState({loaded: true});
    }

    render() {

        // const imgStyle = {
        //     width: '100%',
        //     minHeight: '200px',
        //     backgroundSize: 'cover',
        //     backgroundImage: `url(${this.props.imgUrl})`,
        //     backgroundPosition: 'center',
        //     borderRadius: '5px',
        //     marginRight: '20px',
        // }

        return (
            // <div style={imgStyle} className={(this.state.loaded ? "fade-in-style" : "")} />
            <img
                className={"img-component" + (this.state.loaded ? " fade-in" : "")}
                src={this.props.imgUrl}
                onLoad={this.handleLoad}
            />
        );
    }
}
export default ImageComponent;