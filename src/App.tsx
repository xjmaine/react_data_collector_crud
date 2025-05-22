import './App.css';
import FieldDataForm from "./components/FieldDataForm.tsx";
import FieldDataList from "./components/FieldDataList.tsx";

function App(){
    return(
        <div>
            <h1>Field Data Collection App</h1>
            <FieldDataForm />
            <FieldDataList />
        </div>
    )
}

export default App; //make the class public