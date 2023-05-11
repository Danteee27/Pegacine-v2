import React, {useEffect, useState, useRef} from "react";
import Card from "../../components/card/Card";
import styled from "styled-components";
import axios, {axiosInstance3} from "../../axios";
import {axiosInstance2} from "../../axios";
import requests from "../../Requests";
import Navbar from "../../components/navbar/Navbar";
import "./paymentConfirm.css"
import {Link, Route, Routes, useLocation} from "react-router-dom";
import Footer from "../../components/footer/Footer";
import PaymentPicker from "../paymentPicker/paymentPicker";
import PaymentProcessing from "../paymentProcessing/paymentProcessing";

export default function PaymentConfirm({fetchUrl}) {
    const {state} = useLocation();
    const phoneInput = useRef();
    const [isValidPhone, setIsValidPhone] = useState(false);
    console.log("payment confirm: ", state);
const userDetails = JSON.parse(localStorage.getItem('user'));
    const handlePhoneNumber = (e) => {
        state.phoneNumber = e.target.value;
        if(state.phoneNumber !== ""){
            setIsValidPhone(true)
        }
        else
            setIsValidPhone(false)
        console.log(state)
    };

    return (<div className={"paymentConfirmForm-1"}>
            <Navbar/>
            <div className="paymentConfirmFormContainer-1">
                <div className={"paymentConfirmFormContent-1"}>
                    <div className="paymentConfirmHeading-1">
                        <div className="stepHeader-container" data-uia="header">
                            <div className="stepHeader" role="status"><span id="" className="stepIndicator"
                                                                            data-uia="">STEP <b>3</b> OF <b>3</b></span>
                                <h1 className="stepTitle" data-uia="stepTitle">Check your bill</h1></div>
                        </div>
                        <div className={"momoImage"}><img src={require("../../assets/MOMOPAY.png")} alt="momoIcon"/>
                        </div>
                        {/*{state.silver && (<div className="qr-code">*/}
                        {/*     <img */}
                        {/*     src="https://momosv3.apimienphi.com/api/QRCode?phone=0378588700&amount=100&note=pegacine&fbclid=IwAR0g-jx1m_TIuynVPkSoD902cUl5_IpByBbLSO4wtW5AghMYDU4K_e65rDY"*/}
                        {/*     alt="qr-code"*/}
                        {/*     width={300}*/}
                        {/*     />*/}
                        {/* </div>)}*/}
                        {/* {state.gold && (<div className="qr-code">*/}
                        {/*     <img */}
                        {/*     src="https://momosv3.apimienphi.com/api/QRCode?phone=0378588700&amount=200&note=pegacine&fbclid=IwAR0g-jx1m_TIuynVPkSoD902cUl5_IpByBbLSO4wtW5AghMYDU4K_e65rDY"*/}
                        {/*     alt="qr-code"*/}
                        {/*     width={300}*/}
                        {/*     />*/}
                        {/* </div>)}*/}

                        <div className="narrowContainer" data-uia="messagesContainer">
                            <div id="" className="contextRow contextRowFirst" data-uia="">You must pay close attention to the details on the bill.
                            </div>
                            <div className="contextRow">Grab your phone and use the MoMo app to get ready to pay by scanning the QR code.
                            </div>
                            <div className="contextRow">*Notice: the phone number registered with Momo <br></br> must be the same as the phone number registered with PegaCine. 
                            </div>
                        </div>

                        {/* <div className={"phoneInputContainer"}>
                            <div className={"phoneArea"}>
                                <img className={"vnFlag"} src={require("../../assets/vietnam.png")}
                                     alt="viet nam flag"/>
                                <span>+84</span>
                            </div>
                            <input ref={phoneInput} className={"inputPhone"} type="tel" placeholder={"Mobile Number"}
                                   onChange={handlePhoneNumber}/>
                        </div> */}

                        <div className={"planContainer"}>
                            {
                                state.silver && <div className={"planContent"}>
                                    <div className={"monthlyPrice"}>100 ₫/Month</div>
                                    <div className={"planName"}>Silver</div>
                                </div>
                            }
                            {
                                state.gold && <div className={"planContent"}>
                                    <div className={"monthlyPrice"}>200 ₫/Month</div>
                                    <div className={"planName"}>Gold</div>
                                </div>
                            }
                            <div className={"planContent"}>
                                    <div className={"monthlyPrice"}>{userDetails.phoneNumber}</div>
                                    <div className={"planName"}>Payment by phone number</div>
                                </div>

                        </div>

                            <Link
                                to={'/payment-processing'}
                                state={state}
                            >
                                <button className={"startMemberShipButton"}>Start
                                    Membership
                                </button>
                            </Link>
                        <Routes>
                            <Route path="/payment-processing" element={<PaymentProcessing/>}/>
                        </Routes>

                        <span className={"noteToMomo"}>You’ll be sent to MoMo to complete payment.</span>
                    </div>


                </div>
            </div>
            <Footer/>
        </div>
    );
}

