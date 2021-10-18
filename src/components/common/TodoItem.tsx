export class TodoItem {
    id: string;
    title: string;

    constructor(public paramTitle: string) {
        this.title = paramTitle;
    }

    setId(paramId: number) {
        this.id = `todo-item: ${paramId}`;
    }

    getNumericId() {
        let numericId = this.id.split(":", 1);
        console.log('numericId:', numericId);
        return numericId;
    }
}