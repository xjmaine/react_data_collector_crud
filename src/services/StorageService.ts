import {FieldData} from "../models/FieldData.ts";

export class StorageService{
    private static readonly STORAGE_KEY: string = "fieldData"; //private static final member

    //fetch all data - return an array of FieldData objects
    static getAllData(): FieldData[]{
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data):[]
    }

    static saveData(fieldData : FieldData): void{
        const  existingData = this.getAllData();
        existingData.push(fieldData);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingData));
    }

    static clearData(): void{
        localStorage.removeItem(this.STORAGE_KEY)
    }
}