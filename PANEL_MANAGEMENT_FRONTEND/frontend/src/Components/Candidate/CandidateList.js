import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchList from "./SearchList.js";
import { toast } from "react-toastify";
import "./add.css";
import Headers from "../Utils/Headers.js";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function CandidateList() {
  const CandidateName = useRef(HTMLInputElement);
  const Role = useRef(HTMLInputElement);
  const Email = useRef(HTMLInputElement);
  const Contact = useRef(HTMLInputElement);
  const PAN = useRef(HTMLInputElement);
  const Experience = useRef(HTMLInputElement);
  const status = useRef(HTMLInputElement);
  const [candidateList, setCandidateList] = useState([]);
  const [page, setPage] = useState(1);
  const [statusList, setStatusList] = useState([]);
  const [skillGroup, setSkillGroup] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const [x, setX] = useState(false);
  const [show, setShow] = useState(false);
  const user_data = JSON.parse(
    window.sessionStorage.getItem("user_data"),
  );
  const role_id = user_data.role_id;
  console.log(role_id);

  useEffect(() => {
    let isApiSubscribed = true;
    const getStatus = async () => {
      const roleListResponse = await fetch(
        `http://localhost:5000/candidate-status/all-candidate-status`,
        {
          headers: {
            "x-access-token":
              window.sessionStorage.getItem("token"),
          },
        },
      );

      const roleListData = await roleListResponse.json();
      console.log(roleListData);

      setStatusList(roleListData);
    };

    const getSkillGroup = async () => {
      console.log("hi");
      const roleListResponse = await fetch(
        `http://localhost:5000/skill-group/all`,
        {
          headers: {
            "x-access-token":
              window.sessionStorage.getItem("token"),
          },
        },
      );

      console.log(roleListResponse);

      const roleListData = await roleListResponse.json();
      console.log(roleListData);

      setSkillGroup(roleListData);
    };

    if (isApiSubscribed) {
      getStatus();
      getSkillGroup();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, []);

  console.log(skillGroup);

  const onNext = () => {
    setPage(page + 1);
  };
  const onPrevious = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  function handleSearch(e) {
    e.preventDefault();
    setErr(false);
    if (
      !CandidateName.current.value &&
      !Email.current.value &&
      !Role.current.value &&
      !status.current.value
    ) {
      return setErr(true);
    }
    setPage(1);
    search({ preventDefault: () => {} });
  }

  useEffect(() => {
    async function search(e) {
      setIsLoading(true);

      const request = await fetch(
        `http://localhost:7000/search?&candidate_name=${CandidateName.current.value}&email=${Email.current.value}&role=${Role.current.value}&status=${status.current.value}`,
        {
          method: "GET",
          headers: {
            "x-access-token":
              window.sessionStorage.getItem("token"),
          },
          // body: JSON.stringify({
          //   candidate_name: CandidateName.current.value,
          //   email: Email.current.value,
          //   contact: Contact.current.value,
          //   role: Role.current.value,
          //   pan: PAN.current.value,
          //   it_experience_years: Experience.current.value,
          //   status: status.current.value,
          // }),
        },
      );

      if (request.status === 401) {
        return toast.error("Please fill atleast one field");
      }

      const data = await request.json();
      setCandidateList(data);
      setIsLoading(false);
    }

    search();
  }, []);

  console.log(candidateList);

  async function search(e) {
    e.preventDefault();

    setShow(true);

    const request = await fetch(
      `http://localhost:7000/search?&candidate_name=${CandidateName.current.value}&email=${Email.current.value}&role=${Role.current.value}&status=${status.current.value}`,
      {
        method: "GET",
        headers: {
          "x-access-token":
            window.sessionStorage.getItem("token"),
        },
        // body: JSON.stringify({
        //   candidate_name: CandidateName.current.value,
        //   email: Email.current.value,
        //   contact: Contact.current.value,
        //   role: Role.current.value,
        //   pan: PAN.current.value,
        //   it_experience_years: Experience.current.value,
        //   status: status.current.value,
        // }),
      },
    );

    if (request.status === 401) {
      return toast.error("Please fill atleast one field");
    }

    console.log(request);

    const data = await request.json();
    console.log(data);
    setCandidateList(data);
  }

  console.log(statusList);

  function handlecancel(e) {
    // setX(false);
    e.preventDefault();
    window.location.reload();
  }

  console.log(candidateList);

  const handleLastPage = () => {
    setPage(Math.ceil(candidateList?.totalItems / 3));
  };

  return (
    <div className='wrapper'>
      <Headers />
      <div className='container-wrap px-3'>
        <h2>Candidate List</h2>

        <div className='container-wrap'>
          <div className='row mb-2'>
            <div className='col-md-12'>
              {role_id === 1003 ? (
                <Link to='/add'>
                  <Link to='/add-candidate'>
                    <button
                      disabled='true'
                      className='btn btn-primary btn-sm float-end ms-3 py-2'>
                      +Add Candidate
                    </button>
                  </Link>
                  <Link to='/candidate-import'>
                    <button
                      disabled='true'
                      className='btn btn-primary btn-sm float-end py-2'>
                      +Import Candidates
                    </button>
                  </Link>
                </Link>
              ) : (
                <Link to='/add'>
                  <Link to='/add-candidate'>
                    <button className='btn btn-primary btn-sm float-end ms-3 py-2'>
                      +Add Candidate
                    </button>
                  </Link>
                  <Link to='/candidate-import'>
                    <button className='btn btn-primary btn-sm float-end py-2'>
                      +Import Candidates
                    </button>
                  </Link>
                </Link>
              )}
            </div>
          </div>

          <form
            className='px-2'
            onSubmit={handleSearch}>
            <div className='row'>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    htmlFor='userid'>
                    Candidate Name
                  </label>
                </div>
              </div>
              <div className='col-md-5 candidate__name'>
                <div className='form-group'>
                  <input
                    type='text'
                    className={`form-control responsive ${
                      err && "search__input"
                    }`}
                    id='candidate-name'
                    onChange={(e) => setErr(false)}
                    ref={CandidateName}
                    placeholder='Enter Candidate Name'
                  />
                  {err && (
                    <p
                      className={`mb-0 mx-4 search__warning`}>
                      <ExclamationTriangleIcon className='search__warningIcon' />
                      Please Enter any search data
                    </p>
                  )}
                </div>
              </div>

              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    htmlFor='email'>
                    Email
                  </label>
                </div>
              </div>
              <div className='col-md-5 can__email'>
                <div className='form-group '>
                  <input
                    type='email'
                    className={`form-control responsive ${
                      err && "search__input"
                    }`}
                    placeholder='Enter email'
                    id='email'
                    onChange={(e) => setErr(false)}
                    ref={Email}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-1 '>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    htmlFor='status'>
                    Status
                  </label>
                </div>
              </div>
              <div className='col-md-5 can__status'>
                <div className='form-group '>
                  <select
                    id='status'
                    ref={status}
                    onChange={(e) => setErr(false)}
                    className={`form-select responsive ${
                      err && "search__input"
                    }`}
                    // style={{ textTransform: "capitalize" }}
                    arial-label='Select status'>
                    <option value=''>Select Status</option>
                    {statusList?.role &&
                      statusList?.role?.map(
                        ({
                          candidate_status,
                          is_deleted,
                        }) =>
                          is_deleted && (
                            <option
                              value={candidate_status}>
                              {candidate_status}
                            </option>
                          ),
                      )}
                  </select>
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
              <div className='col-md-5 can__role'>
                <div className='form-group'>
                  <select
                    id='role'
                    ref={Role}
                    onChange={(e) => setErr(false)}
                    className={`form-select responsive ${
                      err && "search__input"
                    }`}
                    aria-label='Select Role'>
                    <option value=''>Select Role</option>
                    {skillGroup &&
                      skillGroup?.role?.map(
                        ({ candidate_roles }) => (
                          <option value={candidate_roles}>
                            {candidate_roles}
                          </option>
                        ),
                      )}
                  </select>
                </div>
              </div>
            </div>

            <div className='d-flex flex-row btnGroup addList__button'>
              <div className='col-md-2'>
                <button
                  type='submit'
                  className='btn btn-primary btnSubmit'
                  data-testid='submit'
                  onClick={handleSearch}
                  value=''>
                  Search
                </button>
              </div>
              <div className='col-md-2'>
                <button
                  className='btn btn-primary btnCancel'
                  type='button'
                  data-testid='button'
                  onClick={handlecancel}>
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <SearchList
            candidateList={candidateList}
            onNext={onNext}
            onPrevious={onPrevious}
            page={page}
            Contact={Contact}
            CandidateName={CandidateName}
            Email={Email}
            Role={Role}
            PAN={PAN}
            onLast={handleLastPage}
            isLoading={isLoading}
            Experience={Experience}
            // isActive={isActive}
          />
        </div>
      </div>
    </div>
  );
}
export default CandidateList;
