import React, { useContext } from "react";
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import ResourceManager from '../ResourceManager';
import styles from './SignInButtonStyles.scss';
import DeviceType from '../common/DeviceType';

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
    const { instance } = useMsal();
    const stringResources = useContext(ResourceManager);
    const isAuthenticated = useIsAuthenticated();


    /**
     * This function returns the device type
     * @returns device type
     */
    const handleDetermineDeviceType = () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return DeviceType.Tablet;
        }
        else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return DeviceType.Mobile;
        }
        return DeviceType.Desktop;
    };

    const handleLogin = () => {
        const deviceType = handleDetermineDeviceType();
        if (deviceType === DeviceType.Desktop) {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
            /**
             * If it's not a desktop, don't display the popup login screen
             */
        } else {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }

    }

    const handleLogout = () => {
        const deviceType = handleDetermineDeviceType();
        if (deviceType === DeviceType.Desktop) {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/"
            }).catch(e => {
                console.log(e);
            });
            /**
             * If it's not a desktop, don't display the popup login screen
             */
        } else {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            }).catch(e => {
                console.log(e);
            });
        }

    }

    return (
        <button className={styles.signInBtn}
            onClick={() => isAuthenticated ? handleLogout() : handleLogin()}>
            {isAuthenticated ? stringResources.SignOutBtnText : stringResources.SignInBtnText}
        </button>
    )
}

export default SignInButton;