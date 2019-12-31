import React from 'react';
import {Route} from 'react-router-dom';
import auth from '../components/Auth';
import LoadingOverlayComponent from '../components/LoadingOverlayComponent';

function SecuredRoute(props) {
  const {component: Component, path, checkingSession} = props;
  return (
    <Route path={path} render={() => {
        if (checkingSession) return <LoadingOverlayComponent loadingText="Validating Session..." />;
        if (!auth.isAuthenticated()) {
            auth.signin();
          return <div></div>;
        }
        return <Component onLoadingChange={props.onLoadingChange} />;
    }} />
  );
}

export default SecuredRoute; 