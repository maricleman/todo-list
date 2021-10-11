import React, { useState, useContext } from 'react'
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import classNames from 'classnames/bind';
import styles from '../styles/AddItemStyles.scss';
import { cssExports } from '../styles/AddItemStyles.scss'

// const cx = classNames.bind();
type AppProps = {
    itemsInTodoList: Array<string>,
}
/**
 * Thanks to the following for helping me out!
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 * 
 * Also thanks to these examples!
 * https://github.com/Lemoncode/react-typescript-samples
 */


export const TableRowItem: React.FC<AppProps> = (props) => {
    const { itemsInTodoList } = props;
    const stringResources = useContext(ResourceManager);


    return (
        <ul>
            {itemsInTodoList.map(function (name, index) {
                return <li key={index}>{name}</li>;
            })}
        </ul>
    );
}

export default TableRowItem