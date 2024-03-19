import {
  ArrowRightCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import Paginator from "../Utils/Paginator";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Moment from "react-moment";

function Interview() {
  let currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate, "2024-01-01");

  const [dateFrom, setDateFrom] = useState(currentDate);
  const [dateTo, setDateTo] = useState("");
  const [panelId, setPanelId] = useState("");
  const [panelName, setPanelName] = useState("");
  const [panelEmail, setPanelEmail] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [panelData, setPanelData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [interview, setInterview] = useState("");
  const [candidateContact, setCandidateContact] =
    useState("");
  const [candidatePan, setCandidatePan] = useState("");
  const [candidateRole, setCandidateRole] = useState("");
  const [candidateExperience, setCandidateExperience] =
    useState("");
  const [skillName, setSkillName] = useState("");
  const [availableStatus, setAvailableStatus] =
    useState("");
  const [interviewQuery] = useSearchParams();
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = panelData?.slice(
    itemOffset,
    endOffset,
  );
  const pageCount = Math.ceil(panelData?.length / 10);

  const status = interviewQuery.get("status").slice(4, 6);
  console.log(status);
  const [reset, setReset] = useState(false);
  const { id } = useParams();

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

    if (isApiSubscribed) {
      getCandidateList();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, [id]);

  useEffect(() => {
    let isApiSubscribed = true;
    const getCandidateList = async () => {
      try {
        const panelListResponse = await fetch(
          `http://localhost:8000/interview/search?availability_status=Available`,
        );

        const panelListData =
          await panelListResponse.json();
        console.log(panelListData);

        const date1 = new Date(dateFrom).getTime();

        const paneldata = panelListData.totalrecords.filter(
          (panel) => {
            const availableDate = new Date(
              panel?.available_date,
            ).getTime();
            if (date1 <= availableDate) {
              if (
                panel.Skills[0]?.skill_name ===
                candidateRole
              ) {
                return panel;
              }
            }
          },
        );

        const panelFilter = paneldata.filter((panel) => {
          if (status === "L2" || status === "HR") {
            return (
              panel?.interview_types[0]?.type === status
            );
          }
          if (status === "L1") {
            return (
              panel?.interview_types[0]?.type === "L1" ||
              panel?.interview_types[0]?.type === "L2"
            );
          }
        });

        console.log(paneldata);
        setPanelData(panelFilter);
      } catch (err) {
        console.log(err);
      }
    };

    if (isApiSubscribed) {
      getCandidateList();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, [id, candidateRole]);

  useEffect(() => {
    let isApiSubscribed = true;
    const getInterviewType = async () => {
      try {
        const interviewTypeListResponse = await fetch(
          `http://localhost:9000/interview-type`,
        );

        const interviewTypeListData =
          await interviewTypeListResponse.json();

        setInterview(interviewTypeListData);
      } catch (err) {
        console.log(err);
      }
    };

    if (isApiSubscribed) {
      getInterviewType();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, [id]);

  console.log(candidateName);
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * 10) % panelData.length;
    setItemOffset(newOffset);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setDateFrom("");
    setDateTo("");
    setPanelId("");
    setPanelEmail("");
    setPanelName("");
    setInterviewType("");
    setReset(true);
  };

  console.log(reset);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let panelSubmitData = {
      panel_id: +panelId,
      name: panelName,
      email: panelEmail,
      // role: candidateRole,
    };

    console.log(panelId);

    const panelListResponse = await fetch(
      `http://localhost:8000/interview/search?panel_id=${panelId}&name=${panelName}&email=${panelEmail}&availability_status=${availableStatus}`,
    );

    const panelListData = await panelListResponse.json();
    console.log(panelListData);
    const date1 = new Date(dateFrom).getTime();
    const date2 = new Date(
      dateTo || "2090-12-31",
    ).getTime();

    const paneldata = panelListData.totalrecords.filter(
      (panel) => {
        const availableDate = new Date(
          panel?.available_date,
        ).getTime();
        console.log(availableDate);
        if (date1 <= availableDate) {
          if (date2 >= availableDate) {
            if (
              panel?.Skills[0]?.skill_name === candidateRole
            ) {
              return panel;
            }
          }
        }
      },
    );
    console.log(paneldata);
    setPanelData(paneldata);
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
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  From Date
                </label>
              </div>
            </div>

            <div className='col-md-5 res__date'>
              <div className='form-group'>
                <input
                  type='date'
                  className='form-control interview__input'
                  placeholder='Select Date'
                  id='roleId'
                  min={currentDate}
                  value={dateFrom}
                  onChange={(e) =>
                    setDateFrom(e.target.value)
                  }
                />
              </div>
            </div>

            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  To Date
                </label>
              </div>
            </div>

            <div className='col-md-5 res__date'>
              <div className='form-group'>
                <input
                  type='date'
                  data-testid='search-id'
                  className='form-control interview__input'
                  placeholder='Select Date'
                  value={dateTo}
                  min={currentDate}
                  onChange={(e) =>
                    setDateTo(e.target.value)
                  }
                  id='roleId'
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
              <select
                class='form-control responsive interview__input form-select'
                value={interviewType}
                onChange={(e) =>
                  setInterviewType(e.target.value)
                }>
                <option selected>
                  Select Interview Type
                </option>

                {interview &&
                  interview?.map(({ type_id, type }) => (
                    <option value={type_id}>{type}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-1'>
              <div class='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Availability Status
                </label>
              </div>
            </div>

            <div className='form-group col-md-5 padding'>
              <select
                class='form-control responsive interview__input form-select'
                value={availableStatus}
                onChange={(e) =>
                  setAvailableStatus(e.target.value)
                }>
                <option selected>
                  Select Availability Status
                </option>

                <option>Available</option>

                <option>Booked</option>
              </select>
            </div>
          </div>

          <div className='row btnGroup schedule__button'>
            <div className='row'>
              <div className='col-md-1 me-4'>
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

      {panelData && (
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
              {panelData?.map((panel, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{panel?.users[0]?.user_id}</td>
                  <td>{panel?.users[0]?.name}</td>
                  <td>{panel?.users[0]?.email}</td>
                  <td>{panel?.roles[0]?.role_name}</td>
                  <td>{panel?.interview_types[0]?.type}</td>
                  <td>
                    <Moment format='DD-MM-YYYY'>
                      {`${
                        panel?.available_date?.split("T")[0]
                      }
                    `}
                    </Moment>
                  </td>
                  <td>{`${panel?.start_time} - ${panel?.end_time}`}</td>
                  <td>
                    {
                      panel?.availability_status[0]
                        ?.availability_status
                    }
                  </td>
                  <td>
                    {panel?.availability_status[0]
                      ?.availability_status ===
                    "Available" ? (
                      <Link
                        to={`/confirm/${id}?panel=${
                          panel?._id
                        }&user=${
                          panel?.users[0]?._id
                        }&date=${
                          panel?.available_date?.split(
                            "T",
                          )[0]
                        }&time=${panel?.start_time} - ${
                          panel?.end_time
                        }&type=${status}&typeId=${
                          panel?.interview_types[0]?.type_id
                        }`}>
                        <ArrowRightCircleIcon className='interview__scheduleIcon' />
                      </Link>
                    ) : (
                      <Link>
                        <XCircleIcon className='interview__xcrossIcon' />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginator
            totalItems={panelData?.length}
            handlePageClick={handlePageClick}
            pageCount={pageCount}
          />
        </div>
      )}
    </div>
  );
}

export default Interview;
