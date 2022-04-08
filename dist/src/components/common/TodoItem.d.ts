export default class TodoItem {
    paramTitle: string;
    id: string;
    title: string;
    constructor(paramTitle: string);
    setTitle(newTitle: string): void;
    setId(paramId: number): void;
    getNumericId(): number;
}
