import React, { useState, useContext } from 'react'
import ResourceManager from './ResourceManager';
import classNames from 'classnames/bind';
// import styles from '../styles/AddItemStyles.scss';

// const cx = classNames.bind(styles);
/**
 * Thanks to the following for the help and info!
 * https://www.emgoto.com/react-search-bar/
 */

/**
 * Thanks to the following for helping me out!
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 */


/** We specify in our functional component what props we expect */
function AddItem() {
    const [newItemInList, setNewItemInList] = useState("");
    const stringResources = useContext(ResourceManager);

    const handleAddItemToList = (evt) => {
        evt.preventDefault();
        alert(`Submitting task: ${newItemInList}`);
        console.log(`Item in list we're about to submit: ${newItemInList}`);
    }

    
    return (
        <form action="/" method="get" onSubmit={handleAddItemToList}>
            <label htmlFor="add-item-label">
                <span className="visually-hidden">What needs to be done?</span>
            </label>
            <input
                type="text"
                id="add-item"
                placeholder="Add item to list" /**Placeholders aren't accessible -- why we're doubling up. */
                name="add-item"
                onChange={e => setNewItemInList(e.target.value)}>
            </input>
            <button type="submit">Add</button>
        </form>
    );
}

export default AddItem