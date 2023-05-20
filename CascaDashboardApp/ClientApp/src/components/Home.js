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
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export function Home() {

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        alert(profile.getName());
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    return (
        /*<GoogleOAuthProvider clientId="949273575411-v09krdvsa4p4fgkbpnutoujkh7qgi3a4.apps.googleusercontent.com">
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">
                <h2>Welcome to CASCA Dashboard</h2>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />;
            </div>
        </GoogleOAuthProvider>*/
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">
            <h2>Welcome to CASCA Dashboard</h2>
        </div>
    );
}
