import React from 'react';
import TodoItem from '../common/TodoItem';
declare type AppProps = {
    todoItem: TodoItem;
    isEditable: boolean;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    saveButton: any;
    userJustClosedModal: boolean;
    handleSetUserJustClosedModal: Function;
};
export declare const EditableTextItem: React.FC<AppProps>;
export default EditableTextItem;
