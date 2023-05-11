import React, {useEffect, useState,useRef} from "react";
import Card from "../../components/card/Card";
import styled from "styled-components";
import axios, {axiosInstance3} from "../../axios";
import {axiosInstance2} from "../../axios";
import requests from "../../Requests";
import Navbar from "../../components/navbar/Navbar";
import "./paymentConfirm.css"
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";

export default function PaymentConfirm({fetchUrl}) {


    return (<div className={"paymentPickerForm"}>
            <SimpleNavBar/>
            <div className="paymentPickerFormContainer">
                <div className={"paymentPickerFormContent"}>
                    <div className="paymentPickerHeading">
                        <div className="stepHeader-container" data-uia="header">
                            <div className="stepHeader" role="status"><span id="" className="stepIndicator"
                                                                            data-uia="">STEP <b>3</b> OF <b>3</b></span>
                                <h1 className="stepTitle" data-uia="stepTitle">Set up Momo</h1></div>
                        </div>
                        <div className={"momoImage"}><img src={require("../../assets/MOMOPAY.png")} alt="momoIcon"/></div>

                        <div className="narrowContainer" data-uia="messagesContainer">
                            <div id="" className="contextRow contextRowFirst" data-uia="">Enter your MoMo mobile number.
                            </div>
                                <div className="contextRow">Your number will also be used if you forget your password and for important account messages. SMS fees may apply.</div>
                        </div>
                    </div>

                    <form method={"post"}>
                        <div className={"inputPhoneNumber"}></div>

                    </form>
                </div>
            </div>
        </div>
    );
}

