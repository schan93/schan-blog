import React from 'react';
import LazyLoad from 'react-lazyload';

function AboutMeContainer() {

    return (
        <div className="row-container">
            <LazyLoad>
                <img src="/assets/images/stephen.jpg" className="about-me-img" />
            </LazyLoad>
            <div className="about-me-content">
                <h2 className="post-title">Hi, I'm Stephen!</h2>
                <p>Hi, my name is Stephen and I'm a software engineer. As I learn more about programming, I find that you learn something new every day while at work or doing personal projects. I want to share some of the interesting things I've learned in hopes that it can also be beneficial to anyone who finds this blog.</p>
            </div>
        </div>
    )
}

export default AboutMeContainer;