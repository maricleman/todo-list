import React from 'react'

/* Declaring types of props */
type AppProps = {
    message: string;
    numberOfDaysExperience: number;
} /* use `interface` if exporting so that consumers can extend */

/** We specify in our functional component what props we expect */
function Header({ message, numberOfDaysExperience }: AppProps) {

    return (
        <div>
            <h1>{message}</h1>
            <h2>You're doing pretty well for only having {numberOfDaysExperience} days of experience!</h2>
        </div>
    );
}

export default Header