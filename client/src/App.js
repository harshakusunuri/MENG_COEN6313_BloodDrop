import React, { Fragment, useEffect } from 'react'
import { Container, Form, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'  //Routes
// import { HashRouter as Router, Route } from 'react-router-dom' 
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import UserRegister from './components/auth/UserRegister'
import UserLogin from './components/auth/UserLogin'
import OrganizationLogin from './components/auth/OrganizationLogin'
import OrganizationRegister from './components/auth/OrganizationRegister'
import DonorAppointmentPage from './components/DonorAppointmentPage';
import MyRequests from './components/my_requests/MyRequests';
import DonorPage from './components/DonorPage';
import StoreDonorSearchNAdminReq from './components/StoreDonorSearchNAdminReq';
import StorePage from './components/StorePage';
import StoreAdmin from './components/store_admin/StoreAdmin';
import StoreDonar from './components/store_donar/StoreDonar';


import './App.css'

import Alert from './components/layout/Alert';

//Redux 
import { Provider } from 'react-redux'
import store from './store'
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';



if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (

    <Provider store={store}>
      <Router>
        <Navbar style={{ display: "Block" }} />
        <Container>
          <Alert />
          <Switch>
            <Route path="/" component={Landing} exact />

            <Route path="/register" component={UserRegister} />
            <Route path="/login" component={UserLogin} />
            <Route path="/donorPage" component={DonorPage} />
            <Route path="/donorAppointmentPage" component={DonorAppointmentPage} />
            <Route path="/myRequests" component={MyRequests} />

            <Route path="/store" component={StorePage} />
            <Route path="/storeDonorSearchNAdminReq" component={StoreDonorSearchNAdminReq} />
            <Route path="/store_admin" component={StoreAdmin} />
            <Route path="/store_donar" component={StoreDonar} />
            {/* 

            <Route path="/organizationRegister" component={OrganizationRegister} />
  <Route path="/organizationLogin" component={OrganizationLogin} /> */}
          </Switch>
        </Container >
      </Router>
    </Provider>

  );
};

export default App;


