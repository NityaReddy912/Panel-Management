import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import "./add.css";
import "./number.css";
import Headers from "../Utils/Headers";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import validator from "validator";

const EditCandidate = () => {
  // const CandidateName = useRef(HTMLInputElement);
  // const Role = useRef(HTMLInputElement);
  // const Email = useRef(HTMLInputElement);
  // const Contact = useRef(HTMLInputElement);
  // const PAN = useRef(HTMLInputElement);
  // const Experience = useRef(HTMLInputElement);
  const [role, setRole] = useState("");

  const [candidateName, setCandidateName] = useState("");

  const [email, setEmail] = useState("");

  const [contact, setContact] = useState("");

  const [pan, setPan] = useState("");

  const [experience, setExperience] = useState("");
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
  // const [contact, setContact] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let isApiSubscribed = true;

    const getSkillGroup = async () => {
      const roleListResponse = await fetch(
        `http://localhost:5000/candidate-role/allSkill`,
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

    if (!candidateName) {
      setNameErr("Please enter Candidate Name");
      return;
    }

    if (!email) {
      setEmailErr("Please enter email");
      return;
    }

    if (!contact) {
      setContactErr("Please enter contact");
      return;
    }

    if (!role) {
      setRolesErr("Please enter Role");
      return;
    }

    if (!pan) {
      setPanErr("Please enter PAN");
      return;
    }

    if (!experience) {
      setExperienceErr(
        "Please enter valid experience in years",
      );
      return;
    }
    if (String(contact).length !== 10) {
      setContactErr("Please enter valid 10 digit number");
      return;
    }
    if (!validator.isEmail(email)) {
      setEmailErr("Please enter valid email");
      return;
    }
    if (parseFloat(experience) <= 0) {
      setExperienceErr(
        "Please enter valid experience in years",
      );
      return;
    }
    let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (!regex.test(pan)) {
      setPanErr("Please enter valid PAN");
      return;
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
          candidate_name: candidateName,
          email: email,
          contact: contact,
          role: role,
          pan: pan,
          it_experience_years: experience,
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
        // CandidateName.current.value = temp.candidate_name;
        // Email.current.value = temp.email;
        // Role.current.value = temp.role;
        // PAN.current.value = temp.pan;
        // Contact.current.value = temp.contact;
        // Experience.current.value = temp.it_experience_years;
        setCandidateName(temp?.candidate_name);
        setContact(temp?.contact);
        setPan(temp?.pan);
        setEmail(temp?.email);
        setRole(temp?.role);
        setExperience(temp?.it_experience_years);
        setCid(temp.id);
        //  status.current.value=temp.status;
      });
  }, [id]);
  const handleInput = (e) => {
    setDisabled(false);

    // let regex = /^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$/;

    // let regex = /^[A-Z](?=.{1,29}$)[A-Za-z]*(?:\h+[A-Z][A-Za-z]*)*$/;

    // let regex = /^[A-Za-z]+([\ A-Za-z]+)*/;

    const name = String(e.target.value);

    let regex = /^[A-Za-z0-9 ]+$/;

    if (!regex.test(name)) {
      setNameErr("Name can't include special characters");
    } else {
      setNameErr("");
    }

    setCandidateName(e.target.value);
  };
  const handleExperience = (e) => {
    setDisabled(false);

    const expre = String(e.target.value);

    if (parseFloat(expre) <= 0) {
      setExperienceErr("Experience cant be 0 or negative");
    } else {
      setExperienceErr("");
    }

    setExperience(e.target.value);
  };
  const handlePanChange = (e) => {
    setDisabled(false);

    let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    setDisabled(false);

    const paan = String(e.target.value);

    if (!regex.test(paan)) {
      setPanErr("Please enter valid PAN");
    } else {
      setPanErr("");
    }

    if (paan.length > 10) {
      return;
    }

    setPan(e.target.value.toUpperCase());
  };
  const handleEmailChange = (e) => {
    setDisabled(false);

    if (!validator.isEmail(email)) {
      setEmailErr("Please enter valid email id");
    } else {
      setEmailErr("");
    }

    setEmail(e.target.value);
  };

  const handleContactChange = (e) => {
    setDisabled(false);

    const contact = String(e.target.value);
    if (contact.length < 10) {
      setContactErr(
        "Please enter valid 10 digit mobile number",
      );
    }
    if (contact.length === 10) {
      setContactErr("");
    }

    if (contact.length > 10) {
      return;
    }

    setContact(e.target.value);
  };

  return (
    <div className='wrapper'>
      <Headers />
      <div className='container-wrap p-3'>
        <h2 className='mb-4 px-2'>Edit Candidate</h2>
        <form className='px-2'>
          <div className='row ms-3'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Candidate ID
                </label>
              </div>
            </div>
            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control responsive'
                  //placeholder={x}
                  //ref = {cid}
                  value={cid}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className='row ms-3'>
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
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control responsive'
                  value={candidateName}
                  onChange={handleInput}
                  placeholder='Enter Candidate Name'
                />
                {nameErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />
                    {nameErr}
                  </p>
                )}
              </div>
            </div>

            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Email
                </label>
              </div>
            </div>
            <div className='col-md-5 can__mail'>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control responsive'
                  placeholder='Enter Email'
                  value={email}
                  onChange={handleEmailChange}
                  pattern='[a-zA-Z0-9]+@[a-zA-Z]+.com'

                  // pattern="[0-9]{10}"
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
          <div className='row ms-3'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Contact
                </label>
              </div>
            </div>
            <div className='col-md-5 can__contact'>
              <div className='form-group'>
                <input
                  type='number'
                  className='form-control responsive'
                  onChange={handleContactChange}
                  placeholder='Enter contact number'
                  value={contact}
                />
                {contactErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />
                    {contactErr}
                  </p>
                )}
              </div>
            </div>

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
                <select
                  id='select'
                  className='form-select responsive'
                  aria-label='Select Role'
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setDisabled(false);
                  }}>
                  <option defaultValue=''>
                    Select Role
                  </option>
                  {skillGroup?.role &&
                    skillGroup?.role?.map(
                      ({ candidate_roles }) => (
                        <option value={candidate_roles}>
                          {candidate_roles}
                        </option>
                      ),
                    )}{" "}
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
          <div className='row ms-3'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  PAN
                </label>
              </div>
            </div>
            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  value={pan}
                  onChange={handlePanChange}
                  className='form-control responsive'
                  placeholder='Enter PAN'
                  pattern='[A-Z]{5}[0-9]{4}[A-Z]{1}'
                />
                {panErr && (
                  <p className={`mb-0 mx-4 add__warning`}>
                    <ExclamationTriangleIcon className='add__warningIcon' />
                    {panErr}
                  </p>
                )}
              </div>
            </div>

            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Experience
                </label>
              </div>
            </div>
            <div className='col-md-5 can__experience'>
              <div className='form-group'>
                <input
                  type='number'
                  min='0'
                  className='form-control responsive'
                  value={experience}
                  onChange={handleExperience}
                  placeholder='Enter Number of years'
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

          <div className='row ms-3 pt-2'>
            <div className='col-md-2'>
              <button
                type='submit'
                disabled={disabled}
                className='btn btn-primary'
                onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <div className='col-md-2'>
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
