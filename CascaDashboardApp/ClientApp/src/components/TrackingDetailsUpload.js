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

export function TrackingDetailsUpload() {
    const state = {

        // Initially, no file is selected
        selectedFile: null,
        partyId: null,
        bookingDate: null,
        deliveryVendor: null,
        trackingNo: null
    };

    const onFileChange = event => {

        // Update the state
        state.selectedFile = event.target.files[0];

    };

    const handleChange = event => {

        // Update the state
        state.partyId = event.value;

    };

    const handleChangeDelivery = event => {

        // Update the state
        state.deliveryVendor = event.value;

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

        formData.append("userId", state.partyId);
        formData.append("bookingDate", state.bookingDate);
        formData.append("trackingNo", state.trackingNo);
        formData.append("deliveryVendor", state.deliveryVendor);

        axios.post("https://cascamailsender.azurewebsites.net/trackingdetailsUpload", formData);
    };

    const Parties = [];

    const Vendors = [];
    /*const Vendors = [
        { label: "Air Transport Corporation", value: "Air Transport Corporation" },
        { label: "Akash Ganga Couriers", value: "Akash Ganga Couriers" },
        { label: "Blue Dart", value: "Blue Dart" },
        { label: "Delhi Kanpur Transport", value: "Delhi Kanpur Transport" },
        { label: "Delhivery", value: "Delhivery" },
        { label: "DTDC Express Limited", value: "DTDC Express Limited" },
        { label: "Express Cargo & Logistics", value: "Express Cargo & Logistics" },
        { label: "Garg Roadlines", value: "Garg Roadlines" },
        { label: "Great India Roadways", value: "Great India Roadways" },
        { label: "Haryana Freight Carriers", value: "Haryana Freight Carriers" },
        { label: "Jai Mata Di Parivahan", value: "Jai Mata Di Parivahan" },
        { label: "Jehlum Roadways", value: "Jehlum Roadways" },
        { label: "Jetline Couriers", value: "Jetline Couriers" },
        { label: "Khushdil", value: "Khushdil" },
        { label: "Mishra Goods Transport", value: "Mishra Goods Transport" },
        { label: "Nagpur Golden Transport", value: "Nagpur Golden Transport" },
        { label: "Navin XPS", value: "Navin XPS" },
        { label: "Nitco", value: "Nitco" },
        { label: "Professional Couriers", value: "Professional Couriers" },
        { label: "Quick Transport", value: "Quick Transport" },
        { label: "Safe Express", value: "Safe Express" },
        { label: "Shree Azad Transport Ltd", value: "Shree Azad Transport Ltd" },
        { label: "SwiftLine Transport", value: "SwiftLine Transport" },
        { label: "TCI Express", value: "TCI Express" },
        { label: "TCI Freight", value: "TCI Freight" },
        { label: "Trackon Couriers", value: "Trackon Couriers" },
        { label: "VRL Logistics Ltd", value: "VRL Logistics Ltd" }
    ]*/

    /*fetch(raw)
        .then(r => r.text())
        .then(text => {
            text.split('\n').forEach(element => {
                Parties.push({ label: element.split(',')[2] + " (" + element.split(',')[1] + ")", value: element.split(',')[0] });
            });
        });*/

    const [post, setPost] = React.useState(null);
    const [post1, setPost1] = React.useState(null);

    /*React.useEffect(() => {
        axios.get("https://cascaappservice.azurewebsites.net/invoices_read/?id=21&financial_year=2021-22")
       .then((response) => { setPost(response.data) })
    }, []);*/

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

    fetch('https://cascaappservice.azurewebsites.net/logistics_read/', { mode: 'cors' })
        .then(response => response.text())
        .then(data => setPost1(data));

    if (!post1) return null;

    var postModified1 = post1.replace(/'/g, '"');
    let jsonData1 = JSON.parse(JSON.stringify(postModified1));
    let jsonObject1 = JSON.parse(jsonData1);
    //return (<h4>{post}</h4>)
    /*var postModified = post.replace(/'/g, '"');
    let jsonData = JSON.parse(JSON.stringify(postModified));
    let jsonObject = JSON.parse(jsonData);*/
    jsonObject1.forEach(object => {
        Vendors.push({ label: object.deliveryVendor, value: object.deliveryVendor });
    })

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">
            <h1 style={{ color: '#047BD5' }}>TRACKING DETAILS UPLOAD</h1>
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
                    <h4>Delivery Vendor</h4>
                </div>

                <div class="flex-child green">
                    <div className="row">
                        <div className="col-md-6">
                            <Select onChange={handleChangeDelivery.bind(this)} options={Vendors} id="deliveryVendor" name="deliveryVendor">
                            </Select>
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Tracking No.</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.trackingNo = event.target.value; }} type="text" id="trackingNo" name="trackingNo"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Booking Date</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.bookingDate = event.target.value; }} type="date" id="birthday" name="birthday"></input>
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