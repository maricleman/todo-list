import TodoItemDTO from './TodoItemDTO';

export default class UserInfoDTO {
    user_active_directory_id: string;
    user_display_name: string;
    email: string;
    list_of_todo_items: Array<TodoItemDTO>

    constructor(userIdProp: string, displayNameProp: string, emailProp: string, listOfTodoItemsProp: Array<TodoItemDTO>) {
        this.user_active_directory_id = userIdProp;
        this.user_display_name = displayNameProp;
        this.email = emailProp;
        this.list_of_todo_items = listOfTodoItemsProp;
    }
}