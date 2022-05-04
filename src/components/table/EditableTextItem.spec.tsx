import '@testing-library/jest-dom';
import { EditableTextItem } from './EditableTextItem';
import TodoItem from '../common/TodoItem';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { useRef, useState } from 'react';
import React from 'react';

// Look at this: https://github.com/escreengithub/arc/blob/master/libs/arc-core/src/lib/input-text-field/InputTextField.spec.tsx

test('renders successfully', () => {

    // Arrange
    const myTodoItem = new TodoItem('Mowing the yard');

    // Act
    render(
        <EditableTextItem
            todoItem={myTodoItem}
            isEditable={false}
            value=''
            setValue={() => { }}
            userJustClosedModal={false}
            handleSetUserJustClosedModal={() => { }}
            handleDeletingItemInToDoList={(idToDelete: number) => { }}
            handleToggleIsEditableFlag={() => { }}
        />
    );

    // Assert
    const saveBtn = screen.getByText('Save');
    expect(saveBtn).toBeInTheDocument();

});