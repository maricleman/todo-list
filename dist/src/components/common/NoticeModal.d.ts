import React from 'react';
declare type AppProps = {
    isOpen: boolean;
    handleAfterClose: () => void;
    header: string;
    subHeader: string;
};
export declare const NoticeModal: React.FC<AppProps>;
export default NoticeModal;
