export default class TodoItem {
    id: string;
    title: string;

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

    getNumericId(): number {
        const listOfItemsInTodoList = this.id.split(":", 2);
        const numericId = parseInt(listOfItemsInTodoList[1]);
        return numericId;
    }
}