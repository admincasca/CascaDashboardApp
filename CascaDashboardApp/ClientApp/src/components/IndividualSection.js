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
import { useHistory } from "react-router-dom";

export function IndividualSection() {


    const states = {
        isOpen: false,
        imageUrl: null
    };

    const handleShowDialog = () => {
        alert("Hello")
        states.isOpen = true

        var doc = document.getElementById("rootId");
        //var vvv = document.createElement('h4');
        //vvv.textContent = "sarthak"
        var vvv = document.createElement("dialog");
        vvv.id = "dialogId"
        vvv.open = true;
        vvv.onclick = handleShowDialogClose;
        vvv.className = "dialog"

        var im = document.createElement("img");
        im.src = "https://cascauserimagescdn.azureedge.net/products/Abex-400Tab.jpeg";
        im.width = 300;

        vvv.appendChild(im);

        doc.append(vvv);
        

    }
    
    const handleShowDialogClose = () => {
        var doc = document.getElementById("rootId");
        var vvv = document.getElementById("dialogId");
        doc.removeChild(vvv);
    }

    const [post4, setPost4] = React.useState(null);
    const history = useHistory();
    const { state } = history.location;

    fetch('https://cascaappservice.azurewebsites.net/product_details_read_v3/?user_id=11', { mode: 'cors' })
        .then(response => response.text())
        .then(
            data => {
                alert(state.section);
                setPost4(data) })
        .catch();

    if (!post4) return null;

    const Products = [];

    var postModified = post4.replace(/'/g, '"');
    let jsonData = JSON.parse(JSON.stringify(postModified));
    let jsonObject = JSON.parse(jsonData);
    jsonObject.forEach(object => {

        if (object.category == state.section) {
            Products.push({ label: object, value: object });
        }

        //Products.push({ label: object.brandName + ", " + object.category + ", " + object.packing + ", MRP: " + object.mrp + " (" + object.id + ")", value: object });
    })
    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">
            <h1 style={{ color: '#047BD5' }}>SECTIONS</h1>

            <table id="myTable">

                <thead>
                    <tr>
                        <td class="border_class">Product Image</td>
                        <td class="border_class">Product Details</td>
                        <td class="border_class">Add Quantity</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        Products.map((item) => (
                            <tr key={item.value.id}>
                                <td class="border_class"><img onClick={handleShowDialog} style={{ width: "20vw", height: "30vh" }} src={item.value.imageUrl} alt="Coming Soon" /></td>
                                <td class="border_class"><b>{item.value.brandName}</b><br></br><br></br>Composition: {item.value.composition}<br></br>Packing: {item.value.packing}<br></br>MRP: {item.value.mrp}, GST: {item.value.gst}%</td>
                                <td class="border_class"><b>Quantity (in boxes/pcs)</b> <div><input type="number" /></div> <button class="button1">ADD TO CART</button></td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>

            <div id = "rootId"/>

        </div>
    );
}
/*
 * {this.state.isOpen && (
                <dialog
                    className="dialog"
                    style={{ position: "absolute" }}
                    open
                    onClick={this.handleShowDialog}
                >
                    <img
                        className="image"
                        src={state.imageUrl}
                        onClick={this.handleShowDialog}
                        alt="no image"
                    />
                </dialog>
            )}
            */
