import React, { useState, useContext, useEffect } from 'react'
import ResourceManager from '../ResourceManager';
import TodoItem from '../common/TodoItem';
import NoticeModal from '../common/NoticeModal'
import styles from './EditableTextItemStyles.scss';


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
    const [todoItemClassName, setTodoClassName] = useState<string>();

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

    useEffect(() => {
        if (todoItem.isChecked) {
            setTodoClassName(styles.todoListItemCrossedOut);
        } else {
            setTodoClassName(styles.todoListItem);
        }
    }, []);


    /**
     * Handle the user changing the
     * state of the check box. 
     */
    const handleOnChangeCheckBox = () => {
        todoItem.setIsChecked(!todoItem.isChecked);
        if (todoItem.isChecked) {
            setTodoClassName(styles.todoListItemCrossedOut);
        } else {
            setTodoClassName(styles.todoListItem);
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
            <label className={todoItemClassName}>
                <input type='checkbox' className={styles.checkbox} checked={todoItem.isChecked} onChange={handleOnChangeCheckBox}></input>
                {value}
            </label>
        );
    }

}

export default EditableTextItem