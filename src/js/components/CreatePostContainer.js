import React, { Component } from 'react';
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
            file: null,
            fileUploadName: "Upload File"
        }
    }

    setupBody = (data) => {
        let form = new FormData(data);
        form.append('postDate', new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}));
        return form;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.props.onLoadingChange(true);
        const headers = {
            'Authorization': `Bearer ${auth.getIdToken()}`
        }
        const body = this.setupBody(event.target);
        await fetch('/api/posts', {
            method: 'POST',
            headers: headers,
            body: body
        });

        // navigate back to all posts
        this.props.onLoadingChange(false);
        this.props.history.replace('/');
    }

    handleFileChange = (event) => {
        this.setState({
            file: event.target.files[0],
            fileUploadName: event.target.files[0].name
        });
    
    }

    handlePostTypeChange = (event) => {
        this.setState({type: event.target.value});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-display" encType="multipart/form-data">
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
                        name="type"
                        value="Microservices"
                        onChange={this.handlePostTypeChange} 
                        checked={this.state.type === "Microservices"} 
                    />
                    <label htmlFor="microservices">Microservices</label>
                    <input 
                        type="radio" 
                        id="front-end" 
                        name="type"
                        value="Front End" 
                        onChange={this.handlePostTypeChange} 
                        checked={this.state.type === "Front End"}  
                    />
                    <label htmlFor="front-end" className="front-end">Front End</label>
                    <input 
                        type="radio" 
                        id="general" 
                        name="type"
                        value="General" 
                        onChange={this.handlePostTypeChange} 
                        checked={this.state.type === "General"} 
                    />
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