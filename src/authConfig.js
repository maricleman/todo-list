/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: "2debf791-a717-477c-9f29-3cf6833d90ef",
        /**
         * Thanks to the following link for helping me form the authority URL.
         * URL: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-net-aad-b2c-considerations#authority-for-an-azure-ad-b2c-tenant-and-policy
         */
        authority: "https://MaricleConsulting.b2clogin.com/tfp/MaricleConsulting.onmicrosoft.com/B2C_1_SignInToApp", //"https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000/", 
        // redirectUri: "https://maricle-todo-list.azurewebsites.net/",
        knownAuthorities: ["https://MaricleConsulting.b2clogin.com/tfp/MaricleConsulting.onmicrosoft.com/B2C_1_SignInToApp"] 
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;		
                }	
            }	
        }	
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    /**
     * This should be openid -- not Login.Open
     * as the Microsoft template makes you think it should be.
     */
    scopes: ["openid"]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com"
};
