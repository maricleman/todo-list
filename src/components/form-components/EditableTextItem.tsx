import React, { useState, useContext, useEffect } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import classNames from 'classnames/bind';
import styles from '../styles/AddItemStyles.scss';
import { cssExports } from '../styles/AddItemStyles.scss'
import TodoItem from '../common/TodoItem';
import NoticeModal from '../common/NoticeModal'


type AppProps = {
    todoItem: TodoItem
    isEditable: boolean,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    saveButton: any,
    userJustClosedModal: boolean,
    handleSetUserJustClosedModal: Function
}



export const EditableTextItem: React.FC<AppProps> = (props) => {
    let { todoItem, isEditable, value, setValue, saveButton, userJustClosedModal, handleSetUserJustClosedModal } = props;
    const stringResources = useContext(ResourceManager);
    const [openModal, setOpenModal] = useState(false);

    /**
     * Function to close the modal
     */
    const handleModalAfterClose = () => {
        setOpenModal(false);
    }

    const handleKeyStroke = e => {
        e.preventDefault();
        
        /**
         * Don't do anything if the
         * user just closed out of the modal!
         */
        console.log('userJustClosedModal? ', userJustClosedModal);
        if (userJustClosedModal === true) {
            handleSetUserJustClosedModal(false);
        } else {
            // User press enter key?
            if (e.keyCode === 13) {
                // If so, save changes
                saveButton.click();
            }
        }
        
    }

    if (isEditable) {
        return (
            <div>
                <input
                    type="text"
                    id="edit-item-text-box"
                    name="edit-item-text-box"
                    autoFocus={true}
                    value={value}
                    onKeyUp={handleKeyStroke}
                    onChange={event => setValue(event.target.value)}
                >
                </input>
                <NoticeModal
                    isOpen={openModal}
                    handleAfterClose={handleModalAfterClose}
                    header={stringResources.modalEmptyInputHeader}
                    subHeader={stringResources.modalEmptyInputSubHeader}
                />
            </div>
        );
    } else {
        return (
            <p>{value}</p>
        );
    }

}

export default EditableTextItem