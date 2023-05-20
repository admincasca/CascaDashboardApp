import './App.css';
import React from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import background from "./background.jpg";
import cascaLogo from "./casca_logo.png";
import { TrackingDetailsUpload } from './components/TrackingDetailsUpload';
import { InvoiceUpload } from './components/InvoiceUpload';
import { ProductModification } from './components/ModifyProduct';
import { AddProduct } from './components/AddProduct';
import { AddUser } from './components/AddUser';
import { SendNotification } from './components/SendNotification';
import { CreateOrder } from './components/CreateOrder';
import { UserDetails } from './components/UserDetails';
import { FetchInvoices } from './components/FetchInvoices';
import { Logout } from './components/Logout';

import SideNav from './components/SideNav';

import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';
import { Button } from 'bootstrap';
import { Home } from './components/Home';
import { Sections } from './components/Sections'
import { IndividualSection } from './components/IndividualSection'
import { Attendance } from './components/Attendance'


export default function Auth() {

    //const history = useHistory();

    const state = {

        // Initially, no file is selected
        username: "",
        password: "",
    };

    const onUpload = () => {

        const formData = new FormData();

        formData.append("username", state.username);
        formData.append("password", state.password);

        axios.post("https://cascamailsender.azurewebsites.net/userLoginRead/", formData, { mode: 'cors' })
            .then((response) => {
                if (response.data != null && response.data != "") {
                    localStorage.setItem('cascathirdparty', 'true');
                    localStorage.setItem('cascathirdparty-username', state.username);
                    localStorage.setItem('cascathirdparty-password', state.password);
                    localStorage.setItem('cascathirdparty-id', response.data.id);
                    alert("Welcome " + state.username + "!");
                    //history.push('/home');
                } else {
                    alert("Login Failed. Please check your Username or Password");
                }
            });
    };

    const [post, setPost] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true);

    if (localStorage.getItem('cascathirdparty') != null && localStorage.getItem('cascathirdparty') == 'true') {
        var username = localStorage.getItem('cascathirdparty-username');
        var password = localStorage.getItem('cascathirdparty-password');

        const formData = new FormData();

        formData.append("username", username);
        formData.append("password", password);

        /*axios.post("https://cascamailsender.azurewebsites.net/userLoginRead/", formData, { mode: 'cors' })
            .then((response) => {
                setPost(response.data);
                setLoading(false);
            }).catch();*/

        fetch('https://cascamailsender.azurewebsites.net/userLoginRead/',
            {
                method: "POST",
                body: formData
            },
            { mode: 'cors' })
            .then(response => response.text())
            .then(data => {
                setPost(data);
                setLoading(false);
            });

        if (!post) return null;

        if (isLoading) {
            return (<div style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "cover"
            }} className="App">
                <h2>Loading...</h2>
            </div>);
        }

        if (post != null && post != "") {

            return (
                <div>


                    <div class="split_top">

                        <img className="header_img" src={cascaLogo} alt="logo" />
                        <h4 className="header_h1">Hello {username}</h4>

                    </div>




                    <div class="split_bottom">

                        <Router>
                            <Switch>
                                <Route path="/home"> <Home /></Route>
                                <Route path="/invoiceupload"><InvoiceUpload /></Route>
                                <Route path='/trackingdetailsupload'><TrackingDetailsUpload /></Route>
                                <Route path='/productmodification'><ProductModification /></Route>
                                <Route path='/productadd'><AddProduct /></Route>
                                <Route path='/useradd'><AddUser /></Route>
                                <Route path='/sendnotification'><SendNotification /></Route>
                                <Route path='/createorder'><CreateOrder /></Route>
                                <Route path='/fetchUserDetails'><UserDetails /></Route>
                                <Route path='/viewgstinvoices'><Sections /></Route>
                                <Route path='/section'><IndividualSection /></Route>
                                <Route path='/attendance'><Attendance /></Route>
                                <Route path='/logout'><Logout /></Route>


                                <Redirect to="/home"/>
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

                <div style={{
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover"
                }} className="Auth">

                    <Router>
                        <Switch>
                            <Route path="/home"> <Home /></Route>                            <Route path="/invoiceupload"><InvoiceUpload /></Route>
                            <Route path='/trackingdetailsupload'><TrackingDetailsUpload /></Route>
                            <Route path='/productmodification'><ProductModification /></Route>
                            <Route path='/productadd'><AddProduct /></Route>
                            <Route path='/useradd'><AddUser /></Route>
                            <Route path='/sendnotification'><SendNotification /></Route>
                            <Route path='/createorder'><CreateOrder /></Route>
                            <Route path='/fetchUserDetails'><UserDetails /></Route>
                            <Route path='/viewgstinvoices'><FetchInvoices /></Route>
                            <Route path='/attendance'><Attendance /></Route>

                            <Route path='/logout'><Logout /></Route>

                        </Switch>
                    </Router>

                    <h2>Welcome to CASCA Third Party Web App</h2>

                    <div style={{ marginTop: "30vh" }} class="flex-container">

                        <div class="auth-child magenta">
                            <h4>Username</h4>
                        </div>

                        <div class="auth-child green">
                            <input onChange={event => { state.username = event.target.value; }} type="text" id="username" name="username"></input>
                        </div>

                    </div>

                    <div class="flex-container">

                        <div class="auth-child magenta">
                            <h4>Password</h4>
                        </div>

                        <div class="auth-child green">
                            <input onChange={event => { state.password = event.target.value; }} type="text" id="password" name="password"></input>
                        </div>

                    </div>

                    <div>
                        <button onClick={onUpload} className="button">LOGIN</button>
                    </div>

                </div>
            );
        }
        
    } else {

        return (

            <div style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "cover"
            }} className="Auth">

                <Router>
                    <Switch>
                        <Route path="/home"> <Home /></Route>
                        <Route path="/invoiceupload"><InvoiceUpload /></Route>
                        <Route path='/trackingdetailsupload'><TrackingDetailsUpload /></Route>
                        <Route path='/productmodification'><ProductModification /></Route>
                        <Route path='/productadd'><AddProduct /></Route>
                        <Route path='/useradd'><AddUser /></Route>
                        <Route path='/sendnotification'><SendNotification /></Route>
                        <Route path='/createorder'><CreateOrder /></Route>
                        <Route path='/fetchUserDetails'><UserDetails /></Route>
                        <Route path='/viewgstinvoices'><FetchInvoices /></Route>
                        <Route path='/attendance'><Attendance /></Route>

                        <Route path='/logout'><Logout /></Route>

                    </Switch>
                </Router>

                <h2>Welcome to CASCA Third Party Web App</h2>

                <div style={{ marginTop: "30vh" }} class="flex-container">

                    <div class="auth-child magenta">
                        <h4>Username</h4>
                    </div>

                    <div class="auth-child green">
                        <input onChange={event => { state.username = event.target.value; }} type="text" id="username" name="username"></input>
                    </div>

                </div>

                <div class="flex-container">

                    <div class="auth-child magenta">
                        <h4>Password</h4>
                    </div>

                    <div class="auth-child green">
                        <input onChange={event => { state.password = event.target.value; }} type="text" id="password" name="password"></input>
                    </div>

                </div>

                <div>
                    <button onClick={onUpload} className="button">LOGIN</button>
                </div>

            </div>
        );
    }
}
