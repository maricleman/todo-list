import React, { useState, useContext, useEffect } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import classNames from 'classnames/bind';
import styles from '../styles/AddItemStyles.scss';
import { cssExports } from '../styles/AddItemStyles.scss'
import TodoItem from '../common/TodoItem';

// const cx = classNames.bind();
type AppProps = {
    itemsInTodoList: Array<TodoItem>,
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
    let { itemsInTodoList, handleDeletingItemInToDoList } = props;
    const stringResources = useContext(ResourceManager);


    const handleOnEdit = () => {
        console.log('Time to edit!');
    };

    // const handleOnDelete = (item: TodoItem) => {
    //     console.log('Time to delete!');
    //     console.log('ID: ', item.getNumericId());
    //     let idToDelete = item.getNumericId();
    //     let newItemsInTodoList = Array<TodoItem>();
    //     itemsInTodoList.forEach((item) => {
    //         if (item.getNumericId() !== idToDelete) {
    //             newItemsInTodoList.push(item);
    //         }
    //         console.log('newItems: ');
    //         console.log(newItemsInTodoList);
    //     });
    // }

    return (
        <div className="todo-list">
            {itemsInTodoList.map((item) => {
                const { id, title } = item;
                return (
                    <article className="todo-item" key={id}>
                        <p className="title">{title}</p>
                        <div className="btn-container">
                            <button type="button" className="edit-btn" onClick={handleOnEdit}>
                                <FaEdit />
                            </button>
                            <button type="button" className="delete-btn" onClick={() => handleDeletingItemInToDoList(item.getNumericId())}>
                                <FaTrash />
                            </button>
                        </div>
                    </article>
                )
            })}
        </div>
    );
}

export default TableRowItem