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
const userDetails = JSON.parse(localStorage.getItem('user'));
    async function fetchData() {
        let type = 'GOLD';
        if(state.silver){
            type = 'SILVER';
        } 
    let data = JSON.stringify({
      transaction_type: type,
      transaction_date: new Date(),
      access_token: "jJkBFwemlcaIsIyk6SgrMTSVtnOQmWPC7uDCvWbGMW0BIyeMVq",
    });
    const request = await axiosInstance3
      .post(`http://localhost:3000/api/user/check_transaction/` + userDetails.id, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        localStorage.clear();
        const user = response.data.data;
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/home';
      })
      .catch(function (error) {
        console.log(error);
        alert('Payment failed!');
      });
  }

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
                        <div className={"momoImage"}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbJIyw8QqHq776m0KZdPfoOhOJFjHTNZjr2UqA-WE&s" width={60} alt="momoIcon"/>
                        </div>

                        <div className="narrowContainer" data-uia="messagesContainer">
                            <div id="" className="contextRow contextRowFirst" data-uia="">Please use the Momo app on your phone to scan this QR code, then click <b>Confirm payment</b>.
                            </div>
                        </div>
                        {state.silver && (<div className="qr-code">
                            <img
                                src="https://momosv3.apimienphi.com/api/QRCode?phone=0335886430&amount=100&note=pegacine&fbclid=IwAR0g-jx1m_TIuynVPkSoD902cUl5_IpByBbLSO4wtW5AghMYDU4K_e65rDY"
                                alt="qr-code"
                                width={300}
                            />
                        </div>)}
                        {state.gold && (<div className="qr-code">
                            <img
                                src="https://momosv3.apimienphi.com/api/QRCode?phone=0335886430&amount=200&note=pegacine&fbclid=IwAR0g-jx1m_TIuynVPkSoD902cUl5_IpByBbLSO4wtW5AghMYDU4K_e65rDY"
                                alt="qr-code"
                                width={300}
                            />
                        </div>)}
                    <div className="paymentConfirmFormFooter">
                        <button className={"nextButton"} onClick={fetchData}>Confirm payment</button>
                    </div>
                    </div>
                    
                </div>
            </div>
            <Footer/>
        </div>
    );
}

