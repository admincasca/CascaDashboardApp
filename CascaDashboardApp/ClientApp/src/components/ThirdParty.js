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

export function ThirdParty() {
    const state = {

        // Initially, no file is selected
        productId: null,
        division: null,
        brandName: null,
        composition: null,
        packing: null,
        mrp: null,
        gst: null,
        dlRequired: null,
        imageUrl: null,
        image: null,
        thumbnailImage: null,
        visualImage: null,
        visual: null
    };

    const onImageChange = event => {
        state.image = event.target.files[0];
    };

    const onThumbnailImageChange = event => {
        state.thumbnailImage = event.target.files[0];
    };

    const onVisualImageChange = event => {
        state.visualImage = event.target.files[0];
    };

    const handleChange = event => {
        // Update the state
        var inputDivision = document.getElementById("division");
        var inputBrandname = document.getElementById("productName");
        var inputcomp = document.getElementById("composition");
        var inputpack = document.getElementById("packing");
        var inputmrp = document.getElementById("mrp");
        var inputgst = document.getElementById("gst");
        var inputdl = document.getElementById("dl");
        var inputvisual = document.getElementById("visual");
        var inputimageUrl = document.getElementById("imageUrl");

        state.productId = event.value.id;
        state.division = event.value.division;
        state.brandName = event.value.brandName;
        state.composition = event.value.composition;
        state.packing = event.value.packing;
        state.mrp = event.value.mrp;
        state.gst = event.value.gst;
        state.dlRequired = event.value.dlRequired;
        state.visual = event.value.visualPageRef;
        state.imageUrl = event.value.imageUrl

        inputDivision.value = event.value.division;
        inputBrandname.value = event.value.brandName;
        inputcomp.value = event.value.composition;
        inputpack.value = event.value.packing;
        inputmrp.value = event.value.mrp;
        inputgst.value = event.value.gst;
        inputdl.value = event.value.dlRequired;
        inputvisual.value = event.value.visualPageRef;
        inputimageUrl.value = event.value.imageUrl;
    };

    const onUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object

        if (state.image != null) {
            formData.append(
                "multipartImage",
                state.image,
                state.image.name
            );
        }

        if (state.thumbnailImage != null) {
            formData.append(
                "multipartThumbnailImage",
                state.thumbnailImage,
                state.thumbnailImage.name
            );
        }

        if (state.visualImage != null) {
            formData.append(
                "multipartVisualImage",
                state.visualImage,
                state.visualImage.name
            );
        }

        formData.append("productId", state.productId);
        formData.append("division", state.division);
        formData.append("brandName", state.brandName);
        formData.append("composition", state.composition);
        formData.append("packing", state.packing);
        formData.append("mrp", state.mrp);
        formData.append("gst", state.gst);
        formData.append("dlRequired", state.dlRequired);
        formData.append("visual", state.visual);


        axios.post("https://cascamailsender.azurewebsites.net/productdetailsmodify", formData);
    };

    const Products = [];

    const [post, setPost] = React.useState(null);

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

    return (
        <div className="App">
            <h1 style={{ color: '#047BD5' }}>Customize Packing</h1>
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
                    <h4>DIVISION</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.division = event.target.value; }} type="text" id="division" name="division"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>PRODUCT NAME</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.brandName = event.target.value; }} type="text" id="productName" name="productName"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>COMPOSITION</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.composition = event.target.value; }} type="text" id="composition" name="composition"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>PACKING</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.packing = event.target.value; }} type="text" id="packing" name="packing"></input>
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
                    <h4>GST(in %)</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.gst = event.target.value; }} type="text" id="gst" name="gst"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>DL Required</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.dlRequired = event.target.value; }} type="text" id="dl" name="dl"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>VISUAL PAGE</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.visual = event.target.value; }} type="text" id="visual" name="visual"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>IMAGE URL</h4>
                </div>

                <div class="flex-child green">
                    <input type="text" id="imageUrl" name="imageUrl"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>IMAGE</h4>
                </div>

                <div class="flex-child green">
                    <input type="file" id="image" name="image" onChange={onImageChange}></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>THUMBNAIL IMAGE</h4>
                </div>

                <div class="flex-child green">
                    <input type="file" id="thumbnailImage" name="thumbnailImage" onChange={onThumbnailImageChange}></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>VISUAL IMAGE</h4>
                </div>

                <div class="flex-child green">
                    <input type="file" id="visualImage" name="visualImage" onChange={onVisualImageChange}></input>
                </div>

            </div>

            <button class="button" onClick={onUpload}>MODIFY</button>

        </div>
    );
}