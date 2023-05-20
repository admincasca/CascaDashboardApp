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
import { contains } from 'jquery';

export function InvoiceUpload() {

    const state = {

        // Initially, no file is selected
        selectedFile: null,
        partyId: null,
        invoiceDate: null,
        invoiceNo: null
    };

    const onFileChange = event => {

        // Update the state
        state.selectedFile = event.target.files[0];

    };

    const handleChange = event => {

        // Update the state
        state.partyId = event.value;

    };

    const onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "multipartFile",
            state.selectedFile,
            state.selectedFile.name
        );

        formData.append("id", state.partyId);
        formData.append("financialYear", "2022-23");
        formData.append("invoiceNo", state.invoiceNo);
        formData.append("invoiceDate", state.invoiceDate);

        axios.post("https://cascamailsender.azurewebsites.net/invoiceUpload", formData)
            .then((response) => {
                alert(response.data)
            });
    };

    const Parties = [];

    const [post, setPost] = React.useState(null);

    fetch('https://cascaappservice.azurewebsites.net/all_users_read/', { mode: 'cors' })
        .then(response => response.text())
        .then(data => setPost(data));

    if (!post) return null;

    var postModified = post.replace(/'/g, '"');
    let jsonData = JSON.parse(JSON.stringify(postModified));
    let jsonObject = JSON.parse(jsonData);
    jsonObject.forEach(object => {
        Parties.push({ label: object.companyName + " (" + object.username + ")" + " (" + object.id + ")", value: object.id });
    })

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">
            <h1 style={{ color: '#047BD5' }}>INVOICE UPLOAD</h1>
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
                    <h4>Invoice No.</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.invoiceNo = event.target.value; }} type="text" id="invoiceNo" name="invoiceNo"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Invoice Date</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.invoiceDate = event.target.value; }} type="date" id="birthday" name="birthday"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>File</h4>
                </div>

                <div class="flex-child green">
                    <input type="file" id="myfile" name="myfile" onChange={onFileChange}></input>
                </div>

            </div>

            <button class="button" onClick={onFileUpload}>UPLOAD</button>

        </div>
    );
}
