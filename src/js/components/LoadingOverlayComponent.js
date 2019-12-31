import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import '../../css/style.css';

function LoadingOverlayComponent(props) {
    return(
        <div className="loading">
            <ClipLoader
                sizeUnit={"px"}
                size={150}
                width={1000}
                color={'#123abc'}
                loading={props.loading}
            />
            <div className="loading-text">{props.loadingText}</div>
        </div>


    )
}

export default LoadingOverlayComponent;