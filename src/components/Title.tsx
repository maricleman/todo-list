import React, { useContext } from 'react'
import ResourceManager from './ResourceManager';


function Title() {
    const stringResources = useContext(ResourceManager);
    return (
        <div>
            <h1>{stringResources.title}</h1>
        </div>
    );
}

export default Title