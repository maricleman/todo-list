class TodoItem {
    id: number;
    title: string;

    constructor(public paramTitle: string) {
        this.title = paramTitle;
    }
}