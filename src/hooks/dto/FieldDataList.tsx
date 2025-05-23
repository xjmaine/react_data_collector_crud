import {useFieldData} from "./useFieldData.ts";

function FieldDataList() {
     const { dataList, loading, error } = useFieldData();

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error: {error}</p>;
     if (!Array.isArray(dataList)) return <p>Error: Invalid data format</p>;

     return (
       <div>
         <h2>Saved Field Data</h2>
         {dataList.length === 0 ? (
           <p>No data available.</p>
         ) : (
           <ul>
             {dataList.map((data) => (
               <li key={data.id}>
                 <strong>{data.title}</strong>
                 <p>{data.description}</p>
                 <p>Height: {data.height} cm</p>
                 <p>Weight: {data.weight} kg</p>
                 <p>Blood Pressure: {data.bloodPressureSystolic}/{data.bloodPressureDiastolic} mmHg</p>
                 <p>Age: {data.age} years</p>
                 <p>Gender: {data.gender}</p>
                 <p>Location: {data.location}</p>
                 {data.smokingStatus && <p>Smoking Status: {data.smokingStatus}</p>}
                 {data.stressScore && <p>Stress Score: {data.stressScore}/10</p>}
                 <p>Consent: {data.consent ? 'Yes' : 'No'}</p>
                 <p>Participant ID: {data.participantId}</p>
                 <p><em>{new Date(data.timestamp).toLocaleString()}</em></p>
               </li>
             ))}
           </ul>
         )}
       </div>
     );
   }

   export default FieldDataList;