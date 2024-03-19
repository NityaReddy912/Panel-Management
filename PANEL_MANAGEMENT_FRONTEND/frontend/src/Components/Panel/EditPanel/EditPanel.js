// import React from 'react';

import React, { createElement, useEffect, useRef, useState } from 'react';
import './editPanel.css';
import { BsChatLeftText, BsTrashFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import NavBar from '../../Utils/Headers';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { findNonSerializableValue } from '@reduxjs/toolkit';


const hostURL = 'http://localhost:8000';

function EditPanel() {

    const associateID = useRef(HTMLInputElement);
    const associateName = useRef(HTMLInputElement);
    const Email = useRef(HTMLInputElement);
    const contact = useRef(HTMLInputElement);
    const grade = useRef(HTMLInputElement);
    const is_active = useRef(HTMLInputElement);
    const [status, setStatus] = useState(<></>);
    const [skills, setSkills] = useState([]);
    const [intType, setIntType] = useState([]);
    const [grades, setGrades] = useState([]);

    const [gradeError, setGradeError] = useState("");
    const [contactError, setContactError] = useState("");
    const navigate = useNavigate();
    
    const {id} = useParams();

    // Need to do some changes in tableData
    const [tableData, setTableData] = useState([
        // { role: '', interviewType: '' , isActive: ''},
    ]);
    const [selectedRoles, setSelectedRoles] = useState([]);


    function refreshDataRole(e, index){
        let temp = tableData;
        temp.map((item, i)=>{
            if(i === index){
                item.role = parseInt(e.target.value);
            }
        });
        console.log(temp);
        setTableData([...temp]);
    }

    
  function handleContact(){
    const contactValue = contact.current.value;
    let regex = /[0-9]/;
    if(!regex.test(contactValue)){
        setContactError("Contact should contain only digits");
        // return 
    }
    else{
        setContactError("");
    }
    
    if(!contactValue){
        setContactError("Please enter a contact number");
    }
    if(contactValue.length < 10){
        setContactError("Contact number should be 10 digits");
    }
    // if(contactValue.length === 10){
    //     setContactError("");
    //     return false;
    // }
    return true;
  }

  function handleGrade(){
    const gradeValue = grade.current.value;
    if(!gradeValue){
        setGradeError("Please select a grade");
    }
    else{
        setGradeError("");
        return false;
    }
    return true;
  }

    function deleteRow(e,index){
        console.log(e.target);
        console.log(tableData);
        console.log(index)
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
        temp.map((item, i)=>{
            if(i === index){
                item.isActive = e.target.checked;
            }
        })
        setTableData([...temp]);
        console.log(tableData);
    }

    function addNewRole(){
        setTableData([...tableData, {role:'', interviewType: '', isActive: false}]);
    }

    
    let data2 = {};
    useEffect(()=>{
        // console.log(tableData);
        associateID.current.value = id;
        fetch(hostURL + '/editpanel', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: id })
        }).then(res => res.json())
        .then(({data})=>{
            console.log(data)
            associateName.current.value = data.name;
            Email.current.value = data.email;
            contact.current.value = data.contact;
            grade.current.value = data.grade;
            is_active.current.checked = data.is_active;
            
            let prev = [];
            // console.log(data.skill[0].skill_name);
            for(let i in data.skill){
                // console.log(data.skill[i])
                    if(i < data.skill.length && prev.length < data.skill.length){
                        prev.push({ role: data.skill[i].skill_id, interviewType: data.skill[i].type_id , isActive: data.skill[i].is_active})
                    }
                }
                setTableData(prev);
                setSkills([...data.skills]);
                setIntType(data.intType);
                setGrades(data.grades);
                console.log("tableData")
                console.log(skills);
                // console.log(grades)
            // setTableData([...prev])
            console.log("TableData", tableData);
          });
    }, []);

    function editpanel(e){
        e.preventDefault();
        if(! (contact.current.value && grade.current.value) ){
            handleContact();
            handleGrade();
            return;
        }
        if(tableData.length < 1){
            toast.error("Please add a role" , {autoClose: 1000});
            return ;
        }
        
        // console.log(tableData);
        let bodyObject = {
            user_id: id,
            name: associateName.current.value,
            email : Email.current.value,
            grade : grade.current.value,
            contact : contact.current.value,
            is_active: is_active.current.checked,
            skills: tableData
            // candidate_role: role.current.value,
            // type: interviewType.current.value 
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
            // setStatus(<p className="text-success">edited successfully</p>);
            toast.success("Panel edited successfully",{autoClose: 1000});
            navigate('/panelList');
        })
        .catch(e => {
            setStatus(<p className="text-danger"><b>error</b></p>);
        });
    }

    
    return (
        <div className="p-2">
            <NavBar/>
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
                                    className={`form-control ${
                                        contactError && "add__input"
                                      }`}
                                    placeholder="Enter Contact"
                                    maxLength={10}
                                    onChange={handleContact}
                                    ref = {contact}
                                />
                                {contactError && (
                                <p className={`mb-0 mx-4 add__warning`}>
                                    <ExclamationTriangleIcon className='add__warningIcon' />
                                    {contactError}
                                </p>
                                )}
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
                                <select id="grade" onChange={handleGrade} className="form-select" aria-label="Select Grade" ref={grade}>
                                    <option value="">Select Grade</option>
                                    {grades.map((item)=>{
                                        return (<option value={item.grade}>{item.grade.toUpperCase()}</option>)
                                    })}
                                    {/* <option value="c1">C1</option>
                                    <option value="c2">C2</option>
                                    <option value="d1">D1</option>
                                    <option value="d2">D2</option>
                                    <option value="e1">E1</option>
                                    <option value="e2">E2</option>
                                    <option value="f1">F1</option>
                                    <option value="f2">F2</option> */}
                                </select>
                                {gradeError && (
                                <p className={`mb-0 mx-4 add__warning`}>
                                    <ExclamationTriangleIcon className='add__warningIcon' />
                                    {gradeError}
                                </p>
                                )}
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
                                <th className='p-2'>IsActive</th>
                                <th className='p-2'></th>
                                <th className='p-2'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData.map((item, index) => {
                                    console.log(item)
                                    // console.log(index)
                                    // console.log(tableData)
                                    return (
                                        <tr id={index}>
                                            <td>{index+1}</td>
                                            <td>
                                                <div >
                                                    <select defaultValue={item.role} onChange={(e)=>{refreshDataRole(e, index)}} className="form-select" value={item.role}>
                                                        <option value="">Select Role</option>
                                                        {skills.map((skill)=>{
                                                            // console.log(item);
                                                            return (<option value={skill.skill_id}>{skill.skill_name}</option>)
                                                        })}
                                                        {/* <option value="Java Full Stack Developer">Java Full Stack Developer</option>
                                                        <option value="Sr. Java Developer">Sr. Java Developer</option>
                                                        <option value="Lead Java Full Stack">Lead Java Full Stack</option>
                                                        <option value="Architecture Java Full Stack">Architecture Java Full Stack</option>
                                                        <option value="Mean Full Stack Developer">Mean Full Stack Developer</option>
                                                        <option value="Mern Full Stack Developer">Mern Full Stack Developer</option>
                                                        <option value=".NET Full Stack Developer">.NET Full Stack Developer</option>
                                                        <option value="nt">Non - Technical</option> */}
                                                        {/* {rolesDropdownItems} */} 
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <select defaultValue={item.interviewType} onChange={(e)=>{refreshDataIntType(e, index)}} className="form-select" value={item.interviewType}>
                                                        <option value="">Select Interview type</option>
                                                        {
                                                            intType.map((iType=>{
                                                                return <option value={iType.type_id}>{iType.type}</option>
                                                            }))
                                                        }
                                                        {/* <option value="L1">L1</option>
                                                        <option value="L2">L2</option>
                                                        <option value="HR">HR</option> */}
                                                        {/* <option value="L1&L2">L1 & L2</option> */}
                                                        {/*  {typesDropdownItems}  */}   
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-check form-switch">
                                                    <input onChange={(e)=>{refreshDataActive(e, index)}}
                                                    checked={item.isActive} 
                                                    className="form-check-input mt-2" 
                                                    type="checkbox" 
                                                    // data-testid="checkbox" 
                                                    role="switch" 
                                                    id="isActive"/>
                                                </div>
                                            </td>
                                            <td>
                                                {index+1 != tableData.length ? <></> : <button type="button" className="btn btn-primary col-10" onClick={addNewRole}>Add New Role</button>}
                                            </td>
                                            <td>
                                                <BsTrashFill onClick={(e)=>{deleteRow(e,index)}} className="text-primary mt-2" style={{ scale: "1.5" }}>delete</BsTrashFill>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <div className='mb-4'>
                        {tableData.length <= 0 ? <button type='button' className='btn btn-primary mb-10' onClick={addNewRole}>Add new Role</button> : <></>}
                    </div>
                    {/* {status} */}
                    <button style={{ marginRight: "20px" }} className='btn btn-primary' onClick={editpanel}>Update</button>
                    <button type="button"className='btn btn-primary' onClick={()=>{navigate('/panelList')}}>Cancel</button>
                </form>
            </div>
            

            
        </div>
        </div>

    );
}

export default EditPanel;