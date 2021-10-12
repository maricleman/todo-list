import React, { useState, useContext, useEffect } from 'react'
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
    const [displayList, setDisplayList] = useState(false);


    useEffect(() => {
        if (itemsInTodoList[0] !== '') {
            setDisplayList(true);
        }
        else {
            setDisplayList(false);
        }
    }, [itemsInTodoList]);

    console.log(`displayList: ${displayList}`);
    console.log(`itemsInTodoList: ${itemsInTodoList}`);
    console.log(`itemsInTodoList: ${itemsInTodoList.length}`);
    return (
        <ul style={{ display: displayList ? 'block' : 'none' }}>
            {itemsInTodoList.map(function (name, index) {
                return <li key={index}>{name}</li>;
            })}
        </ul>
    );
}

export default TableRowItem