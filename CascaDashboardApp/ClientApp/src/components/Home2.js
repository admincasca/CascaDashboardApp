import '../App.css';
import Select from 'react-select';
import axios from "axios";
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import background from "../background.jpg";
import { Redirect } from 'react-router';
import { contains } from 'jquery';

export function Home2() {


    const [post2, setPost2] = React.useState("id");
    const [isLoading, setLoading] = React.useState(true);

    if (localStorage.getItem('cascathirdparty') != null && localStorage.getItem('cascathirdparty') == 'true') {
        var username = localStorage.getItem('cascathirdparty-username');
        var password = localStorage.getItem('cascathirdparty-password');

        const formData = new FormData();

        formData.append("username", username);
        formData.append("password", password);

        fetch('https://cascamailsender.azurewebsites.net/userLoginRead/',
            {
                method: "POST",
                body: formData
            },
            { mode: 'cors' })
            .then(response => response.text())
            .then(data => {
                setPost2(data);
                setLoading(false);
            });

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

        if (post2 != null && post2 != "") {

            return (
                <div style={{
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover"
                }} className="App">
                    <h2>Welcome to CASCA Dashboard</h2>
                </div>
            );
        } else {
            return (
                <div>
                    <Router>
                        <Switch>


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


                        <Redirect to="/" />
                    </Switch>
                </Router>
            </div>
        );
    }
}
