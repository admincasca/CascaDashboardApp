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

export function SendNotification() {

    const state = {

        // Initially, no file is selected
        title: "",
        body: "",
        imageUrl: "",
        image: null,
        test: ""
    };

    const onImageChange = event => {
        state.image = event.target.files[0];
    };

    const onAllSelect = () => {
        if (document.getElementById("all").checked) {
            document.getElementById("casca").checked = true;
            document.getElementById("sanes").checked = true;
            document.getElementById("neoliva").checked = true;
            document.getElementById("skinVenture").checked = true;
            document.getElementById("medliva").checked = true;
            document.getElementById("fluffAdore").checked = true;
        } else {
            document.getElementById("casca").checked = false;
            document.getElementById("sanes").checked = false;
            document.getElementById("neoliva").checked = false;
            document.getElementById("skinVenture").checked = false;
            document.getElementById("medliva").checked = false;
            document.getElementById("fluffAdore").checked = false;
        }
    }

    const onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        const Divisions = new Set();
        if (document.getElementById("all").checked) {
            Divisions.add(5);
        } else {
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
        }

        if (Divisions.size == 0 && !document.getElementById("test").checked) {
            alert("Please select atleast one division!");
        }

        var divisionString = "";
        Divisions.forEach(div_id => { divisionString = divisionString + div_id + "," });
        var divisionIds = divisionString.substring(0, divisionString.length - 1);

        if (state.image != null) {
            formData.append(
                "multipartImage",
                state.image,
                state.image.name
            );
        }

        formData.append("title", state.title);
        formData.append("body", state.body);
        formData.append("imageUrl", state.imageUrl);
        formData.append("divisionIds", divisionIds);

        if (document.getElementById("test").checked) {
            formData.append("test", "true");
        } else {
            formData.append("test", "false");
        }

        axios.post("https://cascamailsender.azurewebsites.net/sendnotification", formData)
            .then((response) => { alert(response.data) });
        //axios.get("http://127.0.0.1:8080/ping/")
        //    .then((response) => { alert(response.data) });
    };

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">
            <h1 style={{ color: '#047BD5' }}>SEND NOTIFICATION</h1>
            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Title</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.title = event.target.value; }} type="text" id="title" name="title"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Body</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.body = event.target.value; }} type="text" id="body" name="body"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Image URL</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.imageUrl = event.target.value; }} type="text" id="imageUrl" name="imageUrl"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Image</h4>
                </div>

                <div class="flex-child green">
                    <input type="file" id="image" name="image" onChange={onImageChange}></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Test Account</h4>
                </div>

                <div class="flex-child green">
                    <div>
                        <input type="checkbox" id="test" name="test" />
                        <label for="test">Yes</label>
                    </div>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Divisions</h4>
                </div>

                <div class="flex-child green">
                    <div>
                        <input onChange={onAllSelect} type="checkbox" id="all" name="all" />
                        <label for="all">All Divisions</label>
                    </div>

                    <div>
                        <input type="checkbox" id="casca" name="casca" />
                        <label for="casca">Casca</label>
                    </div>

                    <div>
                        <input type="checkbox" id="sanes" name="sanes" />
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
                        <label for="medliva">Fluff Adore</label>
                    </div>
                </div>

            </div>

            <button class="button" onClick={onFileUpload}>SUBMIT</button>

        </div>
    );
}
