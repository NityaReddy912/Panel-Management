// import React, { useEffect, useRef, useState } from "react";
// import './PHmultiple.css';
// import { BiSearch } from 'react-icons/bi';

// const hostURL = 'http://127.0.0.1:8000';

// function PANELmultiple() {

//   // const associatename = useRef(HTMLInputElement);
//   const user_id = useRef(HTMLInputElement);
//   const grade = useRef(HTMLInputElement);
//   const [ID, setID] = useState();
//   const [Grade, setGrade] = useState();
//   // const fromdate = useRef(HTMLInputElement);
//   // const todate = useRef(HTMLInputElement);
//   // const fromtime = useRef(HTMLInputElement);
//   // const totime = useRef(HTMLInputElement);

//   function getDate() {
//     const d = new Date();
//     return d.getUTCFullYear().toString() + "-" + (d.getUTCMonth() + 1).toString() + "-" + d.getUTCDate().toString();
//   }


//   // const[Name,setName]=useState();
//   // const[FromDate,setFromDate]=useState();
//   // const[ToDate,setToDate]=useState();
//   // const[FromTime,setFromTime]=useState();
//   // const[ToTime,setToTime]=useState();

//   const [data, setdata] = useState({
//     user_id: 3,
//     associate_name: "Aditya",
//     week_days: "MON",
//     fromdate: "",
//     todate: "",
//     start_time: "",
//     end_time: "",
//   });

//   let name, value;
//   const handleInputs = (e) => {
//     name = e.target.name;
//     value = e.target.value;

//     setdata({ ...data, [name]: value });
//   };

//   const postdata = async (e) => {
//     e.preventDefault();
//     const { user_id, associate_name, week_days, fromdate, todate, start_time, end_time } = data
//     console.log("Res : " + JSON.stringify({ user_id, associate_name, week_days, fromdate, todate, start_time, end_time }));

//     const res = await fetch(hostURL + '/panel_availability/addPanelAvailability', {
//       method: "POST",
//       headers: {
//         //'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ user_id, associate_name, week_days, fromdate, todate, start_time, end_time })
//     });
//     const result = await res.json();
//     //console.log(JSON.stringify({data}))
//     if (result.status === 422 || !result) {
//       window.alert("invalid resgistration");
//       console.log("invalid registration");
//     }
//     else {
//       window.alert("valid resgistration");
//       // console.log(data);
//     }
//   }

//   const [nameList, setNameList] = useState([]);

//   useEffect(() => {
//     fetch(hostURL + "/panel_availability/panelNames", {
//       method: "GET",
//       headers: {
//         'Content-Type': "application/json"
//       }
//     }).then(res => res.json()).then((result) => {
//       console.log(result.data);
//       setNameList(result.data);
      
//     })
//       .catch((err) => {
//         alert(err);
//       });
//   }, []);

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   alert("erjl" + e.target);
//   //   console.log("Result " + e.target.associategrade.value);

//   //   // alert('hello');
//   //   fetch(hostURL + "/panel_availability/addPanelAvailability", {
//   //     method: "POST",
//   //     headers: {
//   //       'Content-Type': "application/json"
//   //     },
//   //     body: JSON.stringify({
//   //       panel_id: e.target.associateid.value,
//   //       week_days: e.target.week_days.value,
//   //       available_from_date: e.target.fromdate.value,
//   //       available_to_date: e.target.todate.value,
//   //       start_time: e.target.fromtime.value,
//   //       end_time: e.target.totime.value
//   //     })
//   //   }).then(res => res.json())
//   //     .then((result) => {
//   //       console.log(result);
//   //       alert(result);
//   //     });
//   // }

//   function fillValues(item) {
//     console.dir(item);
//     setID(item.user_id)
//     setGrade(item.grade)
//   }

//   console.log(getDate())

//   const check = [
//     {
//       name: "MON",
//       isChecked: "false"
//     },
//     {
//       name: "TUE",
//       isChecked: "false"
//     },
//     {
//       name: "WED",
//       isChecked: "false"
//     },
//     {
//       name: "THU",
//       isChecked: "false"
//     },
//     {
//       name: "FRI",
//       isChecked: "false"
//     },
//     {
//       name: "SAT",
//       isChecked: "false"
//     },
//   ];
//   const [checkedState, setCheckedState] = useState(new Array(check.length).fill(false));
//   //console.log(isChecked)
//   const handleChangeRoleId = (e) => {
//     const updatedCheckedState = checkedState.map((item, index) =>
//       index === e ? !item : item
//     );

//     setCheckedState(updatedCheckedState);

//   };

//   return (
//     <div className="container-wrap px-3">
//       <>
//         <div className='container-wrap'>
//           <h2 className="col-0 mb-5"> Add Panel Availability - Multiple(PH)</h2>

//           <form>
//             <div className="row mb-3">
//               <div className="col-md-1">
//                 <div className="form-group">
//                   <label className="fw-bolder" htmlFor="userid">
//                     Associate Name
//                   </label>
//                 </div>

//               </div>
//               <div className="col-md-4">
//                 <div className="form-group position-relative">
//                   <select name="associatename" onChange={(e) => { fillValues(e.target); }} className="form-control">
//                     <option value="">Search Associate name</option>
//                     {
//                       nameList.map((item, index) => {
//                         return (
//                           <option value={item.name}>
//                             {item.user_id} - {item.name}
//                           </option>
//                         );
//                       })
//                     }
//                   </select>
//                   <div id="search-icon">
//                     <div style={{ position: "absolute", top: "5px", right: "10px" }}>
//                       <BiSearch size="20" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-sm-1"></div>
//             <div className="row mb-3">
//               <div className="col-md-1">
//                 <div className="form-group">
//                   <label className="fw-bolder " htmlFor="assiciateid" >
//                     Associate Id
//                   </label>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group ">
//                   <input name="associateid"
//                     id="associate-id"
//                     ref={user_id}
//                     type="text"
//                     value={ID}
//                     className="form-control"
//                     placeholder="Associate Id"
//                     disabled
//                   />
//                 </div>
//               </div>
//               <div className="col-sm-1"></div>
//               <div className="col-md-1 ">
//                 <div className="form-group">
//                   <label className="fw-bolder" htmlFor="assosiategrade">
//                     Associate Grade
//                   </label>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group ">
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="assosciate-grade"
//                     ref={grade}
//                     placeholder="Enter Associate Grade"
//                     // name='assosciate-grade'
//                     value={Grade}
//                     // onChange={handleInputs}
//                     disabled
//                   />                </div>
//               </div>
//             </div>
//             <div className="row mb-3">
//               <div className="col-md-1">
//                 <div className="form-group" >
//                   <label className="fw-bolder" htmlFor="fromdate">
//                     From Date
//                   </label>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <input name="fromdate" onChange={handleInputs} value={data.fromdate} className="form-control" type="date" min={new Date().toISOString().split('T')[0]} placeholder=" Select Date" required />
//                 </div>
//               </div>
//               <div className="col-sm-1"></div>
//               <div className="col-md-1">
//                 <div className="form-group">
//                   <label className="fw-bolder " htmlFor="todate">
//                     To Date
//                   </label>
//                 </div>
//               </div>

//               <div className="col-md-4">
//                 <div className="form-group">
//                   <input name="todate" onChange={handleInputs} value={data.todate} className="form-control" type="date" min={new Date().toISOString().split('T')[0]} placeholder="Select Date" required />
//                 </div>
//               </div>
//             </div>
//             <div className="row mb-3">
//               <div className="col-md-1">
//                 <div className="form-group">
//                   <label className="fw-bolder " htmlFor="day">
//                     Days Of Week
//                   </label>
//                 </div>
//               </div>
//               <div className="col-md-9 d-flex" style={{ paddingTop: "10px", justifyContent: "space-between", marginLeft: "" }}>
//                 {check.map(({ name }, index) => {
//                   return (
//                     <div key={index}>
//                       <div className="checks-list-item">
//                         {/* <div className=""> */}
//                         <input
//                           type="checkbox"
//                           id={`custom-checkbox-${index}`}
//                           name="week_days"
//                           value={name}
//                           checked={checkedState[index]}
//                           onChange={() => handleChangeRoleId(index)}
//                         />
//                         <label className={checkedState[index] ? "btn btn-primary btn-sm px-1 py-1" : "btn btn-outline-primary btn-sm px-1 py-1"} htmlFor={`custom-checkbox-${index}`}>{name}</label>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>



//             <div className="row mb-5">
//               <div className="col-md-1">
//                 <div className="form-group">
//                   <label className="fw-bolder  " htmlFor="fromtime">
//                     From TIme
//                   </label>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <input
//                     className="form-control"
//                     type="time"
//                     placeholder=" Enter From Time"
//                     name="start_time"
//                     value={data.start_time}
//                     onChange={handleInputs}
//                     required
//                   />                </div>
//               </div>
//               <div className="col-sm-1"></div>
//               <div className="col-md-1">
//                 <div className="form-group">
//                   <label className="fw-bolder " htmlFor="totime">
//                     To Time
//                   </label>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group ">
//                   <input
//                     className="form-control"
//                     type="time"
//                     placeholder=" Enter To Time"
//                     name="end_time"
//                     value={data.end_time}
//                     onChange={handleInputs}
//                     required
//                   />                </div>
//               </div>
//             </div>
//             {JSON.stringify({ data })}

//             <div className="row addList__button">
//               <div>
//                 <button type="submit" className="btn btn-primary" data-testid="submit" value="" onClick={postdata} style={{ marginRight: "10px" }} >
//                   Submit
//                 </button>
//                 <button type="cancel" className="btn btn-primary " data-testid="cancel" value="" >
//                   Cancel
//                 </button>
//               </div>
//             </div>

//           </form>

//         </div>
//       </>
//     </div>
//   );
// }

// export default PANELmultiple;

import React, { useEffect, useRef, useState } from "react";
import './PHmultiple.css';
import { BiSearch } from 'react-icons/bi';
import NavBar from '../../../Utils/Headers';

const hostURL = 'http://127.0.0.1:8000';

function PANELmultiple() {

  // const associatename = useRef(HTMLInputElement);
  const user_id = useRef(HTMLInputElement);
  const grade = useRef(HTMLInputElement);
  const [ID, setID] = useState();
  const [Grade, setGrade] = useState();
  // const fromdate = useRef(HTMLInputElement);
  // const todate = useRef(HTMLInputElement);
  // const fromtime = useRef(HTMLInputElement);
  // const totime = useRef(HTMLInputElement);

  function getDate() {
    const d = new Date();
    return d.getUTCFullYear().toString() + "-" + (d.getUTCMonth() + 1).toString() + "-" + d.getUTCDate().toString();
  }


  // const[Name,setName]=useState();
  // const[FromDate,setFromDate]=useState();
  // const[ToDate,setToDate]=useState();
  // const[FromTime,setFromTime]=useState();
  // const[ToTime,setToTime]=useState();

  const [data, setdata] = useState({
    user_id: 3,
    associate_name: "Aditya",
    week_days: "MON",
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

  const postdata = async (e) => {
    e.preventDefault();
    const { user_id, associate_name, week_days, fromdate, todate, start_time, end_time } = data
    console.log("Res : " + JSON.stringify({ user_id, associate_name, week_days, fromdate, todate, start_time, end_time }));

    const res = await fetch(hostURL + '/panel_availability/addPanelAvailability', {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id, associate_name, week_days, fromdate, todate, start_time, end_time })
    });
    const result = await res.json();
    //console.log(JSON.stringify({data}))
    if (result.status === 422 || !result) {
      window.alert("invalid resgistration");
      console.log("invalid registration");
    }
    else {
      window.alert("valid resgistration");
      // console.log(data);
    }
  }

  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    fetch(hostURL + "/panel_availability/panelNames", {
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("erjl" + e.target);
  //   console.log("Result " + e.target.associategrade.value);

  //   // alert('hello');
  //   fetch(hostURL + "/panel_availability/addPanelAvailability", {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': "application/json"
  //     },
  //     body: JSON.stringify({
  //       panel_id: e.target.associateid.value,
  //       week_days: e.target.week_days.value,
  //       available_from_date: e.target.fromdate.value,
  //       available_to_date: e.target.todate.value,
  //       start_time: e.target.fromtime.value,
  //       end_time: e.target.totime.value
  //     })
  //   }).then(res => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       alert(result);
  //     });
  // }

  function fillValues(item) {
    console.dir(item);
    setID(item.user_id)
    setGrade(item.grade)
  }

  console.log(getDate())

  const check = [
    {
      name: "MON",
      isChecked: "false"
    },
    {
      name: "TUE",
      isChecked: "false"
    },
    {
      name: "WED",
      isChecked: "false"
    },
    {
      name: "THU",
      isChecked: "false"
    },
    {
      name: "FRI",
      isChecked: "false"
    },
    {
      name: "SAT",
      isChecked: "false"
    },
  ];
  const [checkedState, setCheckedState] = useState(new Array(check.length).fill(false));
  //console.log(isChecked)
  const handleChangeRoleId = (e) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === e ? !item : item
    );

    setCheckedState(updatedCheckedState);

  };

  return (
    <div>
      <NavBar />
    <div className="container-wrap px-3">
      <>
        <div className='container-wrap'>
          <h2 className="col-0 mb-5"> Add Panel Availability - Multiple(Panel)</h2>

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
                    <input type="text" className="form-control" disabled="true" placeholder="Associate Name"/>
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
                    // onChange={handleInputs}
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
                  <input name="todate" onChange={handleInputs} value={data.todate} className="form-control" type="date" min={new Date().toISOString().split('T')[0]} placeholder="Select Date" required />
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
              <div className="col-md-9 d-flex" style={{ paddingTop: "10px", justifyContent: "space-between", marginLeft: "" }}>
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
                        />
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
                    From TIme
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
                  />                </div>
              </div>
            </div>
            {/* {JSON.stringify({ data })} */}

            <div className="row addList__button">
              <div>
                <button type="submit" className="btn btn-primary" data-testid="submit" value="" onClick={postdata} style={{ marginRight: "10px" }} >
                  Submit
                </button>
                <button type="cancel" className="btn btn-primary " data-testid="cancel" value="" >
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

export default PANELmultiple;