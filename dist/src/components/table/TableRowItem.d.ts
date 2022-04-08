import React from 'react';
import TodoItem from '../common/TodoItem';
declare type AppProps = {
    itemInTodoList: TodoItem;
    handleDeletingItemInToDoList: Function;
};
export declare const TableRowItem: React.FC<AppProps>;
export default TableRowItem;
