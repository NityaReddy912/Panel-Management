import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// import Headers from "../../Components/Utils/Headers";\
import { BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

function UpdateFeedback() {
  const { id } = useParams();
  const [tableData, setTableData] = useState([
    { Skill_Name: "", Rating: "", Skill_Remark: "" },
  ]);

  const [Skill_Name, setSkill_Name] = useState();
  const [remark, setRemark] = useState();
  const [Rating, setRating] = useState();
  const [Skill_Remark, setSkill_Remark] = useState();
  const [candidate_name, setCandidatename] = useState();
  const [experience, setExperience] = useState();
  const [role, setRole] = useState();
  const [interviewtype, setInterviewtype] = useState();
  const [panelid, setPanelid] = useState();
  const [feedback_id, setFeedbackid] = useState();
  const [panelName, setPanelname] = useState();
  const [candidateStatusId, setCandidateStatusId] =
    useState("");
  const [candidateId, setCandidateId] = useState("");
  const [selected, setSelected] = useState(true);
  const [interviewStatusId, setInterviewStatusId] =
    useState("");
  console.log(selected);
  const handleCancel = (e) => {
    e.preventDefault();
    setSkill_Name("");
    setRating("");
    setSkill_Remark("");
  };

  useEffect(() => {
    fetch(
      `http://localhost:9000/feedbackRouter/searchFeedbackEdit/${id}`,
      {
        method: "GET",
      },
    )
      .then((res) => res.json())
      .then((data, err) => {
        if (err) {
          console.log(err);
          return;
        }
        const temp = data.Interview[0];
        console.log(temp);
        console.log(
          temp?.candidate[0]?.candidate_status_id,
        );
        setInterviewStatusId(temp.interview_status_id);
        setCandidatename(temp?.candidate[0].candidate_name);
        setCandidateStatusId(
          temp?.candidate[0]?.candidate_status_id,
        );
        setCandidateId(temp?.candidate[0]?.id);
        setExperience(
          temp?.candidate[0].it_experience_years,
        );
        setRole(temp?.candidate[0].role);
        setInterviewtype(temp?.interview_type[0].type);
        setPanelid(temp?.panels[0].id);
        setFeedbackid(temp?.feedback_id);
        setPanelname(temp?.users[0].name);
      });
  }, []);

  // function handlereset() {
  //   window.history.back();
  // }
  function refreshDataSkill_Name(e, index) {
    let temp = tableData;
    temp.map((item, i) => {
      if (i === index) {
        item.Skill_Name = e.target.value;
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

  function refreshDataRating(e, i) {
    let temp = tableData;
    temp = temp.map((item, index) => {
      if (i === index) {
        item.Rating = e.target.value;
      }
      return item;
    });
    setTableData([...temp]);
  }
  function refreshDataSkill_Remark(e, i) {
    let temp = tableData;
    temp = temp.map((item, index) => {
      if (i === index) {
        item.Skill_Remark = e.target.value;
      }
      return item;
    });
    setTableData([...temp]);
  }
  function addNewRole() {
    setTableData([
      ...tableData,
      { Skill_Name: "", Rating: "", Skill_Remark: "" },
    ]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(panelName);
    if (parseInt(Rating) <= 0) {
      return toast.error("Please fill valid rating");
    }
    if (
      !remark ||
      !Rating ||
      !Skill_Remark ||
      !Skill_Name
    ) {
      return toast.error("Please fill in all the fields");
    }
    let statusUpdated;

    if (selected) {
      statusUpdated = {
        updatedStatus: candidateStatusId + 2,
      };
    } else {
      statusUpdated = {
        updatedStatus: candidateStatusId + 1,
      };
    }

    console.log(selected);

    const result = await fetch(
      `http://localhost:9000/feedbackRouter/addfeedback/${feedback_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Skills: tableData,
          created_by: panelName,
        }),
      },
    );
    const data = await result.json();
    console.log(interviewStatusId);
    if (result.status === 409) {
      return toast.error("Feedback Already Exits", {
        autoClose: 1000,
      });
    }
    if (result.status === 200) {
      toast.success("Feedback added susseccfully", {
        autoClose: 1000,
      });
      const result1 = await fetch(
        `http://localhost:9000/feedbackRouter/updateremark/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remark: remark,
            updated_by: panelName,
          }),
        },
      );
      const interviewStatus = await fetch(
        `http://localhost:9000/interview-type/${interviewStatusId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Conducted" }),
        },
      );

      const status = await fetch(
        `http://localhost:7000/update/status/${candidateId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(statusUpdated),
        },
      );
      const statusData = await status.json();
      console.log(statusData);

      const interviewStatusData =
        await interviewStatus.json();
      console.log(interviewStatusData);
      if (result1.status === 200)
        return toast.success("Remark added susseccfully", {
          autoClose: 1000,
        });
    }
    console.log(result);

    setSkill_Name("");
    setRating("");
    setSkill_Remark("");
    console.log(tableData[0]);
  };

  return (
    <div className='p-2'>
      <div className='App'>{/* <Headers /> */}</div>
      <div className='container-wrap px-2'>
        <h2 className='mb-4 '>Feedback Form</h2>

        <form>
          <div className='row mb-3  px-2'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder  '
                  htmlFor='first'>
                  Candidate Name
                </label>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control responsive'
                  value={candidate_name}
                  disabled
                  placeholder='Candidate Name'
                />
              </div>
            </div>
            <div className='col-sm-1'></div>
            <div className='col-md-1'>
              <div className='form-group '>
                <label
                  className='fw-bolder '
                  htmlFor='first'>
                  Experience
                </label>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='form-group '>
                <input
                  type='text'
                  className='form-control responsive'
                  value={experience}
                  disabled
                  placeholder='Experience'
                  // value={experience}
                  //   onChange={(e) => setExperience(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='row mb-3 px-2'>
            <div className='col-md-1 '>
              <div className='form-group'>
                <label
                  className='fw-bolder '
                  htmlFor='first'>
                  Role
                </label>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='form-group '>
                <input
                  type='text'
                  value={role}
                  className='form-control responsive'
                  disabled
                  // value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  placeholder='Role'
                />
              </div>
            </div>

            <div className='col-sm-1'></div>
            <div className='col-md-1'>
              <div className='form-group '>
                <label
                  className='fw-bolder '
                  htmlFor='first'>
                  Interview Type
                </label>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='form-group '>
                <input
                  type='text'
                  value={interviewtype}
                  className='form-control responsive'
                  disabled
                  placeholder='Interview Type'
                />
              </div>
            </div>
          </div>

          <div className='row mb-3 px-2'>
            <div className='col-md-1 '>
              <div className='form-group '>
                <label
                  className='fw-bolder '
                  htmlFor='first'>
                  Panel Id
                </label>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='form-group '>
                <input
                  type='text'
                  value={panelid}
                  className='form-control responsive'
                  disabled
                  placeholder='Panel Id'
                />
              </div>
            </div>

            <div className='col-sm-1'></div>
            <div className='col-md-1'>
              <div className='form-group '>
                <label
                  className='fw-bolder  '
                  htmlFor='first'>
                  Panel Name
                </label>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='form-group '>
                <input
                  type='text'
                  className='form-control responsive'
                  value={panelName}
                  disabled
                  placeholder='Panel Name'
                />
              </div>
            </div>
          </div>

          <div className='row g-3 px-2'>
            <div className='col-sm-1'>
              <label className='mt-1 fw-bolder me-5 '>
                Status
              </label>
            </div>
            <input
              className='form-check-input ms-3 mt-4'
              type='radio'
              value={selected}
              onChange={(e) => setSelected(true)}
              name='flexRadioDefault'
              id='flexRadioDefault1'
            />
            <div className='col-sm-1'>
              <label className='mt-1  '>Selected</label>
            </div>
            <input
              className='form-check-input mt-4 px-2 '
              type='radio'
              value={selected}
              onChange={(e) => setSelected(false)}
              name='flexRadioDefault'
              id='flexRadioDefault1'
            />
            <div className='col-sm-1'>
              <label className='mt-1'>Rejected</label>
            </div>
          </div>

          <div className='row fw-bolder px-2 '>
            <label className='col-md-1 '>Remarks</label>
            <div className='col-md-3'>
              <div className='form-group'>
                <textarea
                  className='form-control'
                  value={remark}
                  onChange={(e) => {
                    setRemark(e.target.value);
                  }}
                  placeholder='Enter Remarks'
                  id='Skill_Remark'></textarea>
              </div>
            </div>
          </div>
          <div className='table-row fw-bolder mt-2 '>
            <label>
              <h5>List Of Skills</h5>
            </label>
          </div>

          <table className='table table-light table-striped'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Skills</th>
                <th scope='col'>Rating(0-10)</th>
                <th scope='col'>Remark</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <div>
                        <input
                          type='text'
                          value={Skill_Name}
                          onChange={(e) => {
                            refreshDataSkill_Name(e, index);
                          }}
                          className='form-control'
                          placeholder='Enter Skill_Name'
                        />
                      </div>
                    </td>
                    <td>
                      <i class='fas fa-dollar-sign trailing maxlength-10'></i>
                      <input
                        type='number'
                        value={Rating}
                        onChange={(e) => {
                          refreshDataRating(e, index);
                        }}
                        className='form-control '
                        placeholder='Enter Rating'
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        value={Skill_Remark}
                        onChange={(e) => {
                          refreshDataSkill_Remark(e, index);
                        }}
                        className='form-control'
                        placeholder='Enter Skill_Remark'
                      />
                    </td>
                    <td>
                      {index + 1 != tableData.length ? (
                        <></>
                      ) : (
                        <button
                          type='button'
                          className='btn btn-primary btn-md col-10'
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
          <div className='row addList__button'>
            <div className='col-md-1 ms-2'>
              <button
                type='submit'
                onClick={handleSubmit}
                className='btn btn-primary'
                data-testid='submit'>
                Submit
              </button>
            </div>
            <div className='col-md-2 ms-5'>
              <button
                onClick={handleCancel}
                className='btn btn-primary'
                type='button'
                data-testid='button'>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateFeedback;
