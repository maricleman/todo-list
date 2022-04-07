import React, { useState, useContext, useRef, InputHTMLAttributes } from 'react'
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import styles from './AddItemStyles.scss';
import NoticeModal from '../common/NoticeModal'

interface AppProps {
    handleAddNewItemToList: Function;
    handleSavingUsersTodoList: Function;
    isUserLoggedIn: boolean;
}
/**
 * Thanks to the following for helping me out!
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 * 
 * Also thanks to these examples!
 * https://github.com/Lemoncode/react-typescript-samples
 */


export const AddItem: React.FC<AppProps> = (props) => {
    const { handleAddNewItemToList, handleSavingUsersTodoList, isUserLoggedIn } = props;
    const { value, setValue, reset } = useInput('');
    const stringResources = useContext(ResourceManager);
    const [openModal, setOpenModal] = useState(false);

    /**
     * We specify the type for useRef (since we're using TypeScript)
     * as an input element that is nullable and instantiate it w/ a null
     * value. This null value will be replaced when the 
     * element renders.
     */
    const addItemTextBox = useRef<HTMLInputElement | null>(null);


    /**
     * Captures the item the user submitted
     * and passes it up for the parent component
     * to handle.
     * @param evt submit event
     */
    const handleAddItemToList = (evt) => {
        evt.preventDefault();
        // Validate input
        if (value === '') {
            // Inform the user they need to insert data first
            setOpenModal(true);
        } else {
            handleAddNewItemToList(value);
            addItemTextBox.current?.focus();
            reset();
        }
    }

    /**
     * Handle saving the user's
     * list of todo items
     */
    const handleSavingInfo = () => {
        handleSavingUsersTodoList();
    }

    /**
     * Function to close the modal
     */
    const handleModalAfterClose = () => {
        setOpenModal(false);
    }

    return (
        <div>
            <div className={styles.inputElements}>
                <form action="/" method="post" className={styles.inputElements} onSubmit={handleAddItemToList}>
                    <input
                        type="text"
                        id="add-item-text-box"
                        ref={addItemTextBox}
                        placeholder={stringResources.todoTextBoxPlaceholder} /**Placeholders aren't accessible -- why we're doubling up. */
                        name="add-item"
                        value={value}
                        className={styles.textBox}
                        onChange={event => setValue(event.target.value)}
                    >
                    </input>
                    <button type="submit" className={styles.submitButton}>{stringResources.addButttonText}</button>
                </form>
                <button type="submit" onClick={handleSavingInfo} style={{ display: isUserLoggedIn ? 'flex' : 'none' }} className={styles.saveButton}>{stringResources.saveButtonText}</button>
            </div>
            <NoticeModal
                isOpen={openModal}
                handleAfterClose={handleModalAfterClose}
                header={stringResources.modalEmptyInputHeader}
                subHeader={stringResources.modalEmptyInputSubHeader}
            />
        </div>
    );
}

export default AddItem