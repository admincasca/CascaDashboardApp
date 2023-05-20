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

export function AddProduct() {
    const state = {

        // Initially, no file is selected
        division: "",
        brandName: "",
        composition: "",
        category: "",
        packing: "",
        mrp: "",
        gst: 12,
        dlRequired: "",
        image: null,
        thumbnailImage: null,
        visual: ""
    };

    const onImageChange = event => {
        state.image = event.target.files[0];
    };

    const onThumbnailImageChange = event => {
        state.thumbnailImage = event.target.files[0];
    };

    const handleChange = event => {
        state.division = event.value;
    };

    const handleChangeCategory = event => {
        state.category = event.value;
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

        formData.append("division", state.division);
        formData.append("brandName", state.brandName);
        formData.append("composition", state.composition);
        formData.append("category", state.category);
        formData.append("packing", state.packing);
        formData.append("mrp", state.mrp);
        formData.append("gst", state.gst);
        formData.append("dlRequired", state.dlRequired);
        formData.append("visual", state.visual);


        axios.post("https://cascamailsender.azurewebsites.net/productdetailsadd", formData);
    };

    //const Divisions = [];
    const Divisions = new Set();
    const Category = new Set();

    const [post, setPost] = React.useState(null);

    fetch('https://cascaappservice.azurewebsites.net/product_details_read_v3/?user_id=11', { mode: 'cors' })
        .then(response => response.text())
        .then(data => setPost(data));

    if (!post) return null;

    var postModified = post.replace(/'/g, '"');
    let jsonData = JSON.parse(JSON.stringify(postModified));
    let jsonObject = JSON.parse(jsonData);
    jsonObject.forEach(object => {
        Divisions.add(object.division);
        Category.add(object.category);
    });

    const DivisionSelect = [];
    Divisions.forEach(object => {
        DivisionSelect.push({ label: object, value: object });
    });

    const CategorySelect = [];
    Category.forEach(object => {
        CategorySelect.push({ label: object, value: object });
    });

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">
            <h1 style={{ color: '#047BD5' }}>ADD PRODUCT</h1>
           
            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Division</h4>
                </div>

                <div class="flex-child green">
                    <div className="row">
                        <div className="col-md-6">
                            <Select onChange={handleChange.bind(this)} options={DivisionSelect} id="division" name="division">
                            </Select>
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Product Name</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.brandName = event.target.value; }} type="text" id="productName" name="productName"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Composition</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.composition = event.target.value; }} type="text" id="composition" name="composition"></input>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Category</h4>
                </div>

                <div class="flex-child green">
                    <div className="row">
                        <div className="col-md-6">
                            <Select onChange={handleChangeCategory.bind(this)} options={CategorySelect} id="division" name="division">
                            </Select>
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Packing</h4>
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
                    <h4>Visual Page</h4>
                </div>

                <div class="flex-child green">
                    <input onChange={event => { state.visual = event.target.value; }} type="text" id="visual" name="visual"></input>
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
                    <h4>Thumbnail Image</h4>
                </div>

                <div class="flex-child green">
                    <input type="file" id="thumbnailImage" name="thumbnailImage" onChange={onThumbnailImageChange}></input>
                </div>

            </div>

            <button class="button" onClick={onUpload}>ADD</button>

        </div>
    );
}