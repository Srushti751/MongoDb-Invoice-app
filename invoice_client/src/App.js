import './App.css';
import Dashboard from './components/Dashboard';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import NavBar from './components/NavBar';
import AddInvoice from './components/AddInvoice';
import InvoiceData from './components/InvoiceData';
import Upload from './components/Upload';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
      <Switch>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/addinvoice" component={AddInvoice}/>
                <Route exact path="/invoicedata/:id" component={InvoiceData}/>
                <Route exact path="/upload" component={Upload}/>
                
                <Route exact path="/register" component={Signup}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/" component={Signup}/>

            </Switch>

      </Router>
    </div>
  );
}

export default App;
