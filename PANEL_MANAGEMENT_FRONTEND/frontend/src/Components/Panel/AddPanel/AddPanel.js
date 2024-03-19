import React, {
  createElement,
  useEffect,
  useRef,
  useState, useId
} from "react";
import "./addPanel.css";
import { BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import NavBar from '../../Utils/Headers';

function AddPanelIG() {
  const [tableData, setTableData] = useState([
    { role: "", interviewType: "", isActive: true, id:Math.random().toString() },
  ]);
  const [Err, setErr] = useState("");
  const [Success, setSuccess] = useState("");

  const [Grades, setGrades] = useState([]); //dropdown menus
  const [Types, setType] = useState([]);
  const [Roles, setRoles] = useState([]);

  const [UserID, setUserID] = useState("");
  const panel_info = useRef({
    associate_id: "",
    associate_name: "",
    email: "",
    contact: "",
    grade: "",
    activate: "true",
  });
  const [Email, setEmail] = useState("");
  const [Associate_name, setAssociate_name] = useState("");
  const navigate=useNavigate();
  const [ass_contact,setContact]=useState("");
  const [associate_id_valid,setAssociate_id_valid]=useState("");
  const [contact_valid,setContact_valid]=useState("")
  const [email_valid,setEmail_valid]=useState("")
  const [name_valid,setName_valid]=useState("")
  const [userID_status,set_userID_status]=useState("");
  const [contact_status,set_contact_status]=useState("");
  const [grade_status,set_grade_status]=useState("")
  const [tabledata_validity,setTabledatavalidity]=useState([]);
  const dynamic_roles_dropdown=useRef([]);
  const [is_role_selected,setIs_role_selected]=useState(new Array(7).fill(false))
  const [is_row_filled, setIs_row_filled]= useState([]);
  const [trash,setTrash]=useState(0);
  const [tableerr, setTableerr]=useState();
  const [indexx, setIndexx]=useState()
  const [prev_role_selection,setPrev_role_selection]=useState("");




  useEffect(()=>{
    
      
    const updatedd=is_role_selected.map((item,ind)=>ind===indexx?false:item)
    console.log(updatedd)
   setIs_role_selected(updatedd)
    
},[indexx])
  useEffect(() => {
    getDropdown();
    
  }, []);

  // useEffect(()=>{
    
  // })

  useEffect(()=>{
    
    setAssociate_id_valid("is-invalid")  
    set_userID_status("⚠ Please enter a valid Zensar Associate ID")
    setEmail("");
    setEmail_valid("");
    setName_valid("");
    setAssociate_name("");
    fetchUser()
            
  },[UserID])

  


  useEffect(() => {
    const timer = setTimeout(() => {
      setErr("");
    }, 8000);
    return () => clearTimeout(timer);
  }, [Err]);

  useEffect(() => {
    const timer = setTimeout(() => {
      set_grade_status("");
    }, 8000);
    return () => clearTimeout(timer);
  }, [grade_status]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setTableerr("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [tableerr]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess("");
    }, 8000);
    return () => clearTimeout(timer);
  }, [Success]);



  async function fetchUser() {
    try {
      const UserData = await fetch(
        `http://localhost:8000/addpanel/${UserID}`,
      );
      const data = await UserData.json();

      setEmail(data[0].email);
      setAssociate_name(data[0].name);

      if(UserData.status==200)
          {
            setAssociate_id_valid("is-valid")
            setEmail_valid("is-valid")
            setName_valid("is-valid")
            set_userID_status("")
            
            
          }
          
          else if(UserData.status==400)
          {
            setAssociate_id_valid("is-invalid")
          }

          

      //console.log(Email);
    } catch (err) {
      console.log(err);
    }
  }

  function populate_dropdown(array_list) {
    const dropdownItems = array_list.map((role) => {
      return (
        <option
          key={role}
          value={role}>
          {role}
        </option>
      );
    });
    return dropdownItems;
  }

  function populate_dropdown_role(array_list) {
    const dropdownItems = array_list.map((role, index) => {
      return (
        <option
          key={role}
          value={role}
          disabled={is_role_selected[index]}
          >
          {role}
        </option>
      );
    });
    return dropdownItems;
  }

  async function getDropdown() {
    try {
      const dropdown_response = await fetch(
        `http://localhost:8000/addpanel`,
      );
      const data = await dropdown_response.json();
      console.log(data);
      setGrades(data.grades);
      setType(data.types);
      setRoles(data.roles);
      dynamic_roles_dropdown.current=data.roles;
      
      
      //console.log(data.types);
    } catch (err) {
      console.log(err);
    }
  }

  function Get_panel_data(e) {
    const tempdata = panel_info.current;
    let property = String(e.target.id);
    if (property === "associate_id") {
      setUserID(e.target.value);
      tempdata[`${property}`] = e.target.value;
    } else if (property === "email") {
      setEmail(e.target.value);
      tempdata[`${property}`] = e.target.value;
    } else if (property === "associate_name") {
      setAssociate_name(e.target.value);
      tempdata[`${property}`] = e.target.value;
    } else if (property === "activate") {
      tempdata[`${property}`] = e.target.checked;
    } else if(property === "contact")
    {
      
      tempdata[`${property}`] = e.target.value;
      
      if(Number(e.target.value)>=1000000000 && Number(e.target.value) <=9999999999)
      {
          setContact_valid("")
          set_contact_status("")
      }
      else{
        setContact_valid("is-invalid")
        set_contact_status("⚠ Please enter a valid contact number")
      }
      
    }
    else if(property==="grade")
    {
      set_grade_status("");
      tempdata[`${property}`] = e.target.value;

    }
    else {
      tempdata[`${property}`] = e.target.value;
    }

    //console.log(tempdata[`${property}`]);
    panel_info.current = tempdata;

    panel_info.current.associate_name = Associate_name;
    panel_info.current.email = Email;
    panel_info.current.roles_array = tableData;
    if(panel_info.current.email=="")
    
    console.log(panel_info);
  }

  function handleCancel() {
    navigate("/panelList")
  }

  async function submitData(e) {
    e.preventDefault();
    panel_info.current.created_by = "";
    panel_info.current.roles_array = tableData;
    if(tableData[tableData.length-1].interviewType=="")
    {
        setTableerr("⚠ Please select a role and interview type")
        return;
    }
    if(panel_info.current.email=="")
    {
      set_userID_status("⚠ Invalid Associate ID")
      document.getElementById("associate_id").focus();
      return;
      
    }
    if(panel_info.current.grade=="")
    {
      document.getElementById("grade").focus();
      set_grade_status("⚠ Please select a grade")
      return;
    }
    

    
    const panel_response = await fetch(
      `http://localhost:8000/addpanel`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(panel_info),
      },
    );
    const response = await panel_response.json();
    if (panel_response.status == "200") {
      //ssetSuccess("Panel Added Successfully");
      toast.success("Panel Added Successfully")
    } else if (panel_response.status == "500") { 
      console.log(response);
      // set_userID_status("⚠ "+response.err);
      toast.error("User Already exists as panel",{autoClose:1000})


      console.log("status code 500");
    } else {
      //console.log(panel_response)
      return setErr(
        `Invalid Data entered`,
      );
    }
  }

  function refreshDataRole(e, index) {
    if(e.target.value!==prev_role_selection)
    {
      const prev_index=Roles.indexOf(prev_role_selection);
      const temp=is_role_selected
      temp[prev_index]=false;
      // .map((item, i)=>i===prev_index?false:item);
      setIs_role_selected(temp);

      setPrev_role_selection(e.target.value);
      
    }
    

    const ind=Roles.indexOf(e.target.value)
    const updated=is_role_selected.map((item, i)=>i===ind?true:item)
    setIs_role_selected(updated)
   // setIndexx(Roles.indexOf(prevSelected[index]))
    let temp = tableData;
    temp.map((item, i) => {
      if (i === index) {
        item.role = e.target.value;
      }
    });
    setTableData([...temp]);
    setPrev_role_selection(e.target.value);


  }

  function deleteRow(e, id, item) {
    let button_id=e.target.id;

     if (tableData.length !== 1) {
      let updated =is_role_selected;
      updated[Roles.indexOf(item)]=false
      console.log(item)
      console.log(updated)
      setIs_role_selected(updated)
       let temp = tableData;
       temp.splice(tableData.findIndex((x)=>x.id===id), 1);
       setTableData([...temp]);
       let temparr=is_row_filled
       temparr.shift();
       setIs_row_filled(temparr)
      
    }
  }

  function refreshDataIntType(e, i) {
    let temp = tableData;
    temp = temp.map((item, index) => {
      if (i === index) {
        item.interviewType = e.target.value;
      }
      return item;
    });
    setTableData([...temp]);


  }

  function refreshDataActive(e, index) {
    let temp = tableData;
    temp = temp.map((item, i) => {
      if (i === index) {
        item.isActive = e.target.checked;
      }
    });
  }

  function addNewRole(value) {

    // let temp_role_array=[];
    
    // for(let x of Roles)
    // {
    //   temp_role_array.push(x);
    // }
    
    
    // for(let x of tableData)
    // {
      
    //   let already_selected_roles=x.role;
    //   console.log(already_selected_roles);
    //   let index_ToBeDeleted=temp_role_array.findIndex((e)=>{return e==already_selected_roles});
    //   temp_role_array.splice(index_ToBeDeleted,1);    
    // }
    // dynamic_roles_dropdown.current=temp_role_array;
    // console.log(temp_role_array)
    //setTrash(trash++);

    if(!value){
      setTableerr(" ⚠ Please select a role")
      return;
    }
    setTableData([
      ...tableData,
      { role: "", interviewType: "", isActive: true,id:Math.random().toString()  },
    ]);
    setPrev_role_selection("");
    
    setIs_row_filled([...is_row_filled,true])
  }

  useEffect(() => {
    console.log(tableData)
  }, [tableData]);

  return (
    <div className='p-2'>
      <NavBar />
      <div className='container-wrap px-1'>
        <div className='row'>
          <div className='col-md-12 '>
            <h2>Add Panel </h2>

            {/* <h6 style={{ color: "green" }}>{Success}</h6> */}
          </div>
        </div>
        <form onSubmit={submitData}>
          <div className='container-wrap'>
            <div className='row mb-3'>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder  '
                    for=''>
                    Associate ID
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className={`form-control ${associate_id_valid}`}
                    placeholder='Enter Associate ID'
                    id='associate_id'
                    maxLength='7'
                    // minLength='7'
                    onChange={(e) => {
                      Get_panel_data(e);
                    }}
                    // required
                  />                     
                  <div style={{color:"brown"  ,fontSize:"10 px" }}> {userID_status}</div>
                </div>
              </div>
                    
              <div className='col-sm-1'></div>

              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder '
                    for='username'>
                    Name
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group '>
                  <input
                    type='text'
                    className={`form-control `}
                    placeholder='Enter Associate Name'
                    id='associate_name'
                    defaultValue={Associate_name}
                    onChange={(e) => {
                      Get_panel_data(e);
                    }}
                    maxLength='50'
                    required
                    disabled
                  />
                </div>
              </div>
            </div>


            <div className='row mb-3'>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder  '
                    for='userid'>
                    Email
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <input
                    type='email'
                    className={`form-control  `}
                    placeholder='Enter Email'
                    id='email'
                    defaultValue={Email}
                    onChange={(e) => {
                      Get_panel_data(e);
                    }}
                    // required
                    maxLength='50'
                    disabled
                  />
                
                </div>
              </div>

              <div className='col-sm-1'></div>

              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder '
                    for='username'>
                    Contact
                  </label>
                </div>
              </div>
              <div className='col-md-4'> 
                <div className='form-group '>
                  <input
                    type='text'
                    className={`form-control ${contact_valid}`}
                    placeholder='Enter Contact'
                    id='contact'
                    maxLength='10'
                    minLength='10'
                    // required
                    onChange={(e) => {
                      Get_panel_data(e);
                    }}
                  />
           <div style={{color:"brown"  ,fontSize:"10 px" }}> {contact_status}</div>

                </div>
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder  '
                    for='userid'>
                    Grade
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <select
                    id='grade'
                    className='form-select'
                    aria-label='Select Grade'
                    onChange={(e) => {
                      Get_panel_data(e);
                    }}
                    // required
                    >
                    <option value=''>Select Grade</option>
                    {populate_dropdown(Grades)}
                  </select>
                  <div style={{color:"brown"  ,fontSize:"10 px" }}> {grade_status}</div>
                </div>
              </div>

              <div className='col-sm-1'></div>

              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder '
                    for='username'>
                    Activate
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group '>
                  <div className='form-check form-switch form-switch-md'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='activate'
                      onChange={(e) => {
                        Get_panel_data(e);
                      }}
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <h6 style={{ color: "red" }}>{Err}</h6> */}
            
          </div>
          <div style={{ marginTop: "40px" }}>
            <h4>List of roles panel can interview : </h4>

            <table className='table table-light table-striped'>
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
                {tableData.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <div>
                          <select
                            defaultValue={item.role}
                            onChange={(e) => {
                              refreshDataRole(e, index);
                            }}
                            value={item.role}
                              disabled={is_row_filled[index]}
                            className='form-select'
                            // required
                            >
                            <option value=''>
                              Select Role
                            </option>
                            {populate_dropdown_role(dynamic_roles_dropdown.current)}
                          </select>
                        </div>
                      </td>
                      <td>
                        <div>
                          <select
                            defaultValue={
                              item.interviewType
                            }
                            onChange={(e) => {
                              refreshDataIntType(e, index);
                            }}
                            className='form-select'
                            // required
                            >
                            <option value=''>
                              Select Interview type
                            </option>
                            {populate_dropdown(Types)}
                          </select>
                        </div>
                      </td>
                      <td>
                        <div className='form-check form-switch'>
                          <input
                            onChange={(e) => {

                              refreshDataActive(e, index);
                            }}
                            className='form-check-input mt-2'
                            type='checkbox'
                            data-testid='checkbox'
                            role='switch'
                            id='isActive'
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        {index + 1 != tableData.length ? (
                          <></>
                        ) : (
                          <button
                            type='button'
                            className='btn btn-primary col-10'
                            onClick={(e)=>{addNewRole(item.role)}}>
                            Add New Role
                          </button>
                        )}
                      </td>
                      <td>
                        <BsTrashFill
                        // id={`trash+${trash}`}
                        id={item.id}
                          onClick={(e) => {
                        
                            deleteRow(e, item.id, item.role);
                          }}
                          className='text-primary mt-2'
                          style={{ scale: "1.5" }}>
                          delete
                        </BsTrashFill>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              
            </table>
            <div class="mb-2" style={{color:"brown"  ,fontSize:"10 px" }}> {tableerr}</div>
            <button
              style={{ marginRight: "20px" }}
              type='submit'
              className='btn btn-primary'>
              Submit
            </button>
            <button
              className='btn btn-primary'
              onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default AddPanelIG;
