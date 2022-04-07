import React from 'react'


export const Testing: React.FC = () => {
    const url = 'https://maricle-todo-list-api.azurewebsites.net/api/TodoItems?ActiveDirectoryId=c0fe59d5-3902-449c-ace6-4d325e913a7b';

    const hitEndpoint = () => {

        const options: RequestInit = {
            method: 'GET'
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => console.log('Success: ', data))
            .catch(error => console.log(error));

    };


    return (
        <div>
            <button type="button" onClick={hitEndpoint}>Click here to test</button>
        </div>
    );
}

export default Testing