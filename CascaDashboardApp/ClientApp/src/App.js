import React, { Component } from 'react';
import axios from "axios";
import { Home } from './components/Home';
import { TrackingDetailsUpload } from './components/TrackingDetailsUpload';
import { InvoiceUpload } from './components/InvoiceUpload';
import { ProductModification } from './components/ModifyProduct';
import { AddProduct } from './components/AddProduct';
import { AddUser } from './components/AddUser';
import { FetchInvoices } from './components/FetchInvoices';
import { SendNotification } from './components/SendNotification';
import { CreateOrder } from './components/CreateOrder';
import { UserDetails } from './components/UserDetails';
import { Logout } from './components/Logout';
import { Attendance } from './components/Attendance';

import './App.css';
import cascaLogo from "./casca_logo.png";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Redirect } from 'react-router';
import './custom.css'
import SideNav from './components/SideNav';

//export function App() {
export class App extends Component {


    //render() {

        /*const [post, setPost] = React.useState(null);

        if (localStorage.getItem('cascathirdparty12') != null && localStorage.getItem('cascathirdparty12') == 'true') {
            var username = localStorage.getItem('cascathirdparty-username');
            var password = localStorage.getItem('cascathirdparty-password');

            const formData = new FormData();

            formData.append("username", username);
            formData.append("password", password);
            
            axios.post("http://127.0.0.1:8080/userLoginRead/", formData)
                .then((response) => {
                    setPost(response.data);
                });

            if (post == "valid") {

                return (

                    <div>


                        <div class="split_top">

                            <img className="header_img" src={cascaLogo} alt="logo" />
                            <h3 className="header_h1">Hello {username}</h3>

                        </div>




                        <div class="split_bottom">
                            <Router>
                                <Switch>
                                    <Route path='/home'><Home /></Route>
                                    <Route path="/invoiceupload"><InvoiceUpload /></Route>
                                    <Route path='/trackingdetailsupload'><TrackingDetailsUpload /></Route>
                                    <Route path='/productmodification'><ProductModification /></Route>
                                    <Route path='/productadd'><AddProduct /></Route>
                                    <Route path='/useradd'><AddUser /></Route>
                                    <Route path='/sendnotification'><SendNotification /></Route>
                                    <Route path='/createorder'><CreateOrder /></Route>
                                    <Route path='/fetchUserDetails'><UserDetails /></Route>
                                    <Route path='/viewgstinvoices'><FetchInvoices /></Route>
                                    <Route path='/logout'><Logout /></Route>
                                </Switch>
                            </Router>

                            <div>
                                <SideNav name="sideNav" >
                                </SideNav>
                            </div>
                        </div>


                    </div>

                );
            } else {
                return (
                    <div>
                        <Router>
                            <Switch>
                                <Route path="/invoiceupload"><InvoiceUpload /></Route>
                                <Route path='/trackingdetailsupload'><TrackingDetailsUpload /></Route>
                                <Route path='/productmodification'><ProductModification /></Route>
                                <Route path='/productadd'><AddProduct /></Route>
                                <Route path='/useradd'><AddUser /></Route>
                                <Route path='/sendnotification'><SendNotification /></Route>
                                <Route path='/createorder'><CreateOrder /></Route>
                                <Route path='/fetchUserDetails'><UserDetails /></Route>
                                <Route path='/viewgstinvoices'><FetchInvoices /></Route>
                                <Route path='/logout'><Logout /></Route>

                                <Redirect to="/" />
                            </Switch>
                        </Router>
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <Router>
                        <Switch>
                            <Route path="/invoiceupload"><InvoiceUpload /></Route>
                            <Route path='/trackingdetailsupload'><TrackingDetailsUpload /></Route>
                            <Route path='/productmodification'><ProductModification /></Route>
                            <Route path='/productadd'><AddProduct /></Route>
                            <Route path='/useradd'><AddUser /></Route>
                            <Route path='/sendnotification'><SendNotification /></Route>
                            <Route path='/createorder'><CreateOrder /></Route>
                            <Route path='/fetchUserDetails'><UserDetails /></Route>
                            <Route path='/viewgstinvoices'><FetchInvoices /></Route>
                            <Route path='/logout'><Logout /></Route>

                            <Redirect to="/" />
                        </Switch>
                    </Router>
                </div>
            );
        }*/


        render () {
          return (
              <div>
                  <Router>
                      <Switch>
                          <Route exact path='/'><Home /></Route>
                          <Route path="/invoiceupload"><InvoiceUpload /></Route>
                          <Route path='/trackingdetailsupload'><TrackingDetailsUpload /></Route>
                          <Route path='/productmodification'><ProductModification /></Route>
                          <Route path='/productadd'><AddProduct /></Route>
                          <Route path='/useradd'><AddUser /></Route>
                          <Route path='/sendnotification'><SendNotification /></Route>
                          <Route path='/createorder'><CreateOrder /></Route>
                          <Route path='/fetchUserDetails'><UserDetails /></Route>
                          <Route path='/attendance'><Attendance /></Route>
                      </Switch>
                  </Router>

                  <div>
                      <SideNav name="sideNav" >
                      </SideNav>
                  </div>
              </div>
          );
        }
}