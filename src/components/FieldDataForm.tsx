import {useState, type FormEvent} from "react";
import {FieldData} from "../models/FieldData.ts";
import {StorageService} from "../services/StorageService.ts";

function FieldDataForm(){
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fieldData = new FieldData(title, description);
        StorageService.saveData(fieldData);
        setTitle("");
        setDescription("");
        alert("Data saved successfully");
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title: </label>
                <input type="text"
                       value={title}
                       onChange={(event) => setTitle(event.target.value)}
                       required
                />
            </div>
            <div>
                <label>Description: </label>
                <textarea value={description}
                          onChange={(event) => setDescription(event.target.value)}
                          required
                />
            </div>
            <button type="submit">Save</button>
        </form>
    )
}

export default FieldDataForm;