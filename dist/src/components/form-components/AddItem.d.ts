import React from 'react';
interface AppProps {
    handleAddNewItemToList: Function;
    handleSavingUsersTodoList: Function;
    isUserLoggedIn: boolean;
}
export declare const AddItem: React.FC<AppProps>;
export default AddItem;
