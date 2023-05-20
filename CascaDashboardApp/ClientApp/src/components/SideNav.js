import React from 'react';
import '../App.css';
/*
                <a className="box" style={{ color: 'white' }} href="home">Home</a>
                <a className="box" style={{ color: 'white' }} href="invoiceupload">Upload Invoice</a>
                <a className="box" style={{ color: 'white' }} href="attendance">Attendance</a>
                <a className="box" style={{ color: 'white' }} href="viewgstinvoices">View GST Invoices</a>
                <a className="box" style={{ color: 'white' }} href="logout">Logout</a>*/
const SideNav = (props) => {
        return (
            <div className="sidenav">
                <a className="box" style={{ color: 'white' }} href="">Home</a>
                <a className="box" style={{ color: 'white' }} href="createorder">Create Order</a>
                <a className="box" style={{ color: 'white' }} href="useradd">Add User</a>
                <a className="box" style={{ color: 'white' }} href="fetchUserDetails">Get User Details</a>
                <a className="box" style={{ color: 'white' }} href="invoiceupload">Upload Invoice</a>
                <a className="box" style={{ color: 'white' }} href="trackingdetailsupload">Upload Tracking Details</a>
                <a className="box" style={{ color: 'white' }} href="productmodification">Modify Product</a>
                <a className="box" style={{ color: 'white' }} href="productadd">Add Product</a>
                <a className="box" style={{ color: 'white' }} href="sendnotification">Send Notification</a>
                <a className="box" style={{ color: 'white' }} href="attendance">Attendance Details</a>
            </div >
         );
    };
export default SideNav;