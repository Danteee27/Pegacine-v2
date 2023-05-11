import React, {useEffect, useState,useRef} from "react";
import Card from "../../components/card/Card";
import styled from "styled-components";
import axios, {axiosInstance3} from "../../axios";
import {axiosInstance2} from "../../axios";
import requests from "../../Requests";
import Navbar from "../../components/navbar/Navbar";
import "./paymentPicker.css"
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";

export default function PaymentPicker({fetchUrl}) {

    const silver = useRef();
    const gold = useRef();
    const [reRender, setReRender] = useState(false);

    const handleChoice = ()=>{
        setReRender(prevState => !prevState)
    }


    return (<div className={"paymentPickerForm"}>
            <SimpleNavBar/>
            <div className="paymentPickerFormContainer">
                <div className={"paymentPickerFormContent"}>
                    <div className="paymentPickerHeading">
                        <div className="stepLogoContainer">
                            <span className="stepLogo paymentStepLogo"></span>
                        </div>
                        <div className="stepHeader-container" data-uia="header">
                            <div className="stepHeader" role="status"><span id="" className="stepIndicator"
                                                                            data-uia="">STEP <b>3</b> OF <b>3</b></span>
                                <h1 className="stepTitle" data-uia="stepTitle">Choose how to pay</h1></div>
                        </div>
                        <div className="narrowContainer" data-uia="messagesContainer">
                            <div id="" className="contextRow contextRowFirst" data-uia="">Your payment is encrypted and
                                you can change how you pay anytime.
                            </div>
                            <div className="contextRow" data-uia="encouragements">
                                <div className="contextRowEmphasized">Secure for peace of mind.</div>
                                <div className="contextRowEmphasized">Cancel easily online.</div>
                            </div>
                        </div>
                    </div>
                    <button className={"momoButton"}>
                        <div className={"leftDetailWallet"}>
                            <div className={"walletName"}>Digital Wallet</div>
                            <div><img src={require("../../assets/MOMOPAY.png")} alt="momoIcon"/></div>
                        </div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className="Hawkins-Icon Hawkins-Icon-Standard" data-name="ChevronRight">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M7.29297 19.2928L14.5859 12L7.29297 4.70706L8.70718 3.29285L16.7072 11.2928C16.8947 11.4804 17.0001 11.7347 17.0001 12C17.0001 12.2652 16.8947 12.5195 16.7072 12.7071L8.70718 20.7071L7.29297 19.2928Z"
                                  fill="currentColor"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

