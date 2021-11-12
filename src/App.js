import './App.scss';
import Form from "./components/Form";
import CurAddress from './components/CurAddress';
import List from './components/List';
import ResidentModal from './components/ResidentModal';
import RequestStatusModal from './components/RequestStatusModal';

function App() {
  return (
    <div className="app">
       <Form/>
       <CurAddress/>
       <List/>
       <ResidentModal/>
       <RequestStatusModal/>
    </div>
  );
}

export default App;
