import React, { useContext } from "react";
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import ResourceManager from '../ResourceManager';
import styles from './SignInButtonStyles.scss';

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
    const { instance } = useMsal();
    const stringResources = useContext(ResourceManager);
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch(e => {
        console.log(e);
        });
    }

    const handleLogout = () => {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        });
    }

    return (
        <button className={styles.signInBtn} 
                onClick={() => isAuthenticated ? handleLogout() : handleLogin()}>
            {isAuthenticated ? stringResources.SignOutBtnText : stringResources.SignInBtnText}
        </button>
    )
}

export default SignInButton;