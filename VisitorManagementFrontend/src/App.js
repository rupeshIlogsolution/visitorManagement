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
import PublicVisitor from './components/PublicVisitor/PublicVisitor';
import Page404 from './components/Page404/Page404'

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import QrCodePage from './components/PublicVisitor/QrcodePage';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivatRoute exact path="/Dashboard" component={Dashboard} />
          <PrivatRoute exact path="/DieselLog" component={DieselLog} />
          <PrivatRoute exact path="/GeneratorLogBook" component={GeneratorLogBook} />
          <PrivatRoute exact path="/VisitorLogBook" component={Visitor} />
          <PrivatRoute exact path="/Warehouse" component={Warehouse} />
          <PrivatRoute exact path="/Vehicle" component={Vehicle} />

          <PrivatRoute expact path="/InsertGuard" component={InsertGuard} />
          <PrivatRoute expact path="/EditGuard" component={EditGuard} />

          <PrivatRoute expact path="/TotalGuards" component={TotalGuards} />
          <PrivatRoute expact path="/guardslogs" component={GuardsLogs} />
          <PrivatRoute expact path="/guardslogout" component={GuardsLogOut} />
          <PrivatRoute expact path="/guardshistory" component={GuardsHistory} />
          <PrivatRoute expact path="/vehiclelogs" component={VehicleLogs} />

          <PrivatRoute expact path="/vehicleIn" component={VehicleIn} />
          <PrivatRoute expact path="/vehicleOut" component={VehicleOut} />
          <PrivatRoute exact path="/QrCodePage" component={QrCodePage}/>
          <Route expact path="/visitorentry/:urlKey" component={PublicVisitor} />
          <Route exact path='*' component={Page404}/>
          
        </Switch>
      </Router>

    </div>
  );
}

export default App;
