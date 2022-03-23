import React, { useState, useContext, useEffect } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import ResourceManager from '../ResourceManager';
import { useInput } from '../hooks/useInput';
import classNames from 'classnames/bind';
import styles from '../styles/AddItemStyles.scss';
import { cssExports } from '../styles/AddItemStyles.scss'
import TodoItem from '../common/TodoItem';
import NoticeModal from '../common/NoticeModal'


type AppProps = {
    todoItem: TodoItem
    isEditable: boolean,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}



export const EditableTextItem: React.FC<AppProps> = (props) => {
    let { todoItem, isEditable, value, setValue } = props;
    const stringResources = useContext(ResourceManager);
    const [openModal, setOpenModal] = useState(false);
    // const { value, setValue, reset } = useInput('');

    /**
     * Handle editing a single instance of
     * the Todo item
     * @param value 
     * @param item 
     */
    // const handleEditItem = (evt) => {
    //     evt.preventDefault();
    //     // if (value == '') {
    //         setOpenModal(true);
    //     // } else {
    //         setName(evt.value);
    //         todoItem.setTitle(evt.value);
    //     // }
    // }

    // const handleSubmit = (evt) => {

    // }

    /**
     * Function to close the modal
     */
    const handleModalAfterClose = () => {
        setOpenModal(false);
    }

    if (isEditable) {
        return (
            <div>
                <input
                    type="text"
                    id="add-item"
                    name="add-item"
                    value={value}
                    // className={styles.textBox}
                    onChange={event => setValue(event.target.value)}
                >
                </input>
                <NoticeModal
                    isOpen={openModal}
                    handleAfterClose={handleModalAfterClose}
                    header={stringResources.modalEmptyInputHeader}
                    subHeader={stringResources.modalEmptyInputSubHeader}
                />
            </div>
        );
    } else {
        return (
            <p>{todoItem.title}</p>
        );
    }

}

export default EditableTextItem