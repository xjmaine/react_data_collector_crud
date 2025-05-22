export class FieldData {
    id: number;
    title: string;
    description: string;
    timestamp: string;

    constructor(title: string, description: string, timestamp?: string) {
        this.id = Date.now(); //unique id based on timestamp
        this.title = title;
        this.description = description;
        // this.timestamp = timestamp != null ? timestamp: new Date().toISOString();
        this.timestamp = timestamp || new Date().toISOString();
    }
}