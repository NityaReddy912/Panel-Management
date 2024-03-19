import React, { useState, useRef , useEffect} from "react";
import { toast } from "react-toastify";
// import "./updatepanel.css"
import NavBar from '../../Utils/Headers';   
import { useParams } from "react-router-dom";
const hostURL = 'http://127.0.0.1:8000';

function UpdatePanel() {


    const associatename = useRef(HTMLInputElement);
    const associateid = useRef(HTMLInputElement);
    const associategrade = useRef(HTMLInputElement);
    const date = useRef(HTMLInputElement);
    const fromTime = useRef(HTMLInputElement);
    const toTime = useRef(HTMLInputElement);
    const status = useRef(HTMLInputElement);

    const {id, name, availdate, grade} = useParams();

    useEffect(()=>{
        associatename.current.value = name;
        associateid.current.value = id;
        associategrade.current.value = grade;
        date.current.value = availdate;
        // console.dir(date.current);
    },[]);

    async function handleUpdate(e) {
        e.preventDefault();
        fetch(hostURL + "/updatePanel", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                user_id: associateid.current.value,
                name: associatename.current.value,
                grade: associategrade.current.value,
                date: date.current.value,
                fromtime: fromTime.current.value,
                totime: toTime.current.value,
                status: status.current.value
            })
        }).then(res => res.json())
            .then((result) => {
                console.log(result);
                toast.success(result.msg,{autoclose: 1000});

            }).catch(err => {
                console.log(err);
                toast.error(err, {autoclose: 1000});
            });
    }

    return (
        <div className="p-2">  
            <NavBar/>
        <div className="container-wrap px-3 mt-3">
            <>
                <div className='container-wrap px-3'>
                    <h2 className="col-0 mb-5"> Update Panel Availability - Single</h2>

                    <form>
                        <div className="row mb-3">
                            <div className="col-md-1">
                                <div className="form-group">
                                    <label className="fw-bolder  " for="username">
                                        Name
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Associate Name"
                                        id="Associate Name"
                                        ref={associatename}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-1">
                                <div className="form-group">
                                    <label className="fw-bolder " for="userid">
                                        Associate Id
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Associate Id"
                                        id="Associate Id"
                                        ref={associateid}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-md-1 ">
                                <div className="form-group">
                                    <label className="fw-bolder" for="associategrade">
                                        Grade
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group ">
                                    <input className="form-control" disabled placeholder="Associate Grade" ref={associategrade} />
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-1">
                                <div className="form-group" >
                                    <label className="fw-bolder  " for="date">
                                        Date
                                    </label>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    {/* <input className="form-control" disabled type="date" min={new Date().toISOString().split('T')[0]} placeholder=" Select Date" required ref={date} /> */}
                                    <input type="text" className="form-control" ref={date} disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-1">
                                <div className="form-group">
                                    <label className="fw-bolder  " for="fromtime">
                                        From Time
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <input className="form-control" type="time" placeholder="Enter From Time" required id="appt" name="appt" ref={fromTime}></input>
                                </div>
                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-md-1">
                                <div className="form-group">
                                    <label className="fw-bolder " for="totime">
                                        To Time
                                    </label>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group ">
                                    <input className="form-control" min={fromTime} type="time" placeholder="Enter To Time" required id="appt" name="appt" ref={toTime}></input>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-5">


                            <div className="col-md-1">
                                <div className="form-group">
                                    <label className="fw-bolder " for="totime">
                                        Status
                                    </label>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group ">
                                    <select className="form-control form-select" label="status" for="Status" placeholder="select Status" ref={status}>
                                        <option value="" >Select Status</option>
                                        <option value="Available" >Available</option>
                                        <option value="Booked" >Booked</option>
                                        <option value="Conducted" >Conducted</option>
                                        <option value="PanelNoShow" >PanelNoShow</option>
                                        <option value="CandidateNoShow" >CandidateNoShow</option>
                                        <option value="PanelWithdrawn" >PanelWithdrawn</option>
                                        {/* {dropdownItems} */}
                                        {/* Handler={getStatus} */}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div>
                                <button type="button" className="btn btn-primary  me-3 ms-4" data-testid="submit"  style={{ marginRight: "10px" }} onClick={(e) => handleUpdate(e)} >
                                    Update
                                </button>
                                <button type="button" className="btn btn-primary  me-3 ms-4" data-testid="cancel" >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        </div>
        </div>

    );
}
export default UpdatePanel;

