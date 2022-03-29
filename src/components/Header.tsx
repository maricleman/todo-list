import React from 'react'
import Title from './Title';
import SignInButton from './auth/SignInButton';
import styles from './HeaderStyles.scss';


export const Header: React.FC = () => {

    return (
        <div className={styles.headerWrapper}>
            <div />
            <div>
                <SignInButton />
            </div>
        </div>
    );
}

export default Header