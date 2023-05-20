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
import tablet from "../tablet.png";
import capsule from "../capsule.png";
import softGel from "../softgelcapsules.png";
import injection from "../injection.png";
import syrup from "../syrupicon.png";
import drySyrup from "../drysyrup.png";
import ointment from "../ointmenticon.png";
import powder from "../powder.png";
import cream from "../creamicon.png";
import soap from "../soapicon.png";
import oil from "../hairoilicon.png";
import dustingPowder from "../dustingpowder.png";
import shampoo from "../shampooicon.png";
import lotion from "../lotionicon.png";
import toothpaste from "../toothpasteicon.png";
import wash from "../wash.png";
import antiseptic from "../antiseptic.png";
import { useHistory } from "react-router-dom";

export function Sections() {

    const history = useHistory();

    const onClick1 = () => {
        history.push({
            pathname: '/section',
            state: { section: 'TABLET' }
        });
    }

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">
            <h1 style={{ color: '#047BD5' }}>SECTIONS</h1>

            <table id="myTable">

                <tr>
                    <td ><input type="image" onClick={onClick1} src={tablet} name="tablet" alt="tablet" width="50%" height="50%" /></td>
                    <td ><input type="image" src={capsule} name="capsule" alt="submit" width="50%" height="50%" /></td>
                    <td ><input type="image" src={softGel} name="softGel" alt="submit" width="50%" height="50%" /></td>
                    <td ><input type="image" src={injection} name="injection" alt="submit" width="50%" height="50%" /></td>
                </tr>

                <tr>
                    <td ><h5>Tablet</h5></td>
                    <td ><h5>Capsule</h5></td>
                    <td ><h5>Soft Gel</h5></td>
                    <td ><h5>Injection</h5></td>
                </tr>

                <tr>
                    <td ><input type="image" src={syrup} name="syrup" alt="submit" width="50%" height="50%" /></td>
                    <td ><input type="image" src={drySyrup} name="drySyrup" alt="submit" width="50%" height="50%" /></td>
                    <td ><input type="image" src={ointment} name="ointment" alt="submit" width="50%" height="50%" /></td>
                    <td ><input type="image" src={powder} name="powder" alt="submit" width="50%" height="50%" /></td>
                </tr>

                <tr>
                    <td ><h5>Syrup</h5></td>
                    <td ><h5>Dry Syrup</h5></td>
                    <td ><h5>Ointment</h5></td>
                    <td ><h5>Sachet/Powder</h5></td>
                </tr>

                <tr>
                    <td ><input type="image" src={cream} name="cream" alt="submit" width="50%" height="50%" /></td>
                    <td ><input type="image" src={soap} name="soap" alt="submit" width="50%" height="50%" /></td>
                    <td ><input type="image" src={oil} name="oil" alt="submit" width="50%" height="50%" /></td>
                    <td ><input type="image" src={dustingPowder} name="dustingPowder" alt="submit" width="50%" height="50%" /></td>
                </tr>

                <tr>
                    <td ><h5>Cream</h5></td>
                    <td ><h5>Soap</h5></td>
                    <td ><h5>Oil</h5></td>
                    <td ><h5>Dusting Powder</h5></td>
                </tr>

                <tr>
                    <td ><input type="image" src={shampoo} name="shampoo" alt="submit" width="50%" height="50%" /></td>
                    <td ><input type="image" src={lotion} name="lotion" alt="submit" width="50%" height="50%" /></td>
                    <td ><input type="image" src={toothpaste} name="toothpaste" alt="submit" width="50%" height="50%" /></td>
                    <td ><input type="image" src={wash} name="wash" alt="submit" width="50%" height="50%" /></td>
                </tr>

                <tr>
                    <td ><h5>Shampoo</h5></td>
                    <td ><h5>Lotion</h5></td>
                    <td ><h5>Toothpaste</h5></td>
                    <td ><h5>Wash</h5></td>
                </tr>

                <tr>
                    <td ><input type="image" src={antiseptic} name="antiseptic" alt="submit" width="50%" height="50%" /></td>
                </tr>

                <tr>
                    <td ><h5>Antiseptic</h5></td>
                </tr>

            </table>

            

        </div>
    );
}

