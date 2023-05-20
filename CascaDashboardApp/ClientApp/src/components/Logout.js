import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import background from "../background.jpg";
import { useHistory } from "react-router-dom";

export function Logout() {

    const history = useHistory();

    const onYes = () => {
        alert("Logged Out Successfully");
        localStorage.setItem('cascathirdparty', 'false');
        //localStorage.removeItem('cascathirdparty-username');
        //localStorage.removeItem('cascathirdparty-password');

        history.push('/');
    };

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
        }} className="App">

            <div class="flex-container">

                <div class="flex-child magenta">
                    <h4>Are you sure you want to Logout?</h4>
                </div>

                <div class="flex-child magenta">
                    <button class="button" onClick={onYes}>YES</button>
                </div>

            </div>

        </div>
    );
}
