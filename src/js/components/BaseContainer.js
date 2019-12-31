import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import auth from './Auth';
import { withRouter } from 'react-router-dom';

class BaseContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          checkingSession: true,
          loading: false
        }
      }
    
    async componentDidMount() {
        if(this.props.location.pathname === '/callback') {
            this.setState({checkingSession : false});
            return;
        }
        try {
          await auth.silentAuth();
          this.forceUpdate();
        } catch (err) {
          if (err.error !== 'login_required') console.log(err.error);
        }
        this.setState({checkingSession: false});
      }

    handleLoadingChange = (loading) => {
        this.setState({loading : loading});
    } 

    render() {
        return (
            <BaseComponent 
                checkingSession={this.state.checkingSession}
                loading={this.state.loading}
                onLoadingChange={this.handleLoadingChange} />
        )
    }
}

export default withRouter(BaseContainer);