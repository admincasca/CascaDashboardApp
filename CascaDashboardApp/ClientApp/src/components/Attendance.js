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

export function Attendance() {

    const state = {

        // Initially, no file is selected
        selectedFile: null,
        employeeId: null,
        slot1InTime: null,
        slot1OutTime: null,
        slot2InTime: null,
        slot2OutTime: null,
        dinnerBreak: null
    };

    const onFileChange = event => {

        // Update the state
        state.selectedFile = event.target.files[0];

    };

    const handleChange = event => {

        // Update the state
        state.employeeId = event.value;

    };

    const onFileUpload = () => {

        /*if (state.slot1InTime != null && !document.getElementById("present").checked) {
            alert("Slot 1 In-Time provided but isPresent is not selected")
            return;
        }

        if ((state.slot1InTime == null || state.slot1OutTime == null)
            && document.getElementById("present").checked) {
            alert("Slot 1 In and Out Time not provided")
            return;
        }*/

        if ((state.slot2InTime == null && state.slot2OutTime != null)
            || (state.slot2InTime != null && state.slot2OutTime == null)) {
            alert("Slot 2 In and Out Time invalid")
            return;
        }

        if (state.slot2InTime != null && state.slot2OutTime != null
            && state.slot2InTime > state.slot2OutTime) {
            alert("Slot 2 In and Out Time invalid")
            return;
        }

        if (state.slot1InTime != null && state.slot1OutTime != null
            && state.slot1InTime > state.slot1OutTime) {
            alert("Slot 1 In and Out Time invalid")
            return;
        }

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "multipartFile",
            state.selectedFile,
            state.selectedFile.name
        );

        formData.append("employeeId", state.employeeId);
        formData.append("slot1StartDate", state.slot1InTime);
        formData.append("slot1EndDate", state.slot1OutTime);
        formData.append("slot2StartDate", state.slot2InTime);
        formData.append("slot2EndDate", state.slot2OutTime);

        if (document.getElementById("dinnerbreak").checked) {
            formData.append("dinnerBreak", 1);
        } else {
            formData.append("dinnerBreak", 0);
        }

        axios.post("https://cascamailsender.azurewebsites.net/attendance", formData)
            .then((response) => { alert(response.data) });
        //axios.get("http://127.0.0.1:8080/attendance")
        //    .then((response) => { alert(response.data) });
    };

    const Employees = [];

    const [post, setPost] = React.useState(null);

    fetch('https://cascaappservice.azurewebsites.net/all_employees_read/', { mode: 'cors' })
        .then(response => response.text())
        .then(data => setPost(data));

    if (!post) return null;

    var postModified = post.replace(/'/g, '"');
    let jsonData = JSON.parse(JSON.stringify(postModified));
    let jsonObject = JSON.parse(jsonData);
    jsonObject.forEach(object => {
        Employees.push({ label: object.name + " (" + object.joiningDate + ")" + " (" + object.id + ")", value: object.id });
    })

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">
            <h1 style={{ color: '#047BD5' }}>ATTENDANCE UPLOAD</h1>
            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Employee Name</h4>
                </div>

                <div class="flex-child green">
                    <div className="row">
                        <div className="col-md-6">
                            <Select onChange={handleChange.bind(this)} options={Employees} id="personname" name="personname">
                            </Select>
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Shift 1</h4>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Time In</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.slot1InTime = event.target.value; }} type="datetime-local" id="timeIn1" name="timeIn1"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Time Out</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.slot1OutTime = event.target.value; }} type="datetime-local" id="timeOut1" name="timeOut1"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Shift 2</h4>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Time In</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.slot2InTime = event.target.value; }} type="datetime-local" id="timeIn2" name="timeIn2"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Time Out</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.slot2OutTime = event.target.value; }} type="datetime-local" id="timeOut2" name="timeOut2"></input>
                </div>

            </div>


            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Dinner Break</h4>
                </div>

                <div class="flex-child green">
                    <div>
                        <input type="checkbox" id="dinnerbreak" name="dinnerbreak" />
                        <label for="dinnerbreak">Yes</label>
                    </div>
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

            <button class="button" onClick={onFileUpload}>SUBMIT</button>

        </div>
    );
}
