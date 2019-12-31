import React from 'react';
import '../style.css';
import PostGridContainer from './PostGridContainer';

function WelcomeComponent() {
    return (
        <div>
            <div className="welcome welcome-image darken-welcome-image">
                <div className="welcome-text">
                    Hi, I'm Stephen. Welcome to my blog!
                </div>
            </div>  
            <PostGridContainer
                header="- Recent Posts -"
             />
        </div>
    )
}

export default WelcomeComponent;