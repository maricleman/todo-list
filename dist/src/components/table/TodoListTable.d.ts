import React from 'react';
import TodoItem from '../common/TodoItem';
declare type AppProps = {
    itemsInTodoList: Array<TodoItem>;
    handleDeletingItemInToDoList: Function;
};
export declare const TodoListTable: React.FC<AppProps>;
export default TodoListTable;
