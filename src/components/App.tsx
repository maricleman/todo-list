import React from 'react'
import Header from './Header';

function App() {

    return (
        <div>
            <Header
                message="Welcome to the world of TypeScript!"
                numberOfDaysExperience={5}
            />
        </div>
    );
}

export default App