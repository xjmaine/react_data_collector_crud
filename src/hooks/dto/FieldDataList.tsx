import {useFieldData} from "./useFieldData.ts";

//serice class
function FieldDataList() {
  const { dataList } = useFieldData();

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
              <p>
                <em>{new Date(data.timestamp).toLocaleString()}</em>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FieldDataList;