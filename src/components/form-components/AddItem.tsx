import React, { useState, useContext, useRef } from 'react'
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import styles from './AddItemStyles.scss';
import NoticeModal from '../common/NoticeModal'


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
    const stringResources = useContext(ResourceManager);
    const [openModal, setOpenModal] = useState(false);
    const addItemTextBox = useRef<any>();


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
            addItemTextBox.current.focus();
            reset();
        }
    }


    /**
     * Function to close the modal
     */
    const handleModalAfterClose = () => {
        setOpenModal(false);
    }

    return (
        <form action="/" method="post" onSubmit={handleAddItemToList}>
            <div className={styles.inputElements}>
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
                <button type="submit" className={styles.submitButton}>Add</button>
            </div>
            <NoticeModal
                isOpen={openModal}
                handleAfterClose={handleModalAfterClose}
                header={stringResources.modalEmptyInputHeader}
                subHeader={stringResources.modalEmptyInputSubHeader}
            />
        </form>
    );
}

export default AddItem