import { useState, type FormEvent } from 'react';
import { FieldData } from '../models/FieldData';
import { v4 as uuidv4 } from 'uuid';
import {useFieldData} from "./FieldDataList.tsx";

   function FieldDataForm() {
     const [title, setTitle] = useState<string>('');
     const [description, setDescription] = useState<string>('');
     const [height, setHeight] = useState<string>('');
     const [weight, setWeight] = useState<string>('');
     const [bloodPressureSystolic, setBloodPressureSystolic] = useState<string>('');
     const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState<string>('');
     const [age, setAge] = useState<string>('');
     const [gender, setGender] = useState<string>('');
     const [location, setLocation] = useState<string>('');
     const [smokingStatus, setSmokingStatus] = useState<string>('');
     const [stressScore, setStressScore] = useState<string>('');
     const [consent, setConsent] = useState<boolean>(false);
     const { addData, error } = useFieldData();

     const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       if (!consent) {
         alert('Consent is required');
         return;
       }
       if (!title || !description || !height || !weight || !bloodPressureSystolic || !bloodPressureDiastolic || !age || !gender || !location) {
         alert('All required fields must be filled');
         return;
       }

       const fieldData = new FieldData(
         title,
         description,
         parseFloat(height) || 0,
         parseFloat(weight) || 0,
         parseInt(bloodPressureSystolic) || 0,
         parseInt(bloodPressureDiastolic) || 0,
         parseInt(age) || 0,
         gender,
         location,
         consent,
         uuidv4(),
         smokingStatus || undefined,
         stressScore ? parseInt(stressScore) : undefined
       );

       addData(fieldData);
       setTitle('');
       setDescription('');
       setHeight('');
       setWeight('');
       setBloodPressureSystolic('');
       setBloodPressureDiastolic('');
       setAge('');
       setGender('');
       setLocation('');
       setSmokingStatus('');
       setStressScore('');
       setConsent(false);
       alert('Data saved!');
     };

     return (
       <form onSubmit={handleSubmit}>
         {error && <p style={{ color: 'red' }}>Error: {error}</p>}
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
         <div>
           <label>Height (cm):</label>
           <input
             type="number"
             step="0.01"
             value={height}
             onChange={(e) => setHeight(e.target.value)}
             required
           />
         </div>
         <div>
           <label>Weight (kg):</label>
           <input
             type="number"
             step="0.01"
             value={weight}
             onChange={(e) => setWeight(e.target.value)}
             required
           />
         </div>
         <div>
           <label>Blood Pressure (Systolic, mmHg):</label>
           <input
             type="number"
             value={bloodPressureSystolic}
             onChange={(e) => setBloodPressureSystolic(e.target.value)}
             required
           />
         </div>
         <div>
           <label>Blood Pressure (Diastolic, mmHg):</label>
           <input
             type="number"
             value={bloodPressureDiastolic}
             onChange={(e) => setBloodPressureDiastolic(e.target.value)}
             required
           />
         </div>
         <div>
           <label>Age (years):</label>
           <input
             type="number"
             value={age}
             onChange={(e) => setAge(e.target.value)}
             required
           />
         </div>
         <div>
           <label>Gender:</label>
           <select value={gender} onChange={(e) => setGender(e.target.value)} required>
             <option value="">Select</option>
             <option value="male">Male</option>
             <option value="female">Female</option>
             {/*<option value="other">Other</option>*/}
           </select>
         </div>
         <div>
           <label>Location (e.g., city):</label>
           <input
             type="text"
             value={location}
             onChange={(e) => setLocation(e.target.value)}
             required
           />
         </div>
         <div>
           <label>Smoking Status (optional):</label>
           <select value={smokingStatus} onChange={(e) => setSmokingStatus(e.target.value)}>
             <option value="">Select</option>
             <option value="yes">Yes</option>
             <option value="no">No</option>
           </select>
         </div>
         <div>
           <label>Stress Score (1-10, optional):</label>
           <input
             type="number"
             min="1"
             max="10"
             value={stressScore}
             onChange={(e) => setStressScore(e.target.value)}
           />
         </div>
         <div>
           <label>
             <input
               type="checkbox"
               checked={consent}
               onChange={(e) => setConsent(e.target.checked)}
               required
             />
             I consent to data collection
           </label>
         </div>
         <button type="submit">Save Data</button>
       </form>
     );
   }

   export default FieldDataForm;