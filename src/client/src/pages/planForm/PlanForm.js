import React, {useEffect, useState,useRef} from "react";
import Card from "../../components/card/Card";
import styled from "styled-components";
import axios, {axiosInstance3} from "../../axios";
import {axiosInstance2} from "../../axios";
import requests from "../../Requests";
import Navbar from "../../components/navbar/Navbar";
import "./planForm.css"
import Footer from "../../components/footer/Footer";
import { Link, Route, Routes } from 'react-router-dom';
import PaymentPicker from "../paymentPicker/paymentPicker";

export default function PlanForm({fetchUrl}) {

    const silver = useRef();
    const gold = useRef();
    const [reRender, setReRender] = useState(false);
    let stateObj = {
        silver: silver.current?.checked,
        gold: gold.current?.checked,
    }
    const handleChoice = ()=>{
        setReRender(prevState => !prevState)
    }

    const isChecked  = () => {
        if(silver.current?.checked){
            return true;
        }
        if(gold.current?.checked){
            return true;
        }
        return false;
    }


    return (<div className={"planForm"}>
            <Navbar/>
            <div className="planFormContainer">
                <div className={"planFormContent"}>
                    <h2 className="alert-access">To access all films in this website, you must first upgrade to a paid membership.</h2>
                    <div className="stepHeader" role="status">
                        
                        <span id="" className="stepIndicator" data-uia="">
                            STEP <b>1</b> OF <b>3</b>
                        </span>
                        <h1 className="stepTitle" data-uia="stepTitle">
                            Choose the plan that’s right for you
                        </h1>
                        <div className="changeAnytime">
                            <ul className="checkmark-group -compact" data-uia="checkmark-group">
                                <li className="checkmark-group--row -compact" data-uia="checkmark-group+row-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" className="checkmark-group--icon"
                                         data-name="Checkmark" aria-hidden="true">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.68239 19.7312L23.6824 5.73115L22.3178 4.26904L8.02404 17.6098L2.70718 12.293L1.29297 13.7072L7.29297 19.7072C7.67401 20.0882 8.28845 20.0988 8.68239 19.7312Z"
                                              fill="currentColor"></path>
                                    </svg>
                                    <span className="checkmark-group--text" data-uia="checkmark-group+row-0+content">Watch all you want. Ad-free.</span>
                                </li>
                                <li className="checkmark-group--row -compact" data-uia="checkmark-group+row-1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" className="checkmark-group--icon"
                                         data-name="Checkmark" aria-hidden="true">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.68239 19.7312L23.6824 5.73115L22.3178 4.26904L8.02404 17.6098L2.70718 12.293L1.29297 13.7072L7.29297 19.7072C7.67401 20.0882 8.28845 20.0988 8.68239 19.7312Z"
                                              fill="currentColor"></path>
                                    </svg>
                                    <span className="checkmark-group--text" data-uia="checkmark-group+row-1+content">Recommendations just for you.</span>
                                </li>
                                <li className="checkmark-group--row -compact" data-uia="checkmark-group+row-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" className="checkmark-group--icon"
                                         data-name="Checkmark" aria-hidden="true">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.68239 19.7312L23.6824 5.73115L22.3178 4.26904L8.02404 17.6098L2.70718 12.293L1.29297 13.7072L7.29297 19.7072C7.67401 20.0882 8.28845 20.0988 8.68239 19.7312Z"
                                              fill="currentColor"></path>
                                    </svg>
                                    <span className="checkmark-group--text" data-uia="checkmark-group+row-2+content">Change or cancel your plan anytime.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"planChoice"}>
                        <div className={"planChoiceHeader"}>
                            <input className={"input"} ref={silver} type="radio" id="silver" name="planChoice" value="silver" onChange={handleChoice}/>
                            <label htmlFor={"silver"} className={"planItem"}>
                                <span>Silver</span>
                            </label>
                            <input className={"input"} ref={gold} type="radio" id="gold" name="planChoice" value="gold" onChange={handleChoice}/>
                            <label htmlFor={"gold"} className={"planItem"}>
                                <span>Gold</span>
                            </label>
                        </div>
                        <table className={"planDetail"} cellPadding={20}>
                            <tbody>
                            <tr>
                                <td>Monthly Price</td>
                                <td className={`silverCol ${silver.current?.checked && "checkedStyle"}`}>100 ₫</td>
                                <td className={`goldCol ${gold.current?.checked && "checkedStyle"}`}>200 ₫</td>
                            </tr>
                            <tr>
                                <td>Vip Video</td>
                                <td className={`silverCol ${silver.current?.checked && "checkedStyle"}`}>Only Trailer</td>
                                <td className={`goldCol ${gold.current?.checked && "checkedStyle"}`}>Full Video</td>
                            </tr>
                            </tbody>
                        </table>
                        {
                            isChecked() && (
                        <div className={"nextButtonContainer"}>
                            <Link
                                to={'/payment-picker'}  
                                state={stateObj}
                            >
                                <button className={"nextButton-1"}>Next</button>
                            </Link>
                            <Routes>
                                <Route path="/payment-picker" element={<PaymentPicker />} />
                            </Routes>
                            
                        </div>)
                        }

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

