export default class TodoItem {
    id: string;
    title: string;
    isChecked: boolean;

    constructor(public paramTitle: string) {
        this.title = paramTitle;
    }

    setTitle(newTitle: string) {
        this.title = newTitle;
    }

    setStringLiteralId(paramId: string) {
        this.id = paramId;
    }

    setId(paramId: number) {
        this.id = `todo-item: ${paramId}`;
    }

    setIsChecked(paramIsChecked: boolean) {
        this.isChecked = paramIsChecked;
    }

    getNumericId(): number {
        const listOfItemsInTodoList = this.id.split(":", 2);
        const numericId = parseInt(listOfItemsInTodoList[1]);
        return numericId;
    }
}