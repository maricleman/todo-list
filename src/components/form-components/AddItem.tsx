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
    const [newItemInList, setNewItemInList] = useState("");
    const stringResources = useContext(ResourceManager);
    const [openModal, setOpenModal] = useState(false);
    const [modalSubtitle, setModalSubtitle] = useState('');
    let subtitle;

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

    const handleModalAfterOpen = (evt) => {
        console.log('Modal is opened!');
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
        subtitle = "Empty input";
        setModalSubtitle('Empty input');
    }

    const modalStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
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
            <input
                type="text"
                id="add-item"
                placeholder="Add item to list" /**Placeholders aren't accessible -- why we're doubling up. */
                name="add-item"
                value={value}
                onChange={event => setValue(event.target.value)}
            >
            </input>
            <button type="submit" className={styles.submitButton}>Add</button>
            <Modal
                isOpen={openModal}
                onAfterOpen={handleModalAfterOpen}
                onRequestClose={handleModalAfterClose}
                style={modalStyles}
                contentLabel="Empty Content Modal"
            >
                <h2 style={{display: 'flex', justifyContent: 'center'}}>Empty input</h2>
                <h4>Please enter a value before adding something to the list.</h4>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button style={closeModalButtonStyles} onClick={handleModalAfterClose}>close</button>
                </div>
                
            </Modal>
        </form>
    );
}

export default AddItem