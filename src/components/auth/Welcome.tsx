import React, { useState, useContext, useEffect, useRef } from 'react'
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { callMsGraph } from "./graph";
import styles from './WelcomeStyles.scss';


export const Welcome: React.FC = () => {
    const { instance, accounts } = useMsal();
    const [profileData, setProfileData] = useState(null);

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
     * When the application
     * first loads.
     */
    useEffect(() => {
        RequestProfileData();
    }, []);

    if (profileData !== null || typeof (profileData) !== 'undefined') {
        return (
            <h4 className={styles.welcomeMessage}>Welcome {accounts[0]?.name}!</h4>
        );
    }
    else {
        return (
            <h1>Welcome!</h1>
        );
    }

}

export default Welcome