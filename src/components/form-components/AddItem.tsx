import React, { useState, useContext } from 'react'
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import classNames from 'classnames/bind';
import styles from '../styles/AddItemStyles.scss';
import { cssExports } from '../styles/AddItemStyles.scss'

// const cx = classNames.bind();
type AppProps = {
    handleAddNewItemToList: (paramNewItem: string) => void,
}
/**
 * Thanks to the following for helping me out!
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 * 
 * Also thanks to these examples!
 * https://github.com/Lemoncode/react-typescript-samples
 */


export const AddItem: React.FC<AppProps> = (props) => {
    const { handleAddNewItemToList } = props;
    const { value, setValue, reset } = useInput('');
    const [newItemInList, setNewItemInList] = useState("");
    const stringResources = useContext(ResourceManager);

    /**
     * Captures the item the user submitted
     * and passes it up for the parent component
     * to handle.
     * @param evt submit event
     */
    const handleAddItemToList = (evt) => {
        evt.preventDefault();
        handleAddNewItemToList(value);
        reset();
    }


    return (
        <form action="/" method="get" onSubmit={handleAddItemToList}>
            <label htmlFor="add-item-label">
                <span >What needs to be done?</span>
            </label>
            <input
                type="text"
                id="add-item"
                placeholder="Add item to list" /**Placeholders aren't accessible -- why we're doubling up. */
                name="add-item"
                value={value}
                onChange={event => setValue(event.target.value)}
            >
            </input>
            <button type="submit">Add</button>
        </form>
    );
}

export default AddItem