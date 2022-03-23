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
    todoItem: TodoItem
    isEditable: boolean
}

const handleEditItem = (value: string, item: TodoItem) => {
    console.log('dummy function');
    item.setTitle(value);
}



export const EditableTextItem: React.FC<AppProps> = (props) => {
    let { todoItem, isEditable } = props;
    const stringResources = useContext(ResourceManager);

    if (isEditable) {
        return (
            <>
                {/* <form action="/" method="post" onSubmit={handleAddItemToList}> */}
                    <div>
                        <input
                            type="text"
                            id="add-item"
                            placeholder={stringResources.todoTextBoxPlaceholder} /**Placeholders aren't accessible -- why we're doubling up. */
                            name="add-item"
                            value={todoItem.title}
                            // className={styles.textBox}
                            onChange={event => handleEditItem(event.target.value, todoItem)}
                        >
                        </input>
                        <button type="submit">Add</button>
                    </div>
                {/* </form> */}
            </>
        );
    } else {
        return (
            <p>{todoItem.title}</p>
        );
    }

}

export default EditableTextItem