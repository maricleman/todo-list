import React, { useState, useContext, useEffect } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import classNames from 'classnames/bind';
import styles from '../styles/AddItemStyles.scss';
import { cssExports } from '../styles/AddItemStyles.scss'
import TodoItem from '../common/TodoItem';
import EditableTextItem from '../form-components/EditableTextItem';
import NoticeModal from '../common/NoticeModal'

// const cx = classNames.bind();
type AppProps = {
    itemInTodoList: TodoItem,
    handleDeletingItemInToDoList: Function,
    forceReRender: Function
}
/**
 * Thanks to the following for helping me out!
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 * 
 * Also thanks to these examples!
 * https://github.com/Lemoncode/react-typescript-samples
 */


export const TableRowItem: React.FC<AppProps> = (props) => {
    let { itemInTodoList, handleDeletingItemInToDoList, forceReRender } = props;
    const stringResources = useContext(ResourceManager);

    const [isEditable, setIsEditable] = useState(false);
    const [value, setValue] = useState(itemInTodoList.title);
    const [openModal, setOpenModal] = useState(false);

    /**
     * Function to close the modal
     */
    const handleModalAfterClose = () => {
        setOpenModal(false);
    }

    useEffect(() => {
        // Force the user to enter a value that isn't null
        if (value == '') {
            setOpenModal(true);
            setValue(itemInTodoList.title);
            setIsEditable(true);
        } else {
            itemInTodoList.setTitle(value);
            forceReRender();
        }
    }, [isEditable]);

    const handleOnEdit = (id: string) => {
        setIsEditable(!isEditable);
    };

    return (
        <div className="todo-list">
            <article className="todo-item" key={itemInTodoList.id}>
                <EditableTextItem
                    todoItem={itemInTodoList}
                    isEditable={isEditable}
                    value={value}
                    setValue={setValue}
                />
                <div className="btn-container">
                    <button type="button" className="edit-btn" onClick={() => handleOnEdit(itemInTodoList.id)}>
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