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
import { Redirect } from 'react-router';


export function FetchTrackingDetails() {

    const [post, setPost] = React.useState("id");
    const [post1, setPost1] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true);

    if (localStorage.getItem('cascathirdparty') != null && localStorage.getItem('cascathirdparty') == 'true') {
        var username = localStorage.getItem('cascathirdparty-username');
        var password = localStorage.getItem('cascathirdparty-password');

        const formData = new FormData();
        const formData1 = new FormData();

        formData.append("username", username);
        formData.append("password", password);

        axios.post("https://cascamailsender.azurewebsites.net/userLoginRead/", formData, { mode: 'cors' })
            .then((response) => {
                setPost(response.data);
                setLoading(false);
            });

        if (isLoading) {
            return (<div style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "cover"
            }} className="App">
                <h2>Loading...</h2>
            </div>);
        }

        if (post != null && post != "") {

            formData1.append("id", localStorage.getItem('cascathirdparty-id'));
            //formData1.append("id", 20);

            axios.post('https://cascamailsender.azurewebsites.net/invoiceDownload/', formData1, { mode: 'cors' })
                .then(response => setPost1(response.data));

            if (!post1) return null;

            return (
                <div style={{
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover"
                }} className="App">
                    <h1 style={{ color: '#047BD5' }}>GST INVOICES</h1>

                    <table style={{
                        marginLeft: "auto",
                        marginRight: "auto"
                    }} class="border_class" id="myTable">

                        <thead>
                            <tr>
                                <td class="border_class">S. No.</td>
                                <td class="border_class">Booking Date</td>
                                <td class="border_class">Delivery Vendor</td>
                                <td class="border_class">Tracking No.</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                post1.map((item) => (
                                    <tr key={item.invoiceNo}>
                                        <td class="border_class">{item.sNo}</td>
                                        <td class="border_class">{item.bookingDate}</td>
                                        <td class="border_class">{item.deliveryVendor}</td>
                                        <td class="border_class"><a href={item.downloadUrl}>{item.trackingNo}</a></td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>

                </div>
            );
        } else {
            return (
                <div>
                    <Router>
                        <Switch>


                            <Redirect to="/" />
                        </Switch>
                    </Router>
                </div>
            );
        }
    } else {
        return (
            <div>
                <Router>
                    <Switch>


                        <Redirect to="/" />
                    </Switch>
                </Router>
            </div>
        );
    }
}
