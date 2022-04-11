export default class TodoItemDTO {
    id: string;
    title: string;
    is_checked: boolean;

    constructor(public itemIdProp: string, public titleProp: string, public isCheckedProp: boolean) {
        this.id = itemIdProp;
        this.title = titleProp;
        this.is_checked = isCheckedProp;
    }
}