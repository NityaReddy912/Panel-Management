// import React from 'react';

import React, { createElement, useEffect, useRef, useState } from 'react';
import './editPanel.css';
import { BsTrashFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import NavBar from '../../Utils/Headers';

const hostURL = 'http://localhost:8000';



function EditPanel() {

    const grades = ["Select Grade","F1","F2","E1","E2","D1","D2","C1","C2"];
    const dropdownItems=grades.map((grade=>{
                return <option value={grade !== "Select Grade" ? grade : ""}>{grade}</option>
            }));

    // let dropdownItems = [];
    // let grades = [];


    const associateID = useRef(HTMLInputElement);
    const associateName = useRef(HTMLInputElement);
    const Email = useRef(HTMLInputElement);
    const contact = useRef(HTMLInputElement);
    const grade = useRef(HTMLInputElement);
    const is_active = useRef(HTMLInputElement);
    const role = useRef(HTMLInputElement);
    const interviewType = useRef(HTMLInputElement);
    // const activate = useRef(HTMLInputElement);
    
    const {id} = useParams();

    const [tableData, setTableData] = useState([
        { role: '', interviewType: '' , isActive: false},
    ]);

    function refreshDataRole(e, index){
        let temp = tableData;
        temp.map((item, i)=>{
            if(i === index){
                item.role = e.target.value;
            }
        });
        setTableData([...temp]);
    }

    function deleteRow(e,index){
        let temp = tableData;
        temp.splice(index, 1);
        setTableData([...temp]);
    }

    function refreshDataIntType(e, i){
        let temp = tableData;
        temp = temp.map((item, index)=>{
            if(i === index){
                item.interviewType = e.target.value;
            }
            return item;
        });
        setTableData([...temp]);
    }

    function refreshDataActive(e, index){
        let temp = tableData;
        temp = temp.map((item, i)=>{
            if(i === index){
                item.isActive = e.target.checked;
            }
        })
    }

    function addNewRole(){
        setTableData([...tableData, {role:'', interviewType: ''}]);
    }

    // function validation(input_str){
    //     // if(0 <=contact.current.value.length <=10){
    //     //     console.log("Invalid Input");
    //     // }

    //     var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    //     var temp = re.test(input_str);
    //     if(temp){
    //         console.log("Valid");
    //     }
    //     else{
    //         console.log("Invalid");
    //     }

    // }
    
    useEffect((req)=>{
        console.log(tableData);
        associateID.current.value = id;
        fetch(hostURL + '/editpanel/'+id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((data)=>{
            console.log("getting data from server");
            console.log(data)
            associateName.current.value = data.name;
            Email.current.value = data.email;
            contact.current.value = data.contact;
            grade.current.value = data.grade;
            is_active.current.checked = data.is_active;
            role.current.value = data.candidateRole;
            interviewType.current.value = data.type;
        });

                     
    }, []);

    function editpanel(){
        let bodyObject = {
            user_id: id,
            // name: associateName.current.value,
            // email : Email.current.value,
            grade : grade.current.value,
            contact : contact.current.value,
            is_active: is_active.current.checked,
            candidate_role: role.current.value,
            type: interviewType.current.value 
        };
        fetch(hostURL + '/editpanel', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({ bodyObject })
        }).then(res => res.json())
        .then((data)=>{
            console.log(data)
        });
    }

    
    return (
        <div className="p-2">
            <NavBar />
        <div className="container-wrap px-3">
            <div className='row' >
                <div className='col-md-12 '>
                    <h2>Edit Panel</h2>
                </div>
            </div>
            <div className='container-wrap'>
                <form>
                    <div className="row mb-3">
                        <div className="col-md-1">
                            <div className="form-group">
                                <label className="fw-bolder  " for="" >
                                    Associate ID
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter Associate ID"
                                    readOnly={true}
                                    disabled = {true}
                                    ref = {associateID}
                                />
                            </div>
                        </div>

                        <div className="col-sm-1"></div>

                        <div className="col-md-1">
                            <div className="form-group">
                                <label className="fw-bolder " for="username">
                                    Name
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group ">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Associate Name"
                                    readOnly={true}
                                    disabled = {true}
                                    ref = {associateName}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-1">
                            <div className="form-group">
                                <label className="fw-bolder  " for="userid">
                                    Email
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    readOnly={true}
                                    disabled = {true}
                                    ref = {Email}
                                />
                            </div>
                        </div>

                        <div className="col-sm-1"></div>

                        <div className="col-md-1">
                            <div className="form-group">
                                <label className="fw-bolder " for="username">
                                    Contact
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group ">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Contact"
                                    // readOnly={true}
                                    // disabled = {true}
                                    // onChange={validation}
                                    ref = {contact}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-1">
                            <div className="form-group">
                                <label className="fw-bolder  " for="userid">
                                    Grade
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <select id="grade" className="form-select" aria-label="Select Grade" ref={grade}>
                                    {dropdownItems}
                                    
                                </select>
                            </div>
                        </div>

                        <div className="col-sm-1"></div>

                        <div className="col-md-1">
                            <div className="form-group">
                                <label className="fw-bolder " for="username">
                                    Activate
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group ">
                                <div className="form-check form-switch form-switch-md">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        // readOnly={true} 
                                        // disabled = {true} 
                                        ref={is_active} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </form>
            </div>
            <div style={{ marginTop: "40px" }}>
                <h4>List of roles panel can interview : </h4>
                <form>
                    <table className="table table-light table-striped">
                        <thead>
                            <tr>
                                <th className='p-2'>#</th>
                                <th className='p-2'>Roles</th>
                                <th className='p-2'>Interview Type</th>
                                {/* <th className='p-2'>IsActive</th> */}
                                <th className='p-2'></th>
                                <th className='p-2'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>
                                                <div >
                                                    <select defaultValue={item.role} onChange={(e)=>{refreshDataRole(e, index)}} className="form-select" ref={ role }>
                                                        <option value="">Select Role</option>
                                                        <option value="AES-DigitalFS-JavaMS">AES-DigitalFS-JavaMS</option>
                                                        <option value="AES-DigitalFS-JavaFS">AES-DigitalFS-JavaFS</option>
                                                        <option value="AES-DigitalFS-DotnetFS">AES-DigitalFS-DotnetFS</option>
                                                        <option value="AES-FED-Angular">AES-FED-Angular</option>
                                                        <option value="AES-FED-React">AES-FED-React</option>
                                                        <option value="AES-FED-MEAN">AES-FED-MEAN</option>
                                                        <option value="AES-FED-MERN">AES-FED-MERN</option>
                                                        <option value="AES-AgileDevOps-Agile">AES-AgileDevOps-Agile</option>
                                                        <option value="AES-AgileDevOps-DevOps">AES-AgileDevOps-DevOps</option>
                                                        <option value="AES-DigitalPlatforms-AEM">AES-DigitalPlatforms-AEM</option>
                                                        <option value="AES-DigitalPlatforms-Liferay">AES-DigitalPlatforms-Liferay</option>
                                                        <option value="AES-DigitalPlatforms-Sitecore">AES-DigitalPlatforms-Sitecore</option>
                                                        <option value="AES-DigitalPlatforms-M365">AES-DigitalPlatforms-M365</option>
                                                        <option value="AES-DigitalPlatforms-Drupal">AES-DigitalPlatforms-Drupal</option>
                                                        <option value="AES-Lowcode-Outsystems">AES-Lowcode-Outsystems</option>
                                                        <option value="AES-Lowcode-MSApps">AES-Lowcode-MSApps</option>
                                                        <option value="AES-Mobility-IOS">AES-Mobility-IOS</option>
                                                        <option value="AES-Mobility-Android">AES-Mobility-Android</option>
                                                        <option value="AES-Mobility-ReactNative">AES-Mobility-ReactNative</option>
                                                        <option value="AES-ApplicationModernization-Mainframe">AES-ApplicationModernization-Mainframe</option>
                                                        <option value="AES-DigitalFS-Integration">AES-DigitalFS-Integration</option>
                                                        <option value="AES-CloudApps-Azure">AES-CloudApps-Azure</option>
                                                        <option value="AES-CloudApps-AWS">AES-CloudApps-AWS</option>
                                                        <option value="AES-CloudApps-GCP">AES-CloudApps-GCP</option>
                                                        <option value="AES-Mobility-Others">AES-Mobility-Others</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <select className="form-select" ref={ interviewType }>
                                                        <option value="">Select Interview type</option>
                                                        <option value="L1">L1</option>
                                                        <option value="L2">L2</option>
                                                        {/* <option value="L1L2">L1 & L2</option> */}
                                                        <option value="HR">HR</option>
                                                    </select>
                                                </div>
                                            </td>
                                            {/* <td>
                                                <div className="form-check form-switch">
                                                    <input onChange={(e)=>{refreshDataActive(e, index)}} className="form-check-input mt-2" type="checkbox" data-testid="checkbox" role="switch" id="isActive" />
                                                </div>
                                            </td>
                                            <td>
                                                {index+1 != tableData.length ? <></> : <button type="button" className="btn btn-primary col-10" onClick={addNewRole}>Add New Role</button>}
                                            </td>
                                            <td>
                                                <BsTrashFill onClick={(e)=>{deleteRow(e,index)}} className="text-primary mt-2" style={{ scale: "1.5" }}>delete</BsTrashFill>
                                            </td> */}
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <button style={{ marginRight: "20px" }} className='btn btn-primary' onClick={editpanel}>Update</button>
                    <button className='btn btn-primary'>Cancel</button>
                </form>
            </div>
            

            
        </div>
        </div>

    );
}

export default EditPanel;