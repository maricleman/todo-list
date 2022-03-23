import React, { useState, useContext } from 'react'
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import classNames from 'classnames/bind';
import styles from '../styles/AddItemStyles.scss';
import { cssExports } from '../styles/AddItemStyles.scss'
import TableRowItem from './TableRowItem';
import TodoItem from '../common/TodoItem';

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


export const TodoListTable: React.FC<AppProps> = (props) => {
    const { itemsInTodoList, handleDeletingItemInToDoList } = props;
    const stringResources = useContext(ResourceManager);

    return (
        <>
            {itemsInTodoList.map((item) => (
                <TableRowItem
                    key={item.id}
                    itemInTodoList={item}
                    handleDeletingItemInToDoList={handleDeletingItemInToDoList}
                />
            ))}
        </>

    );
}

export default TodoListTable