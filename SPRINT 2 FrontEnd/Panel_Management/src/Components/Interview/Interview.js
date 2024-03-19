import {
  ArrowRightCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

function Interview() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [panelId, setPanelId] = useState("");
  const [panelName, setPanelName] = useState("");
  const [panelEmail, setPanelEmail] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [panelData, setPanelData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidateContact, setCandidateContact] =
    useState("");
  const [candidatePan, setCandidatePan] = useState("");
  const [candidateRole, setCandidateRole] = useState("");
  const [candidateExperience, setCandidateExperience] =
    useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isApiSubscribed = true;
    const getCandidateList = async () => {
      try {
        const candidateListResponse = await fetch(
          `http://localhost:7000/getbyid/${id}`,
        );

        const candidateListData =
          await candidateListResponse.json();

        setCandidateName(
          candidateListData?.usersList?.candidate_name,
        );
        setCandidateEmail(
          candidateListData?.usersList?.email,
        );
        setCandidateContact(
          candidateListData?.usersList?.contact,
        );
        setCandidateRole(
          candidateListData?.usersList?.role,
        );
        setCandidatePan(candidateListData?.usersList?.pan);
        setCandidateExperience(
          candidateListData?.usersList?.it_experience_years,
        );

        setCandidateData(candidateListData);
      } catch (err) {
        console.log(err);
      }
    };

    getCandidateList();

    if (isApiSubscribed) {
      getCandidateList();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, [id]);

  console.log(candidateName);

  const handleCancel = (e) => {
    e.preventDefault();
    setDateFrom("");
    setDateTo("");
    setPanelId("");
    setPanelEmail("");
    setPanelName("");
    setInterviewType("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!date || !panelId || !panelName || !panelEmail || !interviewType) {
    //   return alert('Please fill atleast one field to search')
    // }
    console.log(dateFrom);

    let panelSubmitData = {
      // role: candidateRole,
    };

    if (dateFrom) {
      panelSubmitData = {
        panel_id: +panelId,
        name: panelName,
        email: panelEmail,
        available_from_date: new Date(
          dateFrom,
        ).toISOString(),
      };
    }

    if (dateTo) {
      panelSubmitData = {
        panel_id: +panelId,
        name: panelName,
        email: panelEmail,
        available_to_date: new Date(dateTo).toISOString(),
      };
    }

    if (dateFrom && dateTo) {
      panelSubmitData = {
        panel_id: +panelId,
        name: panelName,
        email: panelEmail,
        available_from_date: new Date(
          dateFrom,
        ).toISOString(),
        available_to_date: new Date(dateTo).toISOString(),
      };
    }

    console.log(panelSubmitData);

    const panelListResponse = await fetch(
      `http://localhost:9000/panelRouter/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(panelSubmitData),
      },
    );

    const panelListData = await panelListResponse.json();

    console.log(panelListData);
    setPanelData(panelListData);
  };

  console.log(panelData);

  return (
    <div>
      <div className='custom-field interview__container container-field '>
        <h1>
          <span className='fw-bolder tag interview__tag'>
            Candidate Details
          </span>
        </h1>
        <form className='form interview__form'>
          <div className='row first1'>
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
                  data-testid='search-id'
                  className='form-control responsive interview__input'
                  placeholder='Candidate Name'
                  id='roleId'
                  value={candidateName}
                  disabled
                />
              </div>
            </div>

            <div className='col-md-1'>
              <div className='form-group'>
                <label className='fw-bolder'>Email</label>
              </div>
            </div>
            <div className='col-md-5 email'>
              <div>
                <input
                  type='email'
                  data-testid='search-id'
                  className='form-control responsive interview__input'
                  placeholder='Email'
                  id='roleId'
                  value={candidateEmail}
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
                  Contact
                </label>
              </div>
            </div>
            <div className='col-md-5 contact'>
              <div className='form-group'>
                <input
                  type='number'
                  data-testid='search-id'
                  className='form-control responsive interview__input'
                  placeholder='Candidate Contact'
                  id='roleId'
                  value={candidateContact}
                  disabled
                />
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
                <input
                  type='text'
                  data-testid='search-id'
                  className='form-control responsive interview__input'
                  placeholder='Role'
                  id='roleId'
                  value={candidateRole}
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
                  PAN
                </label>
              </div>
            </div>
            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  data-testid='search-id'
                  className='form-control responsive interview__input'
                  placeholder='PAN'
                  id='roleId'
                  value={candidatePan}
                  disabled
                />
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
            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  data-testid='search-id'
                  className='form-control responsive interview__input'
                  placeholder='Experience'
                  id='roleId'
                  value={candidateExperience}
                  disabled
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='custom-field interview__container'>
        <h1>
          <span className='fw-bolder tag interview__tag'>
            Panel Search
          </span>
        </h1>
        <form
          className='form interview__form'
          onSubmit={handleSubmit}>
          <div className='row first1'>
            <div className='row'>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    htmlFor='first'>
                    From Date
                  </label>
                </div>
              </div>
              <div className='col-md-5 date'>
                <div className='form-group'>
                  <input
                    type='date'
                    data-testid='search-id'
                    className='form-control responsive interview__input'
                    placeholder='Select Date'
                    id='roleId'
                    value={dateFrom}
                    onChange={(e) =>
                      setDateFrom(e.target.value)
                    }
                  />
                </div>
              </div>
              <div className='col-md-1 interview__toDate'>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    htmlFor='first'>
                    To Date
                  </label>
                </div>
              </div>
              <div className='col-md-5 padding1 interview__toDateInput'>
                <div className='form-group'>
                  <input
                    type='date'
                    data-testid='search-id'
                    className='form-control responsive interview__input'
                    placeholder='Select Date'
                    value={dateTo}
                    onChange={(e) =>
                      setDateTo(e.target.value)
                    }
                    id='roleId'
                  />
                </div>
              </div>{" "}
            </div>
          </div>
          <div className='row'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Panel Id
                </label>
              </div>
            </div>
            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  data-testid='search-id'
                  className='form-control responsive interview__input'
                  placeholder='Enter Panel Id'
                  id='roleId'
                  value={panelId}
                  onChange={(e) =>
                    setPanelId(e.target.value)
                  }
                />
              </div>
            </div>

            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Panel Name
                </label>
              </div>
            </div>
            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  data-testid='search-id'
                  className='form-control responsive interview__input'
                  placeholder='Enter Panel Name'
                  id='roleId'
                  value={panelName}
                  onChange={(e) =>
                    setPanelName(e.target.value)
                  }
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
                  Email
                </label>
              </div>
            </div>
            <div className='col-md-5 email'>
              <div className='form-group'>
                <input
                  type='email'
                  data-testid='search-id'
                  className='form-control responsive interview__input'
                  placeholder='Enter Email'
                  id='roleId'
                  value={panelEmail}
                  onChange={(e) =>
                    setPanelEmail(e.target.value)
                  }
                />
              </div>
            </div>

            <div className='col-md-1'>
              <div class='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Interview Type
                </label>
              </div>
            </div>
            <div className='form-group col-md-5 padding'>
              {/* <input
                type="text"
                data-testid="search-id"
                className="form-control interview__input"
                id="roleId"
              /> */}
              <select
                class='form-control responsive interview__input form-select'
                value={interviewType}
                onChange={(e) =>
                  setInterviewType(e.target.value)
                }>
                <option selected>
                  Select Interview Type
                </option>
                <option>Easy</option>
                <option>Intermidiate</option>
                <option>Expert</option>
              </select>
            </div>
          </div>

          <div className='row btnGroup schedule__button'>
            <div className='row'>
              <div className='col-md-1'>
                <button
                  data-testid='schedulebutton'
                  type='submit'
                  className='btn btn-primary'>
                  Search
                </button>
              </div>
              <div className='col-md-5'>
                <button
                  id='cancelbutton'
                  className='btn btn-primary btnCancel'
                  onClick={handleCancel}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {panelData?.totalrecords && (
        <div className='col-sm-12 overflow-auto'>
          <table class='table table-striped table-hover interview__table'>
            <thead>
              <tr className=''>
                <th scope='col'>#</th>
                <th scope='col'>Panel Id</th>
                <th scope='col'>Panel Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Role</th>
                <th scope='col'>Interview Type</th>
                <th scope='col'>Date</th>
                <th scope='col'>Slot Time</th>
                <th scope='col'>Availability Status</th>
                {/* <th>&nbsp;</th> */}
                <th scope='col'>Schedule</th>
              </tr>
            </thead>
            <tbody>
              {panelData?.totalrecords?.map(
                (panel, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{panel?.panel_id}</td>
                    <td>{panel?.users[0]?.name}</td>
                    <td>{panel?.users[0]?.email}</td>
                    <td>{panel?.roles[0]?.role_name}</td>
                    <td>Interview Type</td>
                    <td>{`${
                      panel?.available_from_date?.split(
                        "T",
                      )[0]
                    } - ${
                      panel?.available_to_date?.split(
                        "T",
                      )[0]
                    }`}</td>
                    <td>{`${panel?.start_time} - ${panel?.end_time}`}</td>
                    <td>Availability status</td>
                    <td>
                      {" "}
                      <Link
                        to={`/confirm/${id}?panel=${panel?._id}&user=${panel?.users[0]?._id}`}>
                        <ArrowRightCircleIcon className='interview__scheduleIcon' />
                      </Link>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Interview;
