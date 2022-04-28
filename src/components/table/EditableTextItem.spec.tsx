
import '@testing-library/jest-dom';
import { EditableTextItem } from './EditableTextItem';
import TodoItem from '../common/TodoItem';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

// Look at this: https://github.com/escreengithub/arc/blob/double-manual-barcode/libs/arc-core/src/lib/input-text-field/InputTextField.spec.tsx

test('renders successfully', () => {
    const myTodoItem = new TodoItem('Mowing the yard');
    // render(
    //     <EditableTextItem todoItem={todoItem} />
    // );
});