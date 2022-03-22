import React, { useState, useContext } from 'react'
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import styles from './AddItemStyles.scss';
import Modal from 'react-modal';

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
            reset();
        }
    }

    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement('#root');

    /**
     * Function to close the modal
     * @param evt 
     */
    const handleModalAfterClose = (evt) => {
        setOpenModal(false);
    }


    /**
     * Custom modal styles.
     * I tried putting these in the
     * AddItemStyles.scss, but the
     * react-modal library wanted
     * an object instead of a CssStyles
     * object.
     */
    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '1rem',
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
        },
    };

    const closeModalButtonStyles = {
        backgroundColor: '#0078d0',
        border: 0,
        borderRadius: '56px',
        color: '#fff',
        cursor: 'pointer',
        display: 'inline-block',
        fontFamily: 'system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif',
        fontSize: '18px',
        fontWeight: 600,
        outline: 0,
        padding: '10px',
    };


    return (
        <form action="/" method="post" onSubmit={handleAddItemToList}>
            <div className={styles.inputElements}>
                <input
                    type="text"
                    id="add-item"
                    placeholder={stringResources.todoTextBoxPlaceholder} /**Placeholders aren't accessible -- why we're doubling up. */
                    name="add-item"
                    value={value}
                    className={styles.textBox}
                    onChange={event => setValue(event.target.value)}
                >
                </input>
                <button type="submit" className={styles.submitButton}>Add</button>
            </div>
            <Modal
                isOpen={openModal}
                onRequestClose={handleModalAfterClose}
                style={modalStyles}
                contentLabel="Empty Content Modal"
            >
                <h2 style={{ display: 'flex', justifyContent: 'center' }}>{stringResources.modalEmptyInputHeader}</h2>
                <h4>{stringResources.modalEmptyInputSubHeader}</h4>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button style={closeModalButtonStyles} onClick={handleModalAfterClose}>close</button>
                </div>

            </Modal>
        </form>
    );
}

export default AddItem