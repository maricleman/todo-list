import React, { useState } from 'react'
import Title from './form-components/Title';
import AddItem from './form-components/AddItem';
import TodoListTable from './table/TodoListTable';

function App() {
    const [itemsInTodoList, setItemsInTodoList] = useState(['']);

    const handleAddNewItemToList = (paramNewItem) => {
        // setItemsInTodoList[...itemsInTodoList, {
        //     id=1,
        //     title={ paramNewItem }
        // }];
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