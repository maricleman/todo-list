import React, { useState, useContext, useEffect } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import classNames from 'classnames/bind';
import styles from '../styles/AddItemStyles.scss';
import { cssExports } from '../styles/AddItemStyles.scss'
import TodoItem from '../common/TodoItem';
import EditableTextItem from '../form-components/EditableTextItem';

// const cx = classNames.bind();
type AppProps = {
    itemInTodoList: TodoItem,
    handleDeletingItemInToDoList: Function
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


    useEffect(() => {
        itemInTodoList.setTitle(value);
    }, [isEditable]);

    const handleOnEdit = (id: string) => {
        console.log('Time to edit!');
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
        </div>
    );
}

export default TableRowItem