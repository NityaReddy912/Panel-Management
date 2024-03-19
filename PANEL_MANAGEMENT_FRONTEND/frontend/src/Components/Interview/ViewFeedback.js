import React, { useEffect, useState, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Headers from "../Utils/Headers";
import "./interview.scss";

function ViewFeedback() {
  const [Candidate_Name, setCandidate_Name] = useState("");
  const [Experience, setExperience] = useState("");
  const [Role, setRole] = useState("");
  const [Interveiw_Type, setInterveiw_Type] = useState("");
  const [Panel_Name, setPanel_Name] = useState("");
  const [Panel_ID, setPanel_ID] = useState("");
  const [Remark, setRemark] = useState("");
  const [Status, setStatus] = useState(true);
  const [skillList, setskillList] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `http://localhost:9000/feedbackRouter/searchFeedback/${id}`,
    )
      .then((res) => res.json())

      .then((data, err) => {
        console.log(data);
        if (err) {
          console.log(err);

          return;
        }
        console.log(data.feedbackform.Skills);
        const temp = data.feedbackform.Skills;

        const inter = data.Interview[0];

        console.log("1 : " + temp);

        console.log("2 : " + inter);

        console.log(inter.interview_type[0].type);

        setCandidate_Name(
          inter.candidate[0].candidate_name,
        );

        setExperience(
          inter.candidate[0].it_experience_years,
        );

        setInterveiw_Type(inter.interview_type[0].type);

        setPanel_ID(inter.panels[0].id);

        setPanel_Name(inter.users[0].name);

        setRemark(inter.remark);

        setStatus(temp.Status);

        setRole(inter.roles[0].role_name);

        setskillList(temp);
      });
  }, [id]);
  console.log(skillList);
  const handleCancel = () => {
    navigate("/interview-list");
  };

  return (
    <div className='wrapper'>
      <Headers />
      <div className='container-wrap m-3 ms-3 my-2'>
                 
        <h2 className='searchHead'>View Feedback Form</h2> 
           
      </div>
      <div className='container-wrap m-3 ms-3 my-1 '>
        <form>
          <div className='row mt-4'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Candidate Name
                </label>
              </div>
            </div>

            <div className='col-md-5'>
              <div className='form-group '>
                <input
                  type='text'
                  value={Candidate_Name}
                  className='form-control ms-4 width:25rem font-size:0.9rem'
                  placeholder='Candidate Name'
                  id='cname'
                  disabled
                />
              </div>
            </div>

            {/* <div className="col-sm-1"></div> */}

            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Experience
                </label>
              </div>
            </div>

            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  value={Experience}
                  className='form-control ms-4 width:25rem font-size:0.9rem'
                  placeholder='Experience'
                  id='experience'
                  disabled
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Role
                </label>
              </div>
            </div>

            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  value={Role}
                  className='form-control ms-4 width:25rem font-size:0.9rem'
                  placeholder='Role'
                  id='role'
                  disabled
                />
              </div>
            </div>

            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Interview Type
                </label>
              </div>
            </div>

            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  value={Interveiw_Type}
                  class='form-control ms-4 width:25rem font-size:0.9rem'
                  placeholder='Interview Type'
                  id='itype'
                  disabled
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder '
                  htmlFor='first'>
                  Panel Id
                </label>
              </div>
            </div>

            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  value={Panel_ID}
                  className='form-control ms-4 width:25rem font-size:0.9rem'
                  placeholder='Panel Id'
                  id='pId'
                  disabled
                />
              </div>
            </div>

            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder '
                  htmlFor='first'>
                  Panel Name
                </label>
              </div>
            </div>

            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  value={Panel_Name}
                  className='form-control ms-4 width:25rem font-size:0.9rem'
                  placeholder='Panel Name'
                  id='pName'
                  disabled
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Status
                </label>
              </div>
            </div>

            <div className='col-md-1'>
              <div className='form-check form-check-inline ms-4'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='inlineRadioOptions'
                  id='inlineRadio1'
                  value='Status'
                  checked={Status === true}
                  disabled
                />

                <label
                  className='form-check-label '
                  hmlFor='inlineRadio1'>
                  Selected
                </label>
              </div>
            </div>

            <div className='col-md-1'>
              <div className='form-check form-check-inline ms-4'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='inlineRadioOptions'
                  id='inlineRadio1'
                  value='option1'
                  checked={Status === false}
                  disabled
                />

                <label
                  className='form-check-label'
                  htmlFor='inlineRadio1'>
                  Rejected
                </label>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Remark
                </label>
              </div>
            </div>

            <div className='col-md-5'>
              <div className='form-group'>
                <textarea
                  className='form-control ms-4'
                  value={Remark}
                  placeholder='Enter Remark'
                  id='remark'
                  disabled></textarea>
              </div>
            </div>
          </div>

          <div className='row'>
            <h5 className='p-0 mt-4'>List of skills</h5>
          </div>

          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th scope='col'>#</th>

                <th scope='col'>Skill</th>

                <th scope='col'>Rating(1-10)</th>

                <th scope='col'>Remark</th>
              </tr>
            </thead>

            <tbody>
              {skillList?.map((Skills, index) => (
                <tr>
                  <th scope='row'>{index + 1}</th>

                  <td>
                    <div class='form-group'>
                      <input
                        type='text'
                        value={Skills.Skill_Name}
                        class='form-control'
                        placeholder='Enter Skills'
                        id='skills'
                        disabled
                      />
                    </div>
                  </td>

                  <td>
                    <div class='form-group'>
                      <input
                        type='text'
                        value={Skills.Rating}
                        class='form-control'
                        placeholder='Enter Ratings'
                        id='rating'
                        disabled
                      />
                    </div>
                  </td>

                  <td>
                    <div class='form-group'>
                      <input
                        type='text'
                        value={Skills.Skill_Remark}
                        class='form-control'
                        placeholder='Enter Remark'
                        id='rating'
                        disabled
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='row'>
            <div className='col-md-2'>
              <button
                onClick={handleCancel}
                className='btn btn-primary'>
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewFeedback;
