import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth from './Auth';

function HeaderComponent(props) {

    const signout = () => {
        auth.signout();
        props.history.replace('/');
    }


    return (        
        <section className="header-section">
            <nav className="nav">
            <div className="nav-title">Stephen's Engineering Blog</div> 
            <div className="nav-links">
                <Link to="/home">Home</Link>
                <Link to="/aboutme">About me</Link>
                {
                    !auth.isAuthenticated() && <Link to="/login" onClick={auth.signin}>Login</Link>
                }
                {
                    auth.isAuthenticated() && <Link to="/" onClick={() => {signout()}}>Logout</Link>
                }
                <Link to="/create">Create</Link>
            </div>

            </nav>
        </section>
    )
}

export default withRouter(HeaderComponent);