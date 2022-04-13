import React, { useState, useContext, useEffect, useRef } from 'react'
import { useMsal } from "@azure/msal-react";
import { loginRequest, msalConfig } from "../../authConfig";
import { callMsGraph } from "./graph";
import styles from './WelcomeStyles.scss';
import UserInfo from '../common/UserInfo';

interface AppProps {
    handleAddingUserProfileInfo: Function
};

export const Welcome: React.FC<AppProps> = (props) => {
    const { handleAddingUserProfileInfo } = props;
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
            let displayName = "";
            let email = "";
            let activeDirectoryId = "";
            Object.keys(validIdToken).map(function (key) {
                if (key === 'name') {
                    displayName = validIdToken[key];
                }
                if (key === 'emails') {
                    email = validIdToken[key][0];
                }
                if (key === 'oid') {
                    activeDirectoryId = validIdToken[key];
                }
            });
            if (displayName !== "") {
                setUserName(displayName);
                const userInfo = new UserInfo(activeDirectoryId, displayName, email);
                handleAddingUserProfileInfo(userInfo);
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

    console.log('redirectURL: ', msalConfig.auth.redirectUri);
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