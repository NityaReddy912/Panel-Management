import React, {
  createElement,
  useEffect,
  useRef,
  useState,
} from "react";
import "./addPanel.css";
import { BsTrashFill } from "react-icons/bs";
import NavBar from "../../Utils/Headers";

//remaining task: dynamic dropdown menus, error messages reflected , input field validation

function AddPanel() {
  const [tableData, setTableData] = useState([
    { role: "", interviewType: "", isActive: true },
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

  useEffect(() => {
    getDropdown();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [UserID]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErr("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [Err]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess("");
    }, 5000);
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
    } else {
      tempdata[`${property}`] = e.target.value;
    }

    //console.log(tempdata[`${property}`]);
    panel_info.current = tempdata;

    panel_info.current.associate_name = Associate_name;
    panel_info.current.email = Email;
    panel_info.current.roles_array = tableData;

    console.log(panel_info);
  }

  function handlereset() {
    window.history.back();
  }

  async function submitData(e) {
    e.preventDefault();
    panel_info.current.created_by = "";
    panel_info.current.roles_array = tableData;
    // for(let y in tableData)
    // {
    //     if(tableData[y].role=="" || tableData[y].interviewType=="")
    //     {
    //         return setErr("Roles cannot be empty")
    //     }
    // }

    for (let x in panel_info.current) {
      if (panel_info.current.x == "") {
        setErr("Please Fill all the fields");
        return;
      }
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
      setSuccess("Panel Added Successfully");
    } else if (panel_response.status == "500") {
      console.log(response);
      setErr(response.err);

      console.log("status code 500");
    } else {
      //console.log(panel_response)
      return setErr(
        `Please enter a 10 didgit contact number`,
      );
    }
  }

  function refreshDataRole(e, index) {
    let temp = tableData;
    temp.map((item, i) => {
      if (i === index) {
        item.role = e.target.value;
      }
    });
    setTableData([...temp]);
  }

  function deleteRow(e, index) {
    if (index != 0) {
      let temp = tableData;
      temp.splice(index, 1);
      setTableData([...temp]);
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

  function addNewRole() {
    setTableData([
      ...tableData,
      { role: "", interviewType: "", isActive: true },
    ]);
  }

  useEffect(() => {
    console.log(tableData);
  }, [tableData]);

  return (
    <div className='p-2'>
      <NavBar />
      <div className='container-wrap px-1'>
        <div className='row'>
          <div className='col-md-12 '>
            <h2>Add Panel </h2>

            <h6 style={{ color: "green" }}>{Success}</h6>
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
                    className='form-control'
                    placeholder='Enter Associate ID'
                    id='associate_id'
                    maxLength='7'
                    minLength='7'
                    onChange={(e) => {
                      Get_panel_data(e);
                    }}
                    required
                  />
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
                    className='form-control'
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
                    className='form-control'
                    placeholder='Enter Email'
                    id='email'
                    defaultValue={Email}
                    onChange={(e) => {
                      Get_panel_data(e);
                    }}
                    required
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
                    className='form-control'
                    placeholder='Enter Contact'
                    id='contact'
                    maxLength='10'
                    minLength='10'
                    required
                    onChange={(e) => {
                      Get_panel_data(e);
                    }}
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
                    required>
                    <option value=''>Select Grade</option>
                    {populate_dropdown(Grades)}
                  </select>
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
            <h6 style={{ color: "red" }}>{Err}</h6>
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
                            className='form-select'
                            required>
                            <option value=''>
                              Select Role
                            </option>
                            {populate_dropdown(Roles)}
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
                            required>
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
                            onClick={addNewRole}>
                            Add New Role
                          </button>
                        )}
                      </td>
                      <td>
                        <BsTrashFill
                          onClick={(e) => {
                            deleteRow(e, index);
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
            <button
              style={{ marginRight: "20px" }}
              type='submit'
              className='btn btn-primary'>
              Submit
            </button>
            <button
              className='btn btn-primary'
              onClick={handlereset}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPanel;
