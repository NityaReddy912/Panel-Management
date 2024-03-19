import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import "./number.css";

import "./add.css";

import Headers from "../Utils/Headers";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const AddCandidate = () => {
  const [CandidateName, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("");
  const [Contact, setPhone] = useState("");
  const [PAN, setPan] = useState("");
  const [Experience, setExperience] = useState("");
  const [skillGroup, setSkillGroup] = useState([]);
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [rolesErr, setRolesErr] = useState("");
  const [contactErr, setContactErr] = useState("");
  const [panErr, setPanErr] = useState("");
  const [experienceErr, setExperienceErr] = useState("");
  const [err, setErr] = useState(false);

  // const [status, setStatus] = useState("");

  const navigate = useNavigate();

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
    e.preventDefault();
    setName("");
    setEmail("");
    setRole("");
    setPhone("");
    setPan("");
    setExperience("");
    // setStatus("");

    navigate("/candidate");
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

    if (
      CandidateName &&
      Email &&
      Contact &&
      Role &&
      PAN &&
      Experience
    ) {
      if (Contact.length !== 10) {
        setContactErr("Please Enter 10 digit Number");
      }
      const result = await fetch(
        "http://localhost:7000/addCandidate",

        {
          method: "POST",
          headers: {
            "x-access-token":
              window.sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            candidate_name: CandidateName,
            email: Email,
            contact: Contact,
            role: Role,
            pan: PAN,
            it_experience_years: Experience,
            // "status" : status
          }),
        },
      );

      const data = await result.json();

      const msg = JSON.stringify(data);

      console.log(data);

      if (result.status === 422) {
        return toast.error("Server Trashed");
      } else if (result.status === 500) {
        return setPanErr(
          `Invalid Registration ${data.message}`,
        );
      }

      if (result.status === 406) {
        return setEmailErr("Please fill valid email");
      }

      if (result.status === 405) {
        return setContactErr(
          "Please fill valid 10 digit number",
        );
      }
      if (result.status === 408) {
        return setExperienceErr(
          "Please enter valid experience in years",
        );
      }

      if (result.status === 403) {
        return setPanErr("Please fill valid PAN");
      }

      if (result.status)
        if (result.status === 200) {
          return toast.success(
            "Successfully Added the candidate",
          );
        }

      navigate("/");
      return;
    }
    console.log("Hi");
    setErr(true);
  };

  const handleContactChange = (e) => {
    setContactErr("");
    const contact = String(e.target.value);
    if (contact.length > 10) {
      return;
    }
    setPhone(e.target.value);
  };

  return (
    <div className='wrapper'>
      <Headers />

      <div className='container-wrap p-3'>
        <h2
          className='mb-4 px-2'
          id='addcandidate'>
          Add Candidate
        </h2>

        <form className='px-2'>
          <div className='row mb-4'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Candidate Name
                </label>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='form-group'>
                <input
                  type='text'
                  className={`form-control mx-4 ${
                    nameErr && "add__input"
                  }`}
                  placeholder='Enter Candidate Name'
                  value={CandidateName}
                  onChange={(e) => {
                    setNameErr("");
                    setName(e.target.value);
                  }}
                  minLength='3'
                />
                {nameErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />
                    {nameErr}
                  </p>
                )}
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
                  className={`form-control mx-4 ${
                    emailErr && "add__input"
                  }`}
                  placeholder='Enter Email'
                  value={Email}
                  onChange={(e) => {
                    setEmailErr("");
                    setEmail(e.target.value);
                  }}
                />
                {emailErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />
                    {emailErr}
                  </p>
                )}
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

            <div className='col-md-4'>
              <div className='form-group'>
                <input
                  type='number'
                  className={`form-control mx-4 ${
                    contactErr && "add__input"
                  }`}
                  placeholder='Enter Contact'
                  // inputMode="numeric"

                  value={Contact}
                  onChange={handleContactChange}
                  pattern='[0-9]{10}'
                />
                {contactErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />
                    {contactErr}
                  </p>
                )}
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
                  className={`form-select mx-4 ${
                    rolesErr && "add__input"
                  }`}
                  aria-label='Select Role'
                  value={Role}
                  onChange={(e) => {
                    setRolesErr("");
                    setRole(e.target.value);
                  }}>
                  <option value=''>Select Role</option>
                  {skillGroup &&
                    skillGroup.map(
                      ({ candidate_roles }) => (
                        <option value={candidate_roles}>
                          {candidate_roles}
                        </option>
                      ),
                    )}
                </select>
                {rolesErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />
                    {rolesErr}
                  </p>
                )}
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

            <div className='col-md-4'>
              <div className='form-group mx-4'>
                <input
                  type='text'
                  className={`form-control ${
                    panErr && "add__input"
                  }`}
                  placeholder='Enter PAN'
                  value={PAN}
                  minLength={10}
                  maxLength={10}
                  onChange={(e) => {
                    setPanErr("");
                    setPan(e.target.value.toUpperCase());
                  }}
                  pattern='[A-Z]{5}[0-9]{4}[A-Z]{1}'
                />
              </div>
              {panErr && (
                <p className={`mb-0 mx-4 add__warning`}>
                  <ExclamationTriangleIcon className='add__warningIcon' />
                  {panErr}
                </p>
              )}
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
                  className={`form-control mx-4 ${
                    experienceErr && "add__input"
                  }`}
                  placeholder='Enter Number of years'
                  value={Experience}
                  onChange={(e) => {
                    setExperienceErr("");
                    setExperience(e.target.value);
                  }}
                />
                {experienceErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />
                    {experienceErr}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-2 '>
              <button
                type='submit'
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

export default AddCandidate;
