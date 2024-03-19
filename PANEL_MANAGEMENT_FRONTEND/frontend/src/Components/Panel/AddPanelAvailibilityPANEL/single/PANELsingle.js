import React, { useEffect, useRef, useState } from "react";
import "./PANELsingle.css";
import { BiSearch } from "react-icons/bi";
import {useNavigate} from 'react-router-dom';
import NavBar from '../../../Utils/Headers';
import {toast} from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';


const hostURL = "http://127.0.0.1:8000";

function PHsingle() {
  const grade = useRef(HTMLInputElement);
  const user_id = useRef(HTMLInputElement);
  const navigate = useNavigate();
  const [ID, setID] = useState();
  const [Grade, setGrade] = useState();
  const [panelId, setPanelId] = useState();
  const [showTimeErr, setShowTimeErr] = useState("");

  const userData = JSON.parse(window.sessionStorage.getItem('user_data'));


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
    start_date: "",
    start_time: "",
    end_time: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setdata({ ...data, [name]: value });
  };

  useEffect(() => {
    if (
      data.end_time.split(":")[1] !== data.start_time.split(":")[1] &&
      data.end_time !== ""
    ) {
      setShowTimeErr("minutes of start time and end time should be same");
    } else if (data.end_time <= data.start_time && data.end_time !== "") {
      setShowTimeErr("end time should be greater than start time");
    } else {
      setShowTimeErr("");
    }
  }, [data.end_time, data.start_time]);

  const getdata = async (associate_name) => {
    const res = await fetch(hostURL + "/phsingle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ associate_name: associate_name }),
    })
      .then((res) => res.json())
      .then((data) => {
        setID(data.user_id);
        setGrade(data.grade);

        setPanelId(data.panel_id);
      });
  };
  const postdata = async (e) => {
    e.preventDefault();
    if(!showTimeErr && data.end_time && data.start_time && data.start_date && ID){

      const { start_date, start_time, end_time, week_days } = data;
      console.log(start_date);
      const finaldata = [];
      const weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      const day =new Date(start_date).getDay();
    
     
      for (let i = start_time.split(":")[0]; i < end_time.split(":")[0]; i++) {
        const week_days= ""
        finaldata.push({
          panel_id: panelId,
          available_date: start_date,
          ["start_time"]: `${i}:${start_time.split(":")[1]}`,
          ["end_time"]: `${(parseInt(i) + 1).toString()}:${
            start_time.split(":")[1]
          }`,
          week_days:weekday[day],
          panel_availability_id: Math.floor(Math.random() * 10000),
          availability_status_id: "ASI1",
        });
      }
  
      const res = await fetch(hostURL + "/phsingle/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finaldata),
      });
      const result = await res.json();
      if (result.status == 422 || !result) {
        // window.alert("invalid resgistration");
        toast.error("Invalid Resgistration", {autoClose: 1000});
      } else {
        // window.alert("valid resgistration");
        toast.success("Panel availbility added successfully", {autoClose: 1000});
        navigate('/panelavailbility');
      }
    }
    else{
      toast.error("Please fill valid details", {autoClose: 1000});
    }
  };

  const [nameList, setNameList] = useState([]);
  useEffect(() => {
    if(userData.role_id === 1003){
      user_id.current.value = userData.user_id;
      fetch(hostURL + "/panelavailPA", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({ associate_name : userData.name + "-" + userData.user_id  })
      })
      .then(res => res.json())
      .then((data)=>{
        setGrade(data.grade);
        setPanelId(data.panel_id);
        setID(data.user_id);
        console.log(data);
      });
    }
    else{
      fetch(hostURL + "/phsingle/panelNames", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setNameList(result.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, []);

  function fillValues(item) {
    getdata(item.value);
  }

  return (
    <div className="p-2">
      <NavBar/>
    <form onSubmit={postdata}>
      <div className="container-wrap px-3">
        <div className="container-wrap">
          <div className="row mb-5">
            <h2>Add Panel Availability- Single</h2>
          </div>

          <div className="row mb-3">
            <div className="col-md-1">
              <div className="form-group">
                <label className="fw-bolder" htmlFor="userid">
                  Name
                </label>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group position-relative">
                
                {userData.role_id === 1003 ? 
                  <input className="form-control" value={userData.name} placeholder="Associate Name" disabled/>
                  : <select
                  name="associatename"
                  required
                  onChange={(e) => {
                    fillValues(e.target);
                  }}
                  className="form-control"
                >
                  <option value="">Search Associate name</option>

                  {nameList.map((item, index) => {
                    return (
                      <option value={`${item.name}-${item.user_id}`}>
                        {item.user_id} - {item.name}
                      </option>
                    );
                  })}
                </select>}

                {userData.role_id === 1003 ? "": <div id="search-icon">
                  <div
                    style={{ position: "absolute", top: "5px", right: "10px" }}
                  >
                    <BiSearch size="20" />
                  </div>
                </div>}
              </div>
            </div>
          </div>

          <div className="row mb-6">
            <div className="col-md-1">
              <div className="">
                <label className="fw-bolder" htmlFor="userid">
                  Associate ID
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="associate-id"
                  placeholder="Enter Associate ID"
                  name="associate_id"
                  value={ID}
                  ref={user_id}
                  disabled="true"
                />
              </div>
            </div>
            <div className="col-sm-1"></div>
            <div className="col-md-1">
              <div className="">
                <label className="fw-bolder" htmlFor="userid">
                  Grade
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="assosciate-grade"
                  placeholder="Enter Associate Grade"
                  value={Grade}
                  disabled="true"
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-1">
              <div className="">
                <label className="fw-bolder" htmlFor="userid">
                  Date
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="">
                <input
                  className="form-control"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  placeholder=" Select Date"
                  name="start_date"
                  value={data.start_date}
                  onChange={handleInputs}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row mb-6">
            <div className="col-md-1">
              <div className="">
                <label className="fw-bolder" htmlFor="userid">
                  From Time
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="">
                <input
                  className="form-control"
                  type="time"
                  placeholder=" Enter From Time"
                  name="start_time"
                  value={data.start_time}
                  onChange={handleInputs}
                  required
                />
              </div>
            </div>

            <div className="col-sm-1"></div>

            <div className="col-md-1">
              <div className="">
                <label className="fw-bolder" htmlFor="userid">
                  To Time
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="">
                <input
                  className="form-control"
                  type="time"
                  placeholder=" Enter To Time"
                  name="end_time"
                  value={data.end_time}
                  onChange={handleInputs}
                  required
                />
              </div>
            </div>
            <div>
              <p style={{ color: "red", paddingLeft: "770px" }}>
                {showTimeErr}
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-1">
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary "
                  data-testid="submit"
                  value=""
                >
                  Submit
                </button>
              </div>
            </div>
            &emsp;&emsp;&emsp;
            <div className="col-md-1">
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-testid="submit"
                  value=""
                  onClick={(e)=>{e.preventDefault(); navigate('/panelavailbility');}}
                >
                  Cancel
                </button>
              </div>
            </div>
            &emsp;&emsp;&emsp;
          </div>
        </div>
      </div>
    </form>
    </div>

  );
}

export default PHsingle;
