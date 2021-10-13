import React, { useState } from 'react'
import Title from './form-components/Title';
import AddItem from './form-components/AddItem';
import TodoListTable from './table/TodoListTable';
// import TodoItem from './common/TodoItem';

/**
 * I want to extend a thanks to this example for
 * ideas on how to style the application:
 * https://nuflakbrr-todolist.vercel.app/
 * https://github.com/nuflakbrr/react-todolist/blob/master/src/components/List.js
 * 
 * @returns The Todo Application in its entirety.
 */
function App() {
    const [itemsInTodoList, setItemsInTodoList] = useState<Array<TodoItem>>();

    const handleAddNewItemToList = (paramNewItem: TodoItem) => {
        let itemToAdd: TodoItem = new TodoItem(1, "");

        itemsInTodoList.push(paramNewItem);


        // setItemsInTodoList[...itemsInTodoList, {
        //     id=1,
        //     title={ paramNewItem }
        // }];
        // if (itemsInTodoList[0] === '') {
        //     setItemsInTodoList([paramNewItem]);
        // } else {
        //     setItemsInTodoList([...itemsInTodoList, paramNewItem]);
        // }
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