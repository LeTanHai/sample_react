import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './scss/App.scss';
import SidebarNav from './components/Sidebar/SidebarNav';
import { Row } from 'react-bootstrap';
import AccountsManagement from './pages/AccountsManagement';
import OrdersManagement from './pages/OrdersManagement';
import SubpliesManagement from './pages/SubpliesManagement';
import NotificationsManagement from './pages/NotificationsManagement';

function App() {
  return (
      <Router>
        <Switch>
          <SidebarNav>
            <Route exact path="/account">
              <AccountsManagement/>
            </Route>
            <Route exact path="/orders">
              <OrdersManagement/>
            </Route>
            <Route exact path="/subplies">
              <SubpliesManagement/>
            </Route>
            <Route exact path="/notify">
              <NotificationsManagement/>
            </Route>
          </SidebarNav>
        </Switch>
      </Router>
  );
}

export default App;
