// import React,{useEffect, useRef, useState} from "react";
// import './PANELsingle.css';
// import {BiSearch} from 'react-icons/bi';
// // import './getDate'
// // import getDate from "./getDate";
// // import TextField from '@material-ui/core/TextField';
// // import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

// const hostURL = 'http://127.0.0.1:8000';

// function PANELsingle() {

//     const associatename = useRef(HTMLInputElement);
//     const associateid = useRef(HTMLInputElement);
//     const associategrade = useRef(HTMLInputElement);
//     const date = useRef(HTMLInputElement);
//     const fromtime = useRef(HTMLInputElement);
//     const totime= useRef(HTMLInputElement);

//     const listOfNames = useRef(HTMLInputElement);

//     function getDate(){
//         const d = new Date();
//         return d.getUTCFullYear().toString()+"-"+(d.getUTCMonth()+1).toString()+"-"+d.getUTCDate().toString();
//     }

//     const [nameList, setNameList] = useState([]);

//     useEffect(()=>{
//         fetch(hostURL+"/addPanelSingle/panelNames", {
//             method: "GET",
//             headers: {
//                 'Content-Type': "application/json"
//             }
//         }).then(res => res.json()).then((result)=>{
//             console.log(result.data);
//             setNameList(result.data);
//         })
//         .catch((err)=>{
//             alert(err);
//         });
//     }, []);

//    async function handleSubmit(e){
//     alert(associatename.current.value);
//     e.preventDefault();
//     fetch(hostURL+"/panelsingle",{
//     method:"POST",
//     headers: {
//         'Content-Type': "application/json"
//     },
//     body: JSON.stringify({
//         user_id: associateid.current.value,
//         name: associatename.current.value,
//         grade: associategrade.current.value,
//         date:date.current.value,
//         fromtime:fromtime.current.value,
//         totime:totime.current.value
//     })
//    }).then(res => res.json())
//     .then((result) => {
//         console.log(result);

//     });
//    }

//    function fillValues(item){
//         console.dir(item);
//     }

//     return (
//         <div className="container-wrap px-3">
//             <>
//                 <div className='container-wrap'>
//                     <h2 className="col-0 mb-5"> Add Panel Availability - Single</h2>

//                 <form>
//                     <div className="row mb-3">
//                         <div className="col-md-1">
//                             <div className="form-group">
//                                 <label className="fw-bolder" for="userid">
//                                         Associate Name
//                                 </label>
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="form-group position-relative">
//                                 {/* <select ref={associateid} onChange={(e)=>{fillValues(e.target);}} className="form-control" id="searchAssociate">
//                                     <option value="">Search Associate name</option>
//                                     {
//                                         nameList.map((item,index)=>{
//                                             return (
//                                                 <option value={item.name}>
//                                                     {item.user_id} - {item.name}
//                                                 </option>
//                                             );
//                                         })
//                                     }
//                                 </select> */}
//                                 <div className="card">
//                                     <datalist id="userNames">
//                                     {
//                                         nameList.map((item,index)=>{
//                                             return (
//                                                 <option value={item.name}>
//                                                     {item.user_id} - {item.name}
//                                                 </option>
//                                             );
//                                         })
//                                     }
//                                     </datalist>
//                                     <input type="search" className="form-control" list="userNames" placeholder="Search Associate Name" />
//                                 </div>
//                                 <div id="search-icon">
//                                     <div style={{position:"absolute", top:"5px", right: "10px"}}>
//                                         <BiSearch size="20" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col-sm-1"></div>
//                     <div className="row mb-3">
//                         <div className="col-md-1">
//                             <div className="form-group">
//                                 <label className="fw-bolder " for="username">
//                                     Associate Id
//                                 </label>
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="form-group ">
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Associate Id"
//                                     id="Associate Id"
//                                     ref={associateid}
//                                 />
//                             </div>
//                         </div>
//                         <div className="col-sm-1"></div>
//                         <div className="col-md-1 ">
//                             <div className="form-group">
//                                 <label className="fw-bolder" for="email">
//                                     Associate Grade
//                                 </label>
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="form-group ">
//                                 <input className="form-control" ref={associategrade} placeholder="Associate Grade" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row mb-3">
//                         <div className="col-md-1">
//                             <div className="form-group" >
//                                 <label className="fw-bolder  " for="userid">
//                                     Date
//                                 </label>
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="form-group">
//                             <input className="form-control"  type="date"  min={new Date().toISOString().split('T')[0]}  placeholder=" Select Date" required />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="row mb-5">
//                         <div className="col-md-1">
//                             <div className="form-group">
//                                 <label className="fw-bolder  " for="userid">
//                                     From TIme
//                                 </label>
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="form-group">
//                                 <input className="form-control" ref={fromtime} type="time" placeholder="Enter From Time" required id="appt" name="appt"></input>
//                             </div>
//                         </div>
//                         <div className="col-sm-1"></div>
//                         <div className="col-md-1">
//                             <div className="form-group">
//                                 <label className="fw-bolder " for="username">
//                                     To Time
//                                 </label>
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="form-group ">
//                                 <input className="form-control" type="time" placeholder="Enter To Time"required  ref={totime} id="appt" name="appt"></input>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="row addList__button">
//                         <div>
//                             <button type="submit" className="btn btn-primary" data-testid="submit" value=""  onClick = {(e)=>handleSubmit(e)} style={{ marginRight: "10px" }} >
//                                 Submit
//                             </button>
//                             <button type="cancel" className="btn btn-primary " data-testid="cancel" value="" >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//                 </div>
//             </>
//         </div>
//                                     );
// }

// export default PANELsingle;

import React, { useRef, useState } from "react";
import NavBar from '../../../Utils/Headers';
import "./PANELsingle.css";

function PHsingle() {
  const grade = useRef(HTMLInputElement);
  const user_id = useRef(HTMLInputElement);
  const [ID, setID] = useState();
  const [Grade, setGrade] = useState();
  function getDate() {
    const d = new Date();
    return (
      d.getUTCFullYear().toString() +
      "-" +
      (d.getUTCMonth() + 1).toString() +
      "-" +
      d.getUTCDate().toString()
    );
  }

  const [data, setdata] = useState({
    ID: "",
    week_days: "",
    associate_name: "",
    start_date: "",
    start_time: "",
    end_time: "",
    panel_availability_id: "",
    availability_status_id: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setdata({ ...data, [name]: value });
  };

  const hostURL = "http://localhost:8000";

  // to fetch ID,Grade

  // const getdata = async (e) => {
  //   const {associate_name}=data.associate_name
  //   console.log("getdata")
  //   const res = await fetch(hostURL+"/phsingle", {
  //     method: "POST",
  //     headers: {
  //       //'Accept': 'application/json',
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({associate_name:associate_name})
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       setID(data.grade)
  //       setGrade(data.user_id)
  //       /* grade.current.value = data.grade;
  //       console.log(grade.current.value)
  //       user_id.current.value = data.user_id;
  //       console.log(user_id.current.value) */
  //     });
  // };

  //postdata

  const postdata = async (e) => {
    console.log("postdata");
    e.preventDefault();
    const {
      associate_name,
      start_date,
      end_date,
      start_time,
      end_time,
      week_days,
      panel_availability_id,
      availability_status_id,
    } = data;
    const res = await fetch(hostURL + "/phsingle", {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        associate_name,
        available_from_date: start_date,
        available_to_date: end_date,
        start_time,
        end_time,
        week_days,
        panel_availability_id,
        availability_status_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="p-2">
      <NavBar />
    <div className='container-wrap px-3'>
      <div className='container-wrap'>
        <div className='row mb-5'>
          <h2>Add Panel Availability- Single</h2>
        </div>

        <div className='row mb-6'>
          <div className='col-md-1'>
            <div className=''>
              <label
                className='fw-bolder'
                htmlFor='userid'>
                Associate Name
              </label>
            </div>
          </div>
          <div className='col-md-4'>
            <div className=''>
              <input
                type='text'
                className='form-control'
                id='associate-name'
                // ref={CandidateName}
                placeholder='Enter Associate Name'
                name='associate_name'
                value={data.associate_name}
                onChange={handleInputs}
              />
            </div>
          </div>
        </div>

        <div className='row mb-6'>
          <div className='col-md-1'>
            <div className=''>
              <label
                className='fw-bolder'
                htmlFor='userid'>
                Associate ID
              </label>
            </div>
          </div>
          <div className='col-md-4'>
            <div className=''>
              <input
                type='text'
                className='form-control'
                id='associate-id'
                // ref={CandidateName}
                ref={user_id}
                placeholder='Enter Associate ID'
                name='associate_id'
                value={ID}
                // onChange={handleInputs}
                disabled='true'
              />
            </div>
          </div>
          <div className='col-sm-1'></div>
          <div className='col-md-1'>
            <div className=''>
              <label
                className='fw-bolder'
                htmlFor='userid'>
                Associate Grade
              </label>
            </div>
          </div>
          <div className='col-md-4'>
            <div className=''>
              <input
                type='text'
                className='form-control'
                id='assosciate-grade'
                ref={grade}
                placeholder='Enter Associate Grade'
                // name='assosciate-grade'
                value={Grade}
                // onChange={handleInputs}
                disabled='true'
              />
            </div>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-1'>
            <div className=''>
              <label
                className='fw-bolder'
                htmlFor='userid'>
                Date
              </label>
            </div>
          </div>
          <div className='col-md-4'>
            <div className=''>
              <input
                className='form-control'
                type='date'
                min={new Date().toISOString().split("T")[0]}
                placeholder=' Select Date'
                name='start_date'
                value={data.start_date}
                onChange={handleInputs}
                required
              />
            </div>
          </div>
        </div>

        <div className='row mb-6'>
          <div className='col-md-1'>
            <div className=''>
              <label
                className='fw-bolder'
                htmlFor='userid'>
                From Time
              </label>
            </div>
          </div>
          <div className='col-md-4'>
            <div className=''>
              <input
                className='form-control'
                type='time'
                placeholder=' Enter From Time'
                name='start_time'
                value={data.start_time}
                onChange={handleInputs}
                required
              />
            </div>
          </div>

          <div className='col-sm-1'></div>

          <div className='col-md-1'>
            <div className=''>
              <label
                className='fw-bolder'
                htmlFor='userid'>
                To Time
              </label>
            </div>
          </div>
          <div className='col-md-4'>
            <div className=''>
              <input
                className='form-control'
                type='time'
                placeholder=' Enter To Time'
                name='end_time'
                value={data.end_time}
                onChange={handleInputs}
                required
              />
            </div>
          </div>
        </div>
        {/* {JSON.stringify({ data })} */}
        <div className='row mt-4'>
          <div className='col-md-1'>
            <div className='form-group'>
              <button
                type='submit'
                // onClick={handleSearch}
                className='btn btn-primary '
                data-testid='submit'
                value=''
                onClick={postdata}>
                Submit
              </button>
            </div>
          </div>
          &emsp;&emsp;&emsp;
          <div className='col-md-1'>
            {/* <div className="form"> */}
            <div className='form-group'>
              <button
                type='submit'
                // onClick={handleSearch}
                className='btn btn-primary'
                data-testid='submit'
                value=''
                // onClick={getdata}
              >
                Cancel
              </button>
            </div>
          </div>
          &emsp;&emsp;&emsp;
        </div>
      </div>
    </div>
    </div>

  );
}

export default PHsingle;
