import TodoItemDTO from './TodoItemDTO';
export default class UserInfoDTO {
    user_active_directory_id: string;
    user_display_name: string;
    email: string;
    list_of_todo_items: Array<TodoItemDTO>;
    constructor(userIdProp: string, displayNameProp: string, emailProp: string, listOfTodoItemsProp: Array<TodoItemDTO>);
}
