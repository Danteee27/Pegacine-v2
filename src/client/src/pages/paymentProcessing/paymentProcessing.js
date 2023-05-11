import React, {useEffect, useState, useRef} from "react";
import Card from "../../components/card/Card";
import styled from "styled-components";
import axios, {axiosInstance3} from "../../axios";
import {axiosInstance2} from "../../axios";
import requests from "../../Requests";
import Navbar from "../../components/navbar/Navbar";
import "./paymentProcessing.css"
import {useLocation} from "react-router-dom";
import Footer from "../../components/footer/Footer";

export default function PaymentProcessing({fetchUrl}) {
    const {state} = useLocation();
    console.log("payment confirm: ", state);

    // useEffect(() => {
    //     const postInterVal = window.setInterval(async () => {
    //         let data;
    //         data = {
    //             access_token: "QIE4hQCWI0eHm7aqYuG7dIhLHwc78Og3qUqCLbAYXXbJ5RDU3b",
    //             limit: 0,
    //             offset: 0,
    //             phone: state ? state.phoneNumber : ""
    //         };
    //         const request = await axiosInstance3
    //             .post(`http://localhost:3000/api/user/transaction`, data, {
    //                 headers: {'Content-Type': 'application/json'},
    //             })
    //             .then(function (response) {
    //                 console.log("reponse from Payment processing: ", response)
    //
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //                 alert('login failed');
    //             });
    //     }, 5000)
    //
    //     return(clearInterval(postInterVal))
    // }, []);

    return (<div className={"paymentConfirmForm"}>
            <Navbar/>
            <div className="paymentConfirmFormContainer">
                <div className={"paymentConfirmFormContent"}>
                    <div className="paymentConfirmHeading">
                        <div className="stepHeader-container" data-uia="header">
                            <div className="stepHeader" role="status">
                                <h1 className="stepTitle" data-uia="stepTitle">Paying Momo</h1>
                            </div>
                        </div>
                        <div className={"momoImage"}><img src={require("../../assets/MOMOPAY.png")} alt="momoIcon"/>
                        </div>

                        <div className="narrowContainer" data-uia="messagesContainer">
                            <div id="" className="contextRow contextRowFirst" data-uia="">Please scan this QR by your phone in Momo application.
                            </div>
                        </div>
                        {state.silver && (<div className="qr-code">
                            <img
                                src="https://momosv3.apimienphi.com/api/QRCode?phone=0378588700&amount=100&note=pegacine&fbclid=IwAR0g-jx1m_TIuynVPkSoD902cUl5_IpByBbLSO4wtW5AghMYDU4K_e65rDY"
                                alt="qr-code"
                                width={300}
                            />
                        </div>)}
                        {state.gold && (<div className="qr-code">
                            <img
                                src="https://momosv3.apimienphi.com/api/QRCode?phone=0378588700&amount=200&note=pegacine&fbclid=IwAR0g-jx1m_TIuynVPkSoD902cUl5_IpByBbLSO4wtW5AghMYDU4K_e65rDY"
                                alt="qr-code"
                                width={"700px"}
                            />
                        </div>)}

                    </div>


                </div>
            </div>
            <Footer/>
        </div>
    );
}

