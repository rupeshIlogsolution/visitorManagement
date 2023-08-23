
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login/Login'
import DieselLog from './components/diesellog/DieselLog';
import GeneratorLogBook from './components/generatorlog/GeneratorLog';
import Visitor from './components/visitor/Visitor'
import Warehouse from './components/Warehouse/Warehouse'
import Vehicle from './components/vehicle/vehicle';
import PrivatRoute from './components/PrivateRoute/PrivateRoute';

import InsertGuard from './components/Guards/GuardsMaster/InsertGuard';
import TotalGuards from './components/Guards/GuardsMaster/TotalGuard'
import GuardsLogs from './components/Guards/GuardsLogs/guardslogs'
import GuardsLogOut from './components/Guards/GuardsLogs/Guardslogoutlogs';
import GuardsHistory from './components/Guards/GuardsMaster/GuardHistory';
import EditGuard from './components/Guards/GuardsMaster/EditGuard'
import VehicleLogs from './components/VehicleLogs/VehicleLogs';
import VehicleIn from './components/VehicleLogs/VehicleIn';
import VehicleOut from './components/VehicleLogs/VehicleOut';


import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
function App() {
  return (
    <div className="App">
     <Router>
     <Switch>
         <Route exact path="/" component={Login}/>
         <PrivatRoute exact path="/Dashboard" component={Dashboard}/>
         <PrivatRoute exact path="/DieselLog" component={DieselLog}/>
         <PrivatRoute exact path="/GeneratorLogBook" component={GeneratorLogBook}/>
         <PrivatRoute exact path="/VisitorLogBook" component={Visitor}/>
         <PrivatRoute exact path="/Warehouse" component={Warehouse}/>
         <PrivatRoute exact path="/Vehicle" component={Vehicle}/>

         <Route expact path="/InsertGuard" component={InsertGuard}/>
         <Route expact path="/EditGuard" component={EditGuard}/>

      <Route expact path="/TotalGuards" component={TotalGuards}/>
      <Route expact path="/guardslogs" component={GuardsLogs}/>
      <Route expact path="/guardslogout" component={GuardsLogOut}/>
      <Route expact path="/guardshistory" component={GuardsHistory}/>
      <Route expact path="/vehiclelogs" component={VehicleLogs}/>

      <Route expact path="/vehicleIn" component={VehicleIn}/>
      <Route expact path="/vehicleOut" component={VehicleOut}/>


      
     </Switch>
     </Router>

    </div>
  );
}

export default App;
