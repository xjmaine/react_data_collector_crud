import { useState, type FormEvent } from 'react';
import { FieldData } from '../../models/FieldData';
import { useFieldData } from './useFieldData';

function FieldDataForm() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { addData } = useFieldData();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fieldData = new FieldData(title, description);
    addData(fieldData);
    setTitle('');
    setDescription('');
    alert('Data saved!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save Data</button>
    </form>
  );
}

export default FieldDataForm;