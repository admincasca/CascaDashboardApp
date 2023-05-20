import '../App.css';
import Select from 'react-select';
import axios from "axios";
import React from "react";
import express from "connect-flash";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { data } from 'jquery';
import background from "../background.jpg";

export function ViewOrder() {
    const state = {

        // Initially, no file is selected
        userId: null,
        companyName: null,
        city: null,
        preparedBy: null,
        deliveryMode: null,
        deliveryVendor: null,
        quantity: null,
        rate: null,
        remarks: null,

        productId: null,
        division: null,
        brandName: null,
        composition: null,
        packing: null,
        mrp: null,
        gst: null,
    };

    /*function addItem() {
        var ul = document.getElementById("dynamic-list");
        var candidate = document.getElementById("candidate");
        var li = document.createElement("li");
        li.setAttribute('id', candidate.value);
        li.appendChild(document.createTextNode(candidate.value));
        ul.appendChild(li);
    }

    function removeItem() {
        var ul = document.getElementById("dynamic-list");
        var candidate = document.getElementById("candidate");
        var item = document.getElementById(candidate.value);
        ul.removeChild(item);
    }*/

    const handleChange = event => {
        // Update the state
        var inputmrp = document.getElementById("mrp");

        state.productId = event.value.id;
        state.division = event.value.division;
        state.brandName = event.value.brandName;
        state.composition = event.value.composition;
        state.packing = event.value.packing;
        state.mrp = event.value.mrp;
        state.gst = event.value.gst;

        inputmrp.value = event.value.mrp;
    };

    const handleDelete = (productId) => {

        var item = document.getElementById(productId);
        if (item != null) {
            document.getElementById("myTable").removeChild(item);
        }
    }

    const handleSubmit = event => {

        var today = new Date();
        var date = today.getFullYear() + '/' + (today.getMonth() + 1).toString() + '/' + today.getDate().toString();
        var time = today.getHours().toString() + ":" + today.getMinutes().toString() + ":" + today.getSeconds().toString();
        var dateTime = date + ' ' + time;

        var jsonData = "[";

        var table = document.getElementById("myTable");
        for (var i = 1, row; row = table.rows[i]; i++) {
            jsonData += "{"
                + "\"userId\":\"" + state.userId
                + "\",\"id\":" + i
                + ",\"orderNo\":\"" + dateTime
                + "\",\"productDetailsId\":" + row.cells[0].textContent
                + ",\"quantity\":" + row.cells[5].textContent
                + ",\"mrp\":" + row.cells[3].textContent
                + ",\"rate\":" + row.cells[4].textContent
                + ",\"status\":\"INACTIVE\""
                + ",\"deliveryMode\":\"" + state.deliveryMode
                + "\",\"deliveryVendor\":\"" + state.deliveryVendor
                + "\"},";
        }

        var jsonData = jsonData.substring(0, jsonData.length - 1);
        jsonData += "]"

        axios.post("https://cascaappservice.azurewebsites.net/active_orders_update_v3/", jsonData)
            .then((response) => {
                if (response.data == "Order Created") {
                    alert(response.data)
                }
            });

        var data = "Company Name," + state.companyName.replace(",", " ") + ",City," + state.city.replace(",", " ") + ",Date," + dateTime + "\n";
        data += "Delivery Mode," + state.deliveryMode + ",Delivery Vendor," + state.deliveryVendor + ",Prepared By," + state.preparedBy + ",Amount,\n\n";

        data += "S.No.,Brand Name,Packing,Quantity,MRP,Rate,Batch No,Mfg Date,Exp Date\n";
        for (var i = 1, row; row = table.rows[i]; i++) {
            data += i + "," + row.cells[1].textContent + "," + row.cells[2].textContent + "," + row.cells[5].textContent + "," + row.cells[3].textContent + "," + row.cells[4].textContent + ",,,\n"
        }

        data += "Remarks," + state.remarks + "\n";

        // Create a Blob object
        const blob = new Blob([data]);

        const url = URL.createObjectURL(blob);
        download(url, state.companyName + "_" + dateTime.split(" ")[0] + "_order.csv")
    }

    const download = (path, filename) => {
        // Create a new link
        const anchor = document.createElement('a');
        anchor.href = path;
        anchor.download = filename;

        // Append to the DOM
        document.body.appendChild(anchor);

        // Trigger `click` event
        anchor.click();

        // Remove element from DOM
        document.body.removeChild(anchor);
    };

    const handleAction = event => {
        // Update the state

        //var ul = document.getElementById("dynamic-list");

        var item = document.getElementById(state.productId);
        if (item == null) {

            var y = document.createElement("tr");
            y.setAttribute("id", state.productId);
            document.getElementById("myTable").appendChild(y);

            var z = document.createElement("td");
            z.setAttribute("class", "border_class");
            var t = document.createTextNode(state.productId);
            z.appendChild(t);
            y.appendChild(z);

            var z = document.createElement("td");
            z.setAttribute("class", "border_class");
            var t = document.createTextNode(state.brandName);
            z.appendChild(t);
            y.appendChild(z);

            var z = document.createElement("td");
            z.setAttribute("class", "border_class");
            var t = document.createTextNode(state.packing);
            z.appendChild(t);
            y.appendChild(z);


            var z = document.createElement("td");
            z.setAttribute("class", "border_class");
            var t = document.createTextNode(state.mrp);
            z.appendChild(t);
            y.appendChild(z);


            var z = document.createElement("td");
            z.setAttribute("class", "border_class");
            var t = document.createTextNode(state.rate);
            z.appendChild(t);
            y.appendChild(z);


            var z = document.createElement("td");
            z.setAttribute("class", "border_class");
            var t = document.createTextNode(state.quantity);
            z.appendChild(t);
            y.appendChild(z);

            var z = document.createElement("td");
            z.setAttribute("class", "border_class");
            var t = document.createElement("button");
            t.textContent = "Delete";

            var productId = state.productId;
            t.addEventListener('click', function () {
                handleDelete(productId);
            });


            z.appendChild(t);
            y.appendChild(z);


            /*var li = document.createElement("li");
            li.setAttribute('id', state.productId);
            li.appendChild(document.createTextNode(state.brandName + " MRP: " + state.mrp));
            li.appendChild(document.createTextNode("MRP: " + state.mrp));
            ul.appendChild(li);*/
        }

        //var inputDivision = document.getElementById("productImage");
        //                    <ul id="dynamic-list"></ul>
        //<img width="500" height="600" id="productImage" />
        //inputDivision.src = event.value.imageUrl;

    };

    const Products = [];
    const FilterType = [{ label: "PRODUCT", value: "PRODUCT" }, { label: "PARTY NAME", value: "PARTY NAME" }]

    const [post, setPost] = React.useState(null);
    const [post1, setPost1] = React.useState(null);
    const [post2, setPost2] = React.useState(null);


    fetch('https://cascaappservice.azurewebsites.net/product_details_read_v3/?user_id=11', { mode: 'cors' })
        .then(response => response.text())
        .then(data => setPost(data));

    if (!post) return null;

    var postModified = post.replace(/'/g, '"');
    let jsonData = JSON.parse(JSON.stringify(postModified));
    let jsonObject = JSON.parse(jsonData);
    jsonObject.forEach(object => {
        Products.push({ label: object.brandName + ", " + object.category + ", " + object.packing + ", MRP: " + object.mrp + " (" + object.id + ")", value: object });
    })

    var Values = [];
    Values.push({ label: "aggarwal", value: "aggarwal" });
    const Parties = [];

    fetch('https://cascaappservice.azurewebsites.net/all_users_read/', { mode: 'cors' })
        .then(response => response.text())
        .then(data => setPost1(data));

    if (!post1) return null;

    postModified = post1.replace(/'/g, '"');
    jsonData = JSON.parse(JSON.stringify(postModified));
    jsonObject = JSON.parse(jsonData);
    jsonObject.forEach(object => {
        Parties.push({ label: object.companyName + ", " + object.city + " (" + object.username + ")" + " (UserId: " + object.id + ")", value: object });
    })

    const DeliveryVendors = [];

    fetch('https://cascaappservice.azurewebsites.net/logistics_read/', { mode: 'cors' })
        .then(response => response.text())
        .then(data => setPost2(data));

    if (!post2) return null;

    postModified = post2.replace(/'/g, '"');
    jsonData = JSON.parse(JSON.stringify(postModified));
    jsonObject = JSON.parse(jsonData);
    jsonObject.forEach(object => {
        DeliveryVendors.push({ label: object.deliveryVendor, value: object.deliveryVendor });
    })

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">
            <h1 style={{ color: '#047BD5' }}>PLACE ORDER</h1>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>FILTER KEY</h4>
                </div>

                <div class="flex-child green">
                    <div className="row">
                        <div className="col-md-6">
                            <Select onChange={event => {
                                state.deliveryMode = event.value;
                                Values = [];
                                Values.push({ label: "sarthak", value: "sarthak" });
                              

                                var itens = ["Apple", "Orange", "Banana"];
                                var selectElem = document.getElementById("valueselect");

                                for (var i = 0; i < itens.length; i++) {

                                    var item = itens[i];
                                    var element = document.createElement("option");
                                    element.innerText = item;
                                    selectElem.append(element);
                                }



                                if (event.value == "PRODUCT") {

                                    Values.push({ label: "sarthak", value: "sarthak" });
                                } else {
                                    Parties.forEach(object => {
                                        Values.push({ label: object.companyName + ", " + object.city + " (" + object.username + ")" + " (UserId: " + object.id + ")", value: object });
                                    })
                                }
                            }} options={FilterType} id="filterType" name="filterType">
                            </Select>
                        </div>
                    </div>
                </div>

            </div>


            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>VALUE</h4>
                </div>

                <div class="flex-child green">
                    <div className="row">
                        <div className="col-md-6">
                            <Select onChange={event => {
                                state.userId = event.value.id;
                                state.companyName = event.value.companyName;
                                state.city = event.value.city;
                            }} id="valueselect" name="valueselect">
                            </Select>
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>DELIVERY VENDOR</h4>
                </div>

                <div class="flex-child green">
                    <div className="row">
                        <div className="col-md-6">
                            <Select onChange={event => { state.deliveryVendor = event.value; }} options={DeliveryVendors} id="deliveryvendor" name="deliveryvendor">
                            </Select>
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>PREPARED BY</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.preparedBy = event.target.value; }} type="text" id="preparedBy" name="preparedBy"></input>
                </div>

            </div>

            <div class="flex-container">

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>PRODUCT INFORMATION</h4>
                </div>

                <div class="flex-child green">
                    <div className="row">
                        <div className="col-md-6">
                            <Select onChange={handleChange.bind(this)} options={Products} id="partyname" name="partyname">
                            </Select>
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>MRP</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.mrp = event.target.value; }} type="text" id="mrp" name="mrp"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>RATE</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.rate = event.target.value; }} type="text" id="rate" name="rate"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>QUANTITY</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.quantity = event.target.value; }} type="text" id="quantity" name="quantity"></input>
                </div>

            </div>

            <button class="button" onClick={handleAction}>ADD</button>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>ORDER</h4>
                </div>

                <div class="flex-child green">
                    <table class="border_class" id="myTable">
                        <tr>
                            <td class="border_class">Product Id</td>
                            <td class="border_class">Brand Name</td>
                            <td class="border_class">Packing</td>
                            <td class="border_class">MRP</td>
                            <td class="border_class">Rate</td>
                            <td class="border_class">Quantity</td>
                            <td class="border_class">Action</td>
                        </tr>
                    </table>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>REMARKS</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.remarks = event.target.value; }} type="text" id="remarks" name="remarks"></input>
                </div>

            </div>

            <button class="button" onClick={handleSubmit}>SUBMIT ORDER</button>

        </div>
    );
}