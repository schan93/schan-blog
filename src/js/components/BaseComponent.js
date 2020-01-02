import React from 'react';
import PostListViewContainer from './PostListViewContainer';
import HeaderComponent from './HeaderComponent';
import { Route, withRouter } from 'react-router-dom';
import AboutMeContainer from './AboutMeContainer';
import CreatePostContainer from './CreatePostContainer';
import ExpandedViewContainer from './ExpandedViewContainer';
import LoginCallback from './LoginCallback';
import SecuredRoute from '../SecuredRoute/SecuredRoute';
import LoadingOverlayComponent from './LoadingOverlayComponent';

function BaseComponent(props) {
    if(props.loading) {
        return (
            <LoadingOverlayComponent
                loadingText="Uploading Post..."
            />
        )
    }
    return (
        <main className="container">
            <HeaderComponent />
            <section className="content-wrapper">
                <div className="content-container">
                    <div className="post-content">
                        <Route exact path="/" render={(props) => <PostListViewContainer {...props} header="- Welcome -"/>} />
                        <Route exact path="/home" render={(props) => <PostListViewContainer {...props} header="- Welcome -"/>} />
                        <Route exact path="/aboutme" render={(props) => <AboutMeContainer {...props}/>}  />
                        <Route exact path="/posts/:id" render={(props) => <ExpandedViewContainer {...props} />} />
                        <Route exact path="/callback" component={LoginCallback} />
                        <SecuredRoute path='/create'
                            component={CreatePostContainer}
                            checkingSession={props.checkingSession}
                            loading={props.loading}
                            onLoadingChange={props.onLoadingChange}
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default withRouter(BaseComponent);