class TodoItem {
    public id: number;
    public title: string;

    constructor(public paramId: number, public paramTitle: string) {
        this.id = paramId;
        this.title = paramTitle;
    }

    getTitle() {
        return this.title;
    }
}

// type TodoItem = {
//     id: number,
//     title: string,

// }