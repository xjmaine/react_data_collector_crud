import './App.css';
import FieldDataForm from "./components/FieldDataForm.tsx";
import ErrorBoundary from "./exceptions/ErrorBoundary.tsx";
import FieldDataList from "./hooks/dto/FieldDataList.tsx";

function App(){
    return(
        <ErrorBoundary>
           <div>
             <h1>Field Data Collection App</h1>
             <FieldDataForm />
             <FieldDataList />
           </div>
         </ErrorBoundary>
    )
}

export default App; //make the class public