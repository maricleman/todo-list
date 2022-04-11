import React, { useState, useContext, useEffect, useRef } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import classNames from 'classnames/bind';
import styles from './TableRowItemStyles.scss';
import { cssExports } from '../styles/AddItemStyles.scss'
import TodoItem from '../common/TodoItem';
import EditableTextItem from './EditableTextItem';
import NoticeModal from '../common/NoticeModal'

// const cx = classNames.bind();
type AppProps = {
    itemInTodoList: TodoItem,
    handleDeletingItemInToDoList: Function,
}
/**
 * Thanks to the following for helping me out!
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 * 
 * Also thanks to these examples!
 * https://github.com/Lemoncode/react-typescript-samples
 */


export const TableRowItem: React.FC<AppProps> = (props) => {
    let { itemInTodoList, handleDeletingItemInToDoList } = props;
    const stringResources = useContext(ResourceManager);
    const [isEditable, setIsEditable] = useState(false);
    const [value, setValue] = useState(itemInTodoList.title);
    const [openModal, setOpenModal] = useState(false);
    const saveButton = useRef<any>();
    const [userJustClosedModal, setUserJustClosedModal] = useState(false);

    /**
     * Function to close the modal
     */
    const handleModalAfterClose = () => {
        setOpenModal(false);
        setUserJustClosedModal(true);
    }

    /**
     * Handles setting the value of
     * userJustClosedModal. We use this semaphore
     * to prevent an infinite loop with the enter
     * key both closing and re-opening the modal.
     * @param isJustClosed boolean
     */
    const handleSetUserJustClosedModal = (isJustClosed: boolean) => {
        setUserJustClosedModal(isJustClosed);
    }

    useEffect(() => {
        // Force the user to enter a value that isn't null
        if (value == '') {
            setOpenModal(true);
            // don't set the value back
            // setValue(itemInTodoList.title);
            setIsEditable(true);
        } else {
            itemInTodoList.setTitle(value);
        }
    }, [isEditable]);

    const handleToggleIsEditableFlag = () => {
        setIsEditable(!isEditable);
    }

    const handleSaveButton = () => {
        handleToggleIsEditableFlag();
        if (value !== '') {
            document.getElementById('add-item-text-box')?.focus();
        } else {
            document.getElementById('edit-item-text-box')?.focus();
        }
    }

    return (
        <div className={styles.toDoItem}>
            <article key={itemInTodoList.id}>
                <EditableTextItem
                    todoItem={itemInTodoList}
                    isEditable={isEditable}
                    value={value}
                    setValue={setValue}
                    saveButton={saveButton.current}
                    userJustClosedModal={userJustClosedModal}
                    handleSetUserJustClosedModal={handleSetUserJustClosedModal}
                />
                <div className={styles.toDoItem}>
                    <button type="button" ref={saveButton} style={{ display: isEditable ? 'flex' : 'none' }} onClick={handleSaveButton}>
                        Save
                    </button>
                    <button type="button" style={{ display: isEditable ? 'none' : 'flex' }} onClick={handleToggleIsEditableFlag}>
                        <FaEdit />
                    </button>
                    <button type="button" className="delete-btn" onClick={() => handleDeletingItemInToDoList(itemInTodoList.getNumericId())}>
                        <FaTrash />
                    </button>
                </div>
            </article>
            <NoticeModal
                isOpen={openModal}
                handleAfterClose={handleModalAfterClose}
                header={stringResources.modalEmptyInputHeader}
                subHeader={stringResources.modalEmptyValueSubheader}
            />
        </div>
    );
}

export default TableRowItem