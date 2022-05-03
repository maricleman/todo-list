import React, { useState, useContext, useEffect, useRef } from 'react'
import ResourceManager from '../ResourceManager';
import TodoItem from '../common/TodoItem';
import NoticeModal from '../common/NoticeModal'
import styles from './EditableTextItemStyles.scss';
import { FaEdit, FaTrash } from "react-icons/fa";


interface IAppProps {
    todoItem: TodoItem
    isEditable: boolean,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    userJustClosedModal: boolean,
    handleSetUserJustClosedModal: (isJustClosed: boolean) => void,
    handleDeletingItemInToDoList: (idToDelete: number) => void,
    handleToggleIsEditableFlag: () => void
}



export const EditableTextItem: React.FC<IAppProps> = (props) => {
    let { todoItem, isEditable, value, setValue, userJustClosedModal, handleSetUserJustClosedModal, handleDeletingItemInToDoList, handleToggleIsEditableFlag } = props;
    const saveButton = useRef<HTMLButtonElement>(null);
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
            console.log('You pressed enter!');
            // User press enter key?
            if (e.keyCode === 13) {
                // If so, save changes
                saveButton.current?.click();
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

    /**
     * The user clicks the save
     * button after editing a pre-existing
     * todo item.
     * What happens next?
     */
    const handleSaveButton = () => {
        handleToggleIsEditableFlag();
        if (value !== '') {
            document.getElementById('add-item-text-box')?.focus();
        } else {
            document.getElementById('edit-item-text-box')?.focus();
        }
    }

    if (isEditable) {
        return (
            <div>
                <label className={todoItemClassName}>
                    <input type='checkbox' className={styles.checkbox} checked={todoItem.isChecked} onChange={handleOnChangeCheckBox}></input>
                    <input
                        type="text"
                        id="edit-item-text-box"
                        name="edit-item-text-box"
                        autoFocus={true}
                        value={value}
                        onKeyUp={handleKeyStroke}
                        onChange={event => setValue(event.target.value)}
                    />
                </label>
                <div className={styles.toDoItem}>
                    <button type="button" ref={saveButton} style={{ display: isEditable ? 'flex' : 'none' }} onClick={handleSaveButton}>
                        {stringResources.saveTodoItemText}
                    </button>
                    <button type="button" style={{ display: isEditable ? 'none' : 'flex' }} onClick={handleToggleIsEditableFlag}>
                        <FaEdit />
                    </button>
                    <button type="button" className="delete-btn" onClick={() => handleDeletingItemInToDoList(todoItem.getNumericId())}>
                        <FaTrash />
                    </button>
                </div>
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
            <>
                <label className={todoItemClassName}>
                    <input type='checkbox' className={styles.checkbox} checked={todoItem.isChecked} onChange={handleOnChangeCheckBox}></input>
                    {value}
                </label>
                <div className={styles.toDoItem}>
                    <button type="button" style={{ display: isEditable ? 'flex' : 'none' }} onClick={handleSaveButton}>
                        {stringResources.saveTodoItemText}
                    </button>
                    <button type="button" style={{ display: isEditable ? 'none' : 'flex' }} onClick={handleToggleIsEditableFlag}>
                        <FaEdit />
                    </button>
                    <button type="button" className="delete-btn" onClick={() => handleDeletingItemInToDoList(todoItem.getNumericId())}>
                        <FaTrash />
                    </button>
                </div>
            </>
        );
    }

}

export default EditableTextItem