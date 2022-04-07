export default class TodoItemDTO {
    id: string;
    title: string;

    constructor(public itemIdProp: string, public titleProp: string) {
        this.id = itemIdProp;
        this.title = titleProp;
    }
}