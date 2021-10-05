import React from 'react'
import Header from './Header';

function App() {

    return (
        <div>
            <Header
                message="Welcome to the world of types!"
                numberOfDaysExperience={5}
            />
        </div>
    );
}

export default App