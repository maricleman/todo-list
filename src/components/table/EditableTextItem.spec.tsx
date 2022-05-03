// import '@testing-library/jest-dom';
// import { EditableTextItem } from './EditableTextItem';
// import TodoItem from '../common/TodoItem';
// import userEvent from '@testing-library/user-event';
// import { render, screen } from '@testing-library/react';
// import { useRef, useState } from 'react';
// import React from 'react';

// Look at this: https://github.com/escreengithub/arc/blob/double-manual-barcode/libs/arc-core/src/lib/input-text-field/InputTextField.spec.tsx

// test('renders successfully', () => {

//     // Arrange
//     const myTodoItem = new TodoItem('Mowing the yard');
//     const [value, setValue] = useState('');
//     const userJustClosedModal = false;
//     const saveButton = useRef<any>();


//     const handleSetUserJustClosedModal = () => {

//     };

//     // Act
//     render(
//         <EditableTextItem
//             todoItem={myTodoItem}
//             isEditable={false}
//             value={value}
//             setValue={setValue}
//             saveButton={saveButton.current}
//             userJustClosedModal={userJustClosedModal}
//             handleSetUserJustClosedModal={handleSetUserJustClosedModal}
//         />
//     );

//     // Assert
//     const input = screen.getByText(value);
//     expect(input).toBeInTheDocument();

// });