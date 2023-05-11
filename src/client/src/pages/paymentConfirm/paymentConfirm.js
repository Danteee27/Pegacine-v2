import React, {useEffect, useState,useRef} from "react";
import Card from "../../components/card/Card";
import styled from "styled-components";
import axios, {axiosInstance3} from "../../axios";
import {axiosInstance2} from "../../axios";
import requests from "../../Requests";
import Navbar from "../../components/navbar/Navbar";
import "./paymentConfirm.css"
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";

export default function PaymentConfirm({fetchUrl}) {
const { state } = useLocation();
    console.log(state);

    return (<div className={"paymentPickerForm"}>
            <Navbar/>
            <div className="paymentPickerFormContainer">
                <div className={"paymentPickerFormContent"}>
                    <div className="paymentPickerHeading">
                        <div className="stepHeader-container" data-uia="header">
                            <div className="stepHeader" role="status"><span id="" className="stepIndicator"
                                                                            data-uia="">STEP <b>3</b> OF <b>3</b></span>
                                <h1 className="stepTitle" data-uia="stepTitle">Set up Momo</h1></div>
                        </div>
                        <div className={"momoImage"}><img src={require("../../assets/MOMOPAY.png")} alt="momoIcon"/></div>
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
                            width={300}
                            />
                        </div>)}
                       
                        <div className="narrowContainer" data-uia="messagesContainer">
                            <div id="" className="contextRow contextRowFirst" data-uia="">Enter your MoMo mobile number.
                            </div>
                            <div className="contextRow">Your number will also be used if you forget your password and for important account messages. SMS fees may apply.</div>
                        </div>
                    </div>

                    

                </div>
            </div>
            <Footer/>
        </div>
    );
}

