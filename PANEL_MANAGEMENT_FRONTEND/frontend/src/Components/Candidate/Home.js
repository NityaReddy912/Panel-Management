import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = ({
  onSearchData,
  onSearch,
  emptyCandidateList,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [PAN, setPan] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("");
  const handleCancel = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setRole("");
    setPhone("");
    setPan("");
    setExperience("");
    setStatus("");
    emptyCandidateList();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setRole("");
    setPhone("");
    setPan("");
    setExperience("");
    setStatus("");
    emptyCandidateList();
    const searchData = {
      name,
      email,
      phone,
      role,
      PAN,
      experience,
      status,
    };
    onSearchData(searchData);
    onSearch();
    console.log(searchData);
  };
  return (
    <div className='container-wrap'>
      <form>
        <div className='row mb-3'>
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
                className='form-control'
                placeholder='Enter Candidate Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
          <div className='col-md-5'>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-1'>
            <div className='form-group'>
              <label
                className='fw-bolder'
                htmlFor='first'>
                Status
              </label>
            </div>
          </div>
          <div className='col-md-5'>
            <div className='form-group'>
              <select
                id='select'
                className='form-select'
                aria-label='Select Role'
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option defaultValue='Select Role'>
                  Select Status
                </option>
                <option value='1'>010 Screening</option>
                <option value='2'>020 L1 TBS</option>
                <option value='3'>021 L1 Scheduled</option>
                <option value='4'>021 L1 Rejected</option>
                <option value='5'>031 L2 TBS</option>
                <option value='6'>032 L2 Rejected</option>
                <option value='7'>040 HR TBS</option>
                <option value='8'>041 HR Rejected</option>
                <option value='9'>
                  050 Offer Approval
                </option>
                <option value='10'>
                  051 Offer Rejected
                </option>
                <option value='11'>
                  052 Offer Released
                </option>
                <option value='12'>070 Joined</option>
                <option value='13'>
                  080 Offer Backout
                </option>
                <option value='14'>090 Drop</option>
              </select>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <button
              type='submit'
              onClick={handleSubmit}
              className='btn btn-primary text-center btn-lg'>
              Search
            </button>
            <button
              type='submit'
              onClick={handleCancel}
              className='btn btn-primary text-center btn-lg ms-4'>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
