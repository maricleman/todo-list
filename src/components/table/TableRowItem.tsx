import React, { useState, useContext, useEffect, useRef } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import classNames from 'classnames/bind';
import styles from './TableRowItemStyles.scss';
import TodoItem from '../common/TodoItem';
import EditableTextItem from './EditableTextItem';
import NoticeModal from '../common/NoticeModal'

type AppProps = {
    itemInTodoList: TodoItem,
    handleDeletingItemInToDoList: (idToDelete: number) => void,
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
            setIsEditable(true);
        } else {
            itemInTodoList.setTitle(value);
        }
    }, [isEditable]);

    const handleToggleIsEditableFlag = () => {
        setIsEditable(!isEditable);
    }


    return (
        <div className={styles.toDoItem}>
            <article key={itemInTodoList.id}>
                <EditableTextItem
                    todoItem={itemInTodoList}
                    isEditable={isEditable}
                    value={value}
                    setValue={setValue}
                    userJustClosedModal={userJustClosedModal}
                    handleSetUserJustClosedModal={handleSetUserJustClosedModal}
                    handleDeletingItemInToDoList={handleDeletingItemInToDoList}
                    handleToggleIsEditableFlag={handleToggleIsEditableFlag}
                />
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