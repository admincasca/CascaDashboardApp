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

export function UserDetails() {

    const state = {
        user_id: null,
        marketing_user_name: null,
        marketing_user_mail: null,
        username: null,
        is_logged_in: null,
        company_name: null,
        person_name: null,
        email_id: null,
        contact_no: null,
        city: null,
        states: null
    };

    const handleChange = event => {
        // Update the state
        var marketingExecutiveName = document.getElementById("marketing_executive_name");
        var marketingExecutiveMail = document.getElementById("marketing_executive_mail");
        var username = document.getElementById("username");
        var isLoggedIn = document.getElementById("is_logged_in");
        var companyName = document.getElementById("company_name");
        var personName = document.getElementById("person_name");
        var emailId = document.getElementById("email_id");
        var contactNo = document.getElementById("contact_no");
        var city = document.getElementById("city");
        var states = document.getElementById("states");

        username.value = event.value.username;
        isLoggedIn.value = event.value.isLoggedIn;
        personName.value = event.value.personName;
        companyName.value = event.value.companyName;
        emailId.value = event.value.emailId;
        contactNo.value = event.value.contactNo;
        city.value = event.value.city;
        states.value = event.value.state;
        marketingExecutiveName.value = event.value.marketingPersonName;
        marketingExecutiveMail.value = event.value.marketingPersonMail;

        state.user_id = event.value.id;
        state.username = event.value.username;
        state.is_logged_in = event.value.isLoggedIn;
        state.person_name = event.value.personName;
        state.email_id = event.value.emailId;
        state.company_name = event.value.companyName;
        state.contact_no = event.value.contactNo;
        state.city = event.value.city;
        state.states = event.value.state;
        state.marketing_user_name = event.value.marketingPersonName;
        state.marketing_user_mail = event.value.marketingPersonMail;

    };

    const onUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        if (state.contact_no == null || state.contact_no.includes(' ')) {
            alert("Contact No is invalid. It should not have any space. Please change it!");
            return;
        }

        if (state.is_logged_in == null || state.is_logged_in.includes(' ') || !(state.is_logged_in == 'true' || state.is_logged_in == 'false')) {
            alert("Is Logged In value should be strictly true or false!");
            return;
        }

        // Update the formData object

        formData.append("userId", state.user_id);
        formData.append("isLoggedIn", state.is_logged_in);
        formData.append("companyName", state.company_name);
        formData.append("personName", state.person_name);
        formData.append("emailId", state.email_id);
        formData.append("contactNo", state.contact_no);
        formData.append("city", state.city);
        formData.append("state", state.states);
        formData.append("marketingPersonName", state.marketing_user_name);
        formData.append("marketingPersonMail", state.marketing_user_mail);


        axios.post("https://cascamailsender.azurewebsites.net/userdetailsmodify", formData);
    };

    const Parties = [];

    const [post, setPost] = React.useState(null);

    fetch('https://cascaappservice.azurewebsites.net/all_users_read_v1/', { mode: 'cors' })
        .then(response => response.text())
        .then(data => setPost(data));

    if (!post) return null;

    var postModified = post.replace(/'/g, '"');
    let jsonData = JSON.parse(JSON.stringify(postModified));
    let jsonObject = JSON.parse(jsonData);
    jsonObject.forEach(object => {
        Parties.push({ label: object.companyName + " (" + object.username + ")" + " (UserId: " + object.id + ")", value: object });
    })

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">
            <h1 style={{ color: '#047BD5' }}>USER DETAILS</h1>
            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Party Name</h4>
                </div>

                <div class="flex-child green">
                    <div className="row">
                        <div className="col-md-6">
                            <Select onChange={handleChange.bind(this)} options={Parties} id="partyname" name="partyname">
                            </Select>
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Marketing Executive's Name</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.marketing_user_name = event.target.value; }} type="text" id="marketing_executive_name" name="marketing_executive_name"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Marketing Executive's Mail</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.marketing_user_mail = event.target.value; }} type="text" id="marketing_executive_mail" name="marketing_executive_mail"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Username</h4>
                </div>

                <div class="flex-child green">
                    <input disabled={true} onChange={event => { state.username = event.target.value; }} type="text" id="username" name="username"></input>
                </div>

            </div>


            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Is Logged In</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.is_logged_in = event.target.value; }} type="text" id="is_logged_in" name="is_logged_in"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Company Name</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.company_name = event.target.value; }} type="text" id="company_name" name="company_name"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Person Name</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.person_name = event.target.value; }} type="text" id="person_name" name="person_name"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Email Id</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.email_id = event.target.value; }} type="text" id="email_id" name="email_id"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Contact No.</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.contact_no = event.target.value; }} type="text" id="contact_no" name="contact_no"></input>
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
                    <input onChange={event => { state.states = event.target.value; }} type="text" id="states" name="states"></input>
                </div>

            </div>

            <button class="button" onClick={onUpload}>MODIFY</button>

        </div>
    );
}
