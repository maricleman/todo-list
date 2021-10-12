import React, { useState } from 'react'
import Title from './Title';
import AddItem from './AddItem';
import TodoListTable from './table/TodoListTable';

function App() {
    const [itemsInTodoList, setItemsInTodoList] = useState(['']);

    const handleAddNewItemToList = (paramNewItem) => {
        if (itemsInTodoList[0] === '') {
            setItemsInTodoList([paramNewItem]);
        } else {
            setItemsInTodoList([...itemsInTodoList, paramNewItem]);
        }
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