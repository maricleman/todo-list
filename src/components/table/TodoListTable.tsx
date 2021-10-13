import React, { useState, useContext } from 'react'
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import classNames from 'classnames/bind';
import styles from '../styles/AddItemStyles.scss';
import { cssExports } from '../styles/AddItemStyles.scss'
import TableRowItem from './TableRowItem';

// const cx = classNames.bind();
type AppProps = {
    itemsInTodoList: Array<TodoItem>,
}
/**
 * Thanks to the following for helping me out!
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 * 
 * Also thanks to these examples!
 * https://github.com/Lemoncode/react-typescript-samples
 */


export const TodoListTable: React.FC<AppProps> = (props) => {
    const { itemsInTodoList } = props;
    const stringResources = useContext(ResourceManager);




    return (
        <TableRowItem
            itemsInTodoList={itemsInTodoList}
        />
    );
}

export default TodoListTable