import React from 'react'
import Title from './Title';
import SignInSignOutButton from './auth/SignInSignOutButton';
import styles from './HeaderStyles.scss';


export const Header: React.FC = () => {

    return (
        <div className={styles.headerWrapper}>
            <div />
            <div>
                <SignInSignOutButton />
            </div>
        </div>
    );
}

export default Header