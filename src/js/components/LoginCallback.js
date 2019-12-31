import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth from './Auth';
import LoadingOverlayComponent from './LoadingOverlayComponent';

class LoginCallback extends Component {

    async componentDidMount() {
        try {
            await auth.handleAuthentication();
            this.props.history.replace('/');
        } catch (err) {
            this.props.history.replace('/');
        }

    }

    render() {
        return (
            <LoadingOverlayComponent 
                loading={true}
                loadingText="Loading Home page..." 
            />
        );
    }
}


export default withRouter(LoginCallback);
