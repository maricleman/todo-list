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
    id: string,
    value: string,
    isEditable: boolean
}



export const EditableTextItem: React.FC<AppProps> = (props) => {
    let { id, value, isEditable } = props;

    if (isEditable) {
        return (
            <h1>{value}</h1>
        );
    } else {
        return (
            <p>{value}</p>
        );
    }

}

export default EditableTextItem