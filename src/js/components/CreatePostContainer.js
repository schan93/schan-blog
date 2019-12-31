import React, { Component } from 'react';
import { uuid } from 'uuidv4';
import ReactS3Uploader from 'react-s3-uploader';
import auth from './Auth';
import { withRouter } from 'react-router-dom';

class CreatePostContainer extends Component {

    constructor(props) {
        super(props);
        this.uploader = null;
        this.state = {
            title: "",
            content: "",
            type: "",
            img: {},
            fileUploadName: "Upload Image"
        }
    }

    handleSubmit = async (event) => {
        
        event.preventDefault();
        this.props.onLoadingChange(true);
        const form = new FormData(event.target);

        const headers = {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${auth.getIdToken()}`
        }
        const id = uuid();
        const imageUploadBody = JSON.stringify({
            postId: id,
            imageName: form.get("file").name
        });
        let uploadResponse = await fetch('/api/image/upload', {
            method: 'POST',
            headers: headers,
            body: imageUploadBody
        });
        let uploadJson = await uploadResponse.json();

        const postBody = JSON.stringify({
            title: form.get("title"),
            content: form.get("content"),
            id: id,
            img: uploadJson.data.Location,
            type: "Microservices",
            postDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}) 
        });
        await fetch('/api/posts', {
            method: 'POST',
            headers: headers,
            body: postBody
        });
        // navigate back to all posts
        this.props.onLoadingChange(false);
        this.props.history.replace('/');

    }

    handleFileChange = (event) => {
        let fileName = event.target.value.split("\\").pop();
        if(fileName) {
            this.setState({fileUploadName: fileName});
        }
    }

    handlePostTypeChange = (event) => {
        console.log("Inner txt: ", event.target.value);
        this.setState({type: event.target.value});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-display">
                <input 
                    className="form-input form-field" 
                    name="title"
                    type="text"
                    placeholder="Title"
                    maxLength="256"
                />
                <textarea 
                    className="form-input form-textarea form-field" 
                    name="content"
                    rows="4" 
                    cols="50" 
                    placeholder="Write about your post here..." >
                </textarea>
                    <input 
                        className="form-image" 
                        name="file" 
                        id="file" 
                        accept="image/*" 
                        type="file" 
                        onChange={this.handleFileChange} 
                    />
                    <label 
                        className="form-button form-field" 
                        htmlFor="file"
                    >{this.state.fileUploadName}
                    </label>
                <div className="form-tags form-field">
                    <input 
                        type="radio" 
                        id="microservices" 
                        name="microservices" 
                        value="Microservices"
                        onChange={this.handlePostTypeChange} 
                        checked={this.state.type === "Microservices"} 
                    />
                    <label htmlFor="microservices">Microservices</label>

                    <input 
                        type="radio" 
                        id="front-end" 
                        name="front-end" 
                        value="Front End" 
                        onChange={this.handlePostTypeChange} 
                        checked={this.state.type === "Front End"}  
                    />
                    <label htmlFor="front-end" className="front-end">Front End</label>

                    <input type="radio" id="general" name="general" value="General" onChange={this.handlePostTypeChange} checked={this.state.type === "General"} />
                    <label htmlFor="general">General</label> 
                </div>
                <div className="form-field">
                    <button 
                        type="submit" 
                        className="form-button">
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

export default withRouter(CreatePostContainer);