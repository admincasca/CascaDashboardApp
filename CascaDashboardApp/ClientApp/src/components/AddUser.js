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
import { contains } from 'jquery';
import background from "../background.jpg";

export function AddUser() {

    const state = {

        // Initially, no file is selected
        username: null,
        password: null,
        companyName: "",
        personName: "",
        contactNo: null,
        city: null,
        state: "",
        marketingPersonName: null,
        marketingPersonMail: null
    };

    const onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        const Divisions = new Set();
        if (document.getElementById("casca").checked) {
            Divisions.add(1);
        }
        if (document.getElementById("sanes").checked) {
            Divisions.add(2);
        }
        if (document.getElementById("neoliva").checked) {
            Divisions.add(3);
        }
        if (document.getElementById("skinVenture").checked) {
            Divisions.add(4);
        }
        if (document.getElementById("medliva").checked) {
            Divisions.add(6);
        }
        if (document.getElementById("fluffAdore").checked) {
            Divisions.add(7);
        }

        if (state.username == null) {
            alert("Username is empty. Please provide the Username!");
            return;
        }

        if (Username.has(state.username)) {
            alert("Username already exits. Please change the Username!");
            return;
        }

        if (state.username.includes(' ')) {
            alert("Username has blank space. Please change the Username!");
            return;
        }

        if (state.password == null) {
            alert("Password is empty. Please provide the Password!");
            return;
        }

        if (state.contactNo == null || state.contactNo.includes(' ') || state.contactNo.size < 13) {
            alert("Contact No is invalid. Please change the Contact No!");
            return;
        }

        if (Divisions.size == 0) {
            alert("Please select atleast one division!");
            return;
        }

        if (state.contactNo.includes('\'')
            || state.contactNo.includes('"')
            || state.contactNo.includes('\'')
            || state.contactNo.includes('"')
            || state.contactNo.includes('\'')
            || state.contactNo.includes('"')        ) {
            alert("Contact No is invalid. Please change the Contact No!");
            return;
        }

        Divisions.add(5);

        var divisionString = "";
        Divisions.forEach(div_id => { divisionString = divisionString + div_id + " " });

        formData.append("marketingPerson", state.marketingPersonName);
        formData.append("marketingPersonMail", state.marketingPersonMail);
        formData.append("username", state.username);
        formData.append("password", state.password);
        formData.append("companyName", state.companyName);
        formData.append("personName", state.personName);

        formData.append("contactNo", state.contactNo);
        formData.append("city", state.city);
        formData.append("state", state.state);
        formData.append("divisions", divisionString);



        axios.post("https://cascamailsender.azurewebsites.net/useradd/", formData)
            .then((response) => {
                if (response.data == "User Added") {
                    alert(response.data)
                    Username.add(state.username);
                }
            });
    };

    const Username = new Set();

    const [post, setPost] = React.useState(null);

    fetch('https://cascaappservice.azurewebsites.net/all_users_read/', { mode: 'cors' })
        .then(response => response.text())
        .then(data => setPost(data));

    if (!post) return null;

    var postModified = post.replace(/'/g, '"');
    let jsonData = JSON.parse(JSON.stringify(postModified));
    let jsonObject = JSON.parse(jsonData);
    jsonObject.forEach(object => {
        Username.add(object.username);
    })

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">
            <h1 style={{ color: '#047BD5' }}>CREATE NEW USER</h1>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Marketing Executive's Name</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.marketingPersonName = event.target.value; }} type="text" id="marketingPersonName" name="marketingPersonName"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Marketing Executive's Mail</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.marketingPersonMail = event.target.value; }} type="text" id="marketingPersonMail" name="marketingPersonMail"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Username</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.username = event.target.value; }} type="text" id="username" name="username"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Password</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.password = event.target.value; }} type="text" id="password" name="password"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Company Name</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.companyName = event.target.value; }} type="text" id="companyName" name="companyName"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Person Name</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.personName = event.target.value; }} type="text" id="personName" name="personName"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Contact No.</h4>
                </div>

                <div class="flex-child green">
                    <input defaultValue={"+91"} onChange={event => { state.contactNo = event.target.value; }} type="text" id="contactNo" name="contactNo"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>City</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.city = event.target.value; }} type="text" id="city" name="city"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>State</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.state = event.target.value; }} type="text" id="state" name="state"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Divisions</h4>
                </div>

                <div class="flex-child green">
                    <div>
                        <input type="checkbox" id="casca" name="casca"/>
                        <label for="casca">Casca</label>
                    </div>

                    <div>
                        <input type="checkbox" id="sanes" name="sanes"/>
                        <label for="sanes">Sanes</label>
                    </div>

                    <div>
                        <input type="checkbox" id="neoliva" name="neoliva" />
                        <label for="neoliva">Neoliva</label>
                    </div>

                    <div>
                        <input type="checkbox" id="skinVenture" name="skinVenture" />
                        <label for="skinVenture">Skin Venture</label>
                    </div>

                    <div>
                        <input type="checkbox" id="medliva" name="medliva" />
                        <label for="medliva">Medliva</label>
                    </div>

                    <div>
                        <input type="checkbox" id="fluffAdore" name="fluffAdore" />
                        <label for="fluffAdore">Fluff Adore</label>
                    </div>
                </div>

            </div>

            <button class="button" onClick={onFileUpload}>SUBMIT</button>

        </div>
    );
}
