import React, { useEffect, useRef, useState } from "react";
import './PHmultiple.css';
import { toast } from "react-toastify";
import { BiSearch } from 'react-icons/bi';
import NavBar from '../../../Utils/Headers';
import { useNavigate } from 'react-router-dom';

const hostURL = 'http://localhost:8000';

function PHmultiple() {

  const user_id = useRef(HTMLInputElement);
  const grade = useRef(HTMLInputElement);
  const [ID, setID] = useState();
  const [Grade, setGrade] = useState();
  const [panelId, setPanelId] = useState();
  const [showTimeErr, setShowTimeErr] = useState("");
  const navigate = useNavigate();

  function getDate() {
    const d = new Date();
    return d.getUTCFullYear().toString() + "-" + (d.getUTCMonth() + 1).toString() + "-" + d.getUTCDate().toString();
  }


  const getdata = async (associate_name) => {

    console.log(associate_name)
    console.log("getdata")
    const res = await fetch("http://localhost:8000/panelavailPA", {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ associate_name })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setID(data.user_id)
        console.log(data.user_id)
        setGrade(data.grade)
        console.log(data.grade)
        setPanelId(data.panel_id)

        /* grade.current.value = data.grade;
        console.log(grade.current.value)
        user_id.current.value = data.user_id;
        console.log(user_id.current.value) */
      });
  };


  const [data, setdata] = useState({
    fromdate: "",
    todate: "",
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
    }
    else if (data.end_time <= data.start_time && data.end_time !== "") {
      setShowTimeErr("end time should be greater than start time");
    }
    else {
      setShowTimeErr("");
    }
  }, [data.end_time, data.start_time]);

  useEffect(() => {
    var startDate = new Date(data.fromdate);
    var endDate = new Date(data.todate);
    let workingDays = [];

    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }

    for (let counter = startDate; counter <= endDate; counter = counter.addDays(1)) {
      workingDays.push(counter.getDay());
    }

    const updatedDisablesState = disableState.map((item, index) => {
      return workingDays.includes(index) ? false : true
    })

    setDisable(updatedDisablesState)
    console.log(workingDays)


  }, [data.todate])



  const postdata = async (e) => {
    e.preventDefault();
    if (!showTimeErr && data.end_time && data.start_time && data.fromdate && data.todate && ID) {
      const val = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      const filterdata = check.filter((data) => {
        return data.isChecked === true;
      })
      const arr = filterdata.map(function (item) {
        return item['name'];
      });

      const week = arr.map((day) => {
        return val.indexOf(day)
      })
      const { fromdate, todate, start_time, end_time } = data
      var startDate = new Date(fromdate);
      var endDate = new Date(todate);
      let workingDays = [];

      Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      }

      for (let counter = startDate; counter <= endDate; counter = counter.addDays(1)) {
        workingDays.push(counter);
      }

      const selectedDates = workingDays.filter((data, ind) => {
        for (let i of week) {
          if (i === new Date(data).getDay()) {
            return data
          }
        }
      })

      //--------------------------------------------------------------------------------
      const finaldata = [];
      for (let j of selectedDates) {
        for (let i = start_time.split(":")[0]; i < end_time.split(":")[0]; i++) {
          const week_days = val[new Date(j).getDay()]
          finaldata.push({
            panel_id: panelId,
            available_date: new Date(j),
            ["start_time"]: `${i}:${start_time.split(":")[1]}`,
            ["end_time"]: `${(parseInt(i) + 1).toString()}:${start_time.split(":")[1]
              }`,
            week_days,
            panel_availability_id: Math.floor(Math.random() * 10000),
            availability_status_id: "ASI1",
          });
        }
      }

      //console.log(finaldata);
      //--------------------------------------------------------------------------------

      // console.log("Res : " + JSON.stringify({ user_id:ID, associate_name, week, fromdate, todate, start_time, end_time }));

      const res = await fetch(hostURL + '/panelavailPA/addPanelAvailability', {
        method: "POST",
        headers: {
          //'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finaldata)
      });
      const result = await res.json();
      //console.log(JSON.stringify({data}))
      if (result.status === 422 || !result) {
        toast.error("invalid registration" , {autoClose: 1000});
        console.log("invalid registration");
      }
      else {
        // window.alert("valid resgistration");
        toast.success('Panel availbility added successfully', { autoClose: 1000 });
        // navigate('/panelavailbility');
        // console.log(data);
      }
    } else {
      toast.error('please fill the valid data', { autoClose: 1000 });
    }
  }

  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    fetch(hostURL + "/panelavailPA/panelNames", {
      method: "GET",
      headers: {
        'Content-Type': "application/json"
      }
    }).then(res => res.json()).then((result) => {
      console.log(result.data);
      setNameList(result.data);

    })
      .catch((err) => {
        alert(err);
      });
  }, []);



  function fillValues(item) {
    console.log(item);

    getdata(item.value)

    // console.log(item.user_id)
    // console.log(item.grade)
  }

  console.log(getDate())




  const [checkedState, setCheckedState] = useState(new Array(7).fill(false));
  const [disableState, setDisable] = useState(new Array(7).fill(true));
  //console.log(isChecked)
  const handleChangeRoleId = (e) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === e ? !item : item
    );

    setCheckedState(updatedCheckedState);

  };

  const check = [
    {
      name: "SUN",
      isChecked: checkedState[0],
      disabled: disableState[0]
    },
    {
      name: "MON",
      isChecked: checkedState[1],
      disabled: disableState[1]
    },
    {
      name: "TUE",
      isChecked: checkedState[2],
      disabled: disableState[2]
    },
    {
      name: "WED",
      isChecked: checkedState[3],
      disabled: disableState[3]
    },
    {
      name: "THU",
      isChecked: checkedState[4],
      disabled: disableState[4]
    },
    {
      name: "FRI",
      isChecked: checkedState[5],
      disabled: disableState[5]
    },
    {
      name: "SAT",
      isChecked: checkedState[6],
      disabled: disableState[6]
    },

  ];

  const userData = JSON.parse(window.sessionStorage.getItem('user_data'));

  return (
    <div className="p-2" >
      <NavBar />
      <div className="container-wrap px-3">
        <>
          <div className='container-wrap'>
            <h2 className="col-0 mb-5"> Add Panel Availability - Multiple(PH)</h2>

            <form>
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
                    {/* <input className="form-control"  value={userData.name} placeholder="Enter Associate name" /> */}
                    <select name="associatename" onChange={(e) => { fillValues(e.target); }} className="form-control">
                      <option value="">Search Associate name</option>
                      {
                        nameList.map((item, index) => {
                          return (
                            <option value={`${item.name}-${item.user_id}`}>
                              {item.name}-{item.user_id}
                            </option>
                          );
                        })
                      }
                    </select>
                    <div id="search-icon">
                      <div style={{ position: "absolute", top: "5px", right: "10px" }}>
                        <BiSearch size="20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-1"></div>
              <div className="row mb-3">
                <div className="col-md-1">
                  <div className="form-group">
                    <label className="fw-bolder " htmlFor="assiciateid" >
                      Associate Id
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group ">
                    <input name="associateid"
                      id="associate-id"
                      ref={user_id}
                      // value={userData.user_id}
                      type="text"
                      value={ID}
                      className="form-control"
                      placeholder="Associate Id"
                      disabled
                    />
                  </div>
                </div>
                <div className="col-sm-1"></div>
                <div className="col-md-1 ">
                  <div className="form-group">
                    <label className="fw-bolder" htmlFor="assosiategrade">
                      Grade
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group ">
                    <input
                      type="text"
                      className="form-control"
                      id="assosciate-grade"
                      ref={grade}
                      placeholder="Enter Associate Grade"
                      // name='assosciate-grade'
                      value={Grade}
                      onChange={handleInputs}
                      disabled
                    />                </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-1">
                  <div className="form-group" >
                    <label className="fw-bolder" htmlFor="fromdate">
                      From Date
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input name="fromdate" onChange={handleInputs} value={data.fromdate} className="form-control" type="date" min={new Date().toISOString().split('T')[0]} placeholder=" Select Date" required />
                  </div>
                </div>
                <div className="col-sm-1"></div>
                <div className="col-md-1">
                  <div className="form-group">
                    <label className="fw-bolder " htmlFor="todate">
                      To Date
                    </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <input name="todate" onChange={handleInputs} value={data.todate} className="form-control" type="date" min={data.fromdate} placeholder="Select Date" required />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-1">
                  <div className="form-group">
                    <label className="fw-bolder " htmlFor="day">
                      Days Of Week
                    </label>
                  </div>
                </div>
                <div className="col-md-9 d-flex " style={{ paddingTop: "10px", justifyContent: "space-between", marginLeft: "" }}>
                  {check.map(({ name }, index) => {
                    return (
                      <div key={index}>
                        <div className="checks-list-item">
                          {/* <div className=""> */}
                          <input
                            type="checkbox"
                            id={`custom-checkbox-${index}`}
                            name="week_days"
                            value={name}
                            checked={checkedState[index]}
                            onChange={() => handleChangeRoleId(index)}
                            disabled={disableState[index]} />
                          <label className={checkedState[index] ? "btn btn-primary btn-sm px-1 py-1" : "btn btn-outline-primary btn-sm px-1 py-1"} htmlFor={`custom-checkbox-${index}`}>{name}</label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>



              <div className="row mb-5">
                <div className="col-md-1">
                  <div className="form-group">
                    <label className="fw-bolder  " htmlFor="fromtime">
                      From Time
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="time"
                      placeholder=" Enter From Time"
                      name="start_time"
                      value={data.start_time}
                      onChange={handleInputs}
                      required
                    />                </div>
                </div>
                <div className="col-sm-1"></div>
                <div className="col-md-1">
                  <div className="form-group">
                    <label className="fw-bolder " htmlFor="totime">
                      To Time
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group ">
                    <input
                      className="form-control"
                      type="time"
                      placeholder=" Enter To Time"
                      name="end_time"
                      value={data.end_time}
                      onChange={handleInputs}
                      required
                    />
                    <p style={{ color: "red", paddingLeft: "0px" }}>{showTimeErr}</p>
                  </div>
                </div>
              </div>

              <div className="row addList__button">
                <div>
                  <button type="submit" className="btn btn-primary" data-testid="submit" value="" onClick={postdata} style={{ marginRight: "10px" }} >
                    Submit
                  </button>
                  <button type="button" onClick={() => { navigate('/panelavailbility') }} className="btn btn-primary " data-testid="cancel" value="" >
                    Cancel
                  </button>
                </div>
              </div>

            </form>
            {/* {showTimeErr} */}
          </div>
        </>
      </div>
    </div>

  );
}

export default PHmultiple;