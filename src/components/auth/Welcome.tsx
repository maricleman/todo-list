import React, { useState, useContext, useEffect, useRef } from 'react'
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { callMsGraph } from "./graph";
import styles from './WelcomeStyles.scss';


export const Welcome: React.FC = () => {
    const { instance, accounts } = useMsal();
    const [profileData, setProfileData] = useState(null);
    const [userName, setUserName] = useState('');

    const RequestProfileData = () => {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setProfileData(response));
        });
    }

    /**
     * Retrieving the user's name or username (if user doesn't exist)
     * from the account information that has already been retrieved.
     */
    const RetrieveUserName = () => {
        const myIdTokenClaims = accounts[0]?.idTokenClaims;
        if (myIdTokenClaims != null || typeof (myIdTokenClaims) !== 'undefined') {
            const validIdToken = myIdTokenClaims;
            let givenName = "";
            Object.keys(validIdToken).map(function (key) {
                if (key === 'given_name') {
                    givenName = validIdToken[key];
                }
            });
            if (givenName !== "") {
                setUserName(givenName);
            }

        } else {
            const nameOfUser = accounts[0]?.name;
            if (nameOfUser !== null || typeof nameOfUser !== 'undefined') {
                setUserName(nameOfUser as string);
            } else {
                const userName = accounts[0]?.username;
                if (userName !== null || typeof userName !== 'undefined') {
                    setUserName(userName as string);
                }
            }

        }
    }

    /**
     * When the application
     * first loads.
     */
    useEffect(() => {
        RequestProfileData();
        RetrieveUserName();
    }, []);

    if (profileData !== null || typeof (profileData) !== 'undefined') {
        return (
            <h4 className={styles.welcomeMessage}>Welcome {userName}!</h4>
        );
    }
    else {
        return (
            <h1>Welcome!</h1>
        );
    }

}

export default Welcome