import React, { useState } from 'react'
import Title from './form-components/Title';
import AddItem from './form-components/AddItem';
import TodoListTable from './table/TodoListTable';
import { TodoItem } from './common/TodoItem';

/**
 * I want to extend a thanks to this example for
 * ideas on how to style the application:
 * https://nuflakbrr-todolist.vercel.app/
 * https://github.com/nuflakbrr/react-todolist/blob/master/src/components/List.js
 * 
 * @returns The Todo Application in its entirety.
 */
function App() {
    const [itemsInTodoList, setItemsInTodoList] = useState<Array<TodoItem>>([]);

    const handleAddNewItemToList = (paramNewItem: string) => {
        let todoItem = new TodoItem('paramNewItem');
        console.log('length?', itemsInTodoList.length);
        if (itemsInTodoList.length === 0) {
            todoItem.setId(0);
        }
        setItemsInTodoList([...itemsInTodoList, todoItem]);
    }

    return (
        <div>
            <Title />
            <AddItem
                handleAddNewItemToList={handleAddNewItemToList}
            />
            <TodoListTable
                itemsInTodoList={itemsInTodoList}
            />
        </div>
    );
}

export default App