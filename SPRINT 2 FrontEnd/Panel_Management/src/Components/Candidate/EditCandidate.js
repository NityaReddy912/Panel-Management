import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import "./add.css";
import "./number.css";
import Headers from "../Utils/Headers";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const EditCandidate = () => {
  const CandidateName = useRef(HTMLInputElement);
  const Role = useRef(HTMLInputElement);
  const Email = useRef(HTMLInputElement);
  const Contact = useRef(HTMLInputElement);
  const PAN = useRef(HTMLInputElement);
  const Experience = useRef(HTMLInputElement);
  const [cid, setCid] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [rolesErr, setRolesErr] = useState("");
  const [contactErr, setContactErr] = useState("");
  const [panErr, setPanErr] = useState("");
  const [experienceErr, setExperienceErr] = useState("");
  const [err, setErr] = useState(false);
  // const status = useRef(HTMLInputElement);
  const [skillGroup, setSkillGroup] = useState("");
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let isApiSubscribed = true;

    const getSkillGroup = async () => {
      const roleListResponse = await fetch(
        `http://localhost:5000/skill-group/all`,
        {
          headers: {
            "x-access-token":
              window.sessionStorage.getItem("token"),
          },
        },
      );

      const roleListData = await roleListResponse.json();
      console.log(roleListData);

      setSkillGroup(roleListData);
    };

    if (isApiSubscribed) {
      getSkillGroup();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, []);

  const handleCancel = (e) => {
    navigate("/candidate");
    e.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setNameErr("");
    setEmailErr("");
    setRolesErr("");
    setContactErr("");
    setPanErr("");
    setExperienceErr("");

    if (!CandidateName) {
      setNameErr("Please enter Candidate Name");
      return;
    }

    if (!Email) {
      setEmailErr("Please enter email");
    }

    if (!Contact) {
      setContactErr("Please enter contact");
    }

    if (!Role) {
      setRolesErr("Please enter Role");
    }

    if (!PAN) {
      setPanErr("Please enter PAN");
    }

    if (!Experience) {
      setExperienceErr("Please enter Experience");
    }
    const result = await fetch(
      `http://localhost:7000/updateCandidate/${id}`,
      {
        method: "PUT",
        headers: {
          "x-access-token":
            window.sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate_name: CandidateName.current.value,
          email: Email.current.value,
          contact: Contact.current.value,
          role: Role.current.value,
          pan: PAN.current.value,
          it_experience_years: Experience.current.value,
          //  "status": status.current.value
        }),
      },
    );

    const data = await result.json();
    console.log(result);
    console.log(data);
    toast.success("Candidate Updated successfully");
  };

  useEffect(() => {
    fetch(`http://localhost:7000/getbyid/${id}`, {
      method: "GET",
      headers: {
        "x-access-token":
          window.sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data, err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
        const temp = data.usersList;
        CandidateName.current.value = temp.candidate_name;
        Email.current.value = temp.email;
        Role.current.value = temp.role;
        PAN.current.value = temp.pan;
        Contact.current.value = temp.contact;
        Experience.current.value = temp.it_experience_years;
        setCid(temp.id);
        //  status.current.value=temp.status;
      });
  }, [id]);

  return (
    <div className='wrapper'>
      <Headers />
      <div className='container-wrap p-3'>
        <h2 className='mb-4 px-2'>Edit Candidate</h2>
        <form className='px-2'>
          <div className='row mb-4'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Candidate ID
                </label>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  //placeholder={x}
                  //ref = {cid}
                  value={cid}
                  disabled
                />
                {nameErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />
                    {nameErr}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='row mb-4 '>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Candidate Name
                </label>
              </div>
            </div>
            <div className='col-md-4 ms-2'>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  onChange={(e) => {
                    setDisabled(false);
                  }}
                  placeholder='Enter Candidate Name'
                  ref={CandidateName}
                />
              </div>
            </div>
            <div className='col-sm-1'></div>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
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
                  onChange={(e) => {
                    setDisabled(false);
                  }}
                  ref={Email}
                  pattern='[a-zA-Z0-9]+@[a-zA-Z]+.com'

                  // pattern="[0-9]{10}"
                />
              </div>
            </div>
          </div>
          <div className='row mb-4'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Contact
                </label>
              </div>
            </div>
            <div className='col-md-4 ms-2'>
              <div className='form-group'>
                <input
                  type='tel'
                  className='form-control'
                  onChange={(e) => {
                    setDisabled(false);
                  }}
                  placeholder='Enter contact number'
                  ref={Contact}
                  minLength={10}
                  maxLength={10}
                  pattern='[0-9]{10}'
                />
              </div>
            </div>
            <div className='col-sm-1'></div>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Role
                </label>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <select
                  id='select'
                  className='form-select'
                  aria-label='Select Role'
                  onChange={(e) => {
                    setDisabled(false);
                  }}
                  ref={Role}>
                  <option defaultValue=''>
                    Select Role
                  </option>
                  {skillGroup &&
                    skillGroup.map(
                      ({ candidate_roles }) => (
                        <option value={candidate_roles}>
                          {candidate_roles}
                        </option>
                      ),
                    )}{" "}
                </select>
              </div>
            </div>
          </div>
          <div className='row mb-4'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  PAN
                </label>
              </div>
            </div>
            <div className='col-md-4 ms-2'>
              <div className='form-group'>
                <input
                  type='text'
                  onChange={(e) => {
                    setDisabled(false);
                  }}
                  className='form-control'
                  placeholder='Enter PAN'
                  ref={PAN}
                  pattern='[A-Z]{5}[0-9]{4}[A-Z]{1}'
                />
              </div>
            </div>
            <div className='col-sm-1'></div>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Experience
                </label>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <input
                  type='number'
                  min='0'
                  className='form-control'
                  onChange={(e) => {
                    setDisabled(false);
                  }}
                  placeholder='Enter Number of years'
                  ref={Experience}
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-2 '>
              <button
                type='submit'
                disabled={disabled}
                className='btn btn-primary'
                onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <div className='col-md-2 '>
              <button
                className='btn btn-primary'
                onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCandidate;
