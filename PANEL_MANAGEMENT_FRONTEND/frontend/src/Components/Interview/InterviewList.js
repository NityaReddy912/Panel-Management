import React, { useEffect } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import Paginator from "../Utils/Paginator";
import Visibility from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import Headers from "../Utils/Headers";
import Moment from 'react-moment';

function InterviewList() {
  const [date, setDate] = useState("");
  const [role, setRole] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [panelName, setPanelName] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [status, setStatus] = useState("");
  const [interviewList, setInterviewList] = useState([]);
  const [roleList, setRoleList] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [open, setOpen] = useState(false);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = interviewList?.slice(
    itemOffset,
    endOffset,
  );
  const pageCount = Math.ceil(interviewList?.length / 10);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let isApiSubscribed = true;
    const getRoleList = async () => {
      try {
        const panelListResponse = await fetch(
          `http://localhost:5000/role/all-role`,
          {
            headers: {
              "x-access-token":
                window.sessionStorage.getItem("token"),
            },
          },
        );

        const panelListData =
          await panelListResponse.json();

        setRoleList(panelListData);
      } catch (err) {
        console.log(err);
      }
    };

    if (isApiSubscribed) {
      getRoleList();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, []);

  useEffect(() => {
    let isApiSubscribed = true;
    const getInterviewList = async () => {
      const request = await fetch(
        `http://localhost:9000/listInterviews/searchinterviews?&role_name=${role}&candidate_name=${candidateName}&name=${panelName}&type=${interviewType}&status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(),
        },
      );

      const data = await request.json();
      console.log("Data", data);
      setInterviewList(data?.totalrecords);
    };

    if (isApiSubscribed) {
      getInterviewList();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, []);

  console.log(interviewList);

  async function handleSearch(e) {
    e.preventDefault();

    const request = await fetch(
      `http://localhost:9000/listInterviews/searchinterviews?&role_name=${role}&candidate_name=${candidateName}&name=${panelName}&type=${interviewType}&status=${status}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   name: panelName,
        //   candidate_name: candidateName,
        //   type: interviewType,
        //   role_name: role,
        // }),
      },
    );

    const data = await request.json();

    const date1 = new Date(dateFrom).getTime();
    const date2 = new Date(dateTo).getTime();

    const interviewData = data.totalrecords.filter(
      (panel) => {
        const availableDate = new Date(
          panel?.panels_availabilities[0].available_date,
        ).getTime();
        console.log(availableDate);
        if (date1 <= availableDate) {
          if (date2 >= availableDate) {
            return panel;
          }
        }
      },
    );
    console.log(data);
    console.log(interviewData);
    if (dateFrom) {
      setInterviewList(interviewData);
    } else {
      setInterviewList(data?.totalrecords);
    }
  }

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * 10) % interviewList.length;
    setItemOffset(newOffset);
  };
  return (
    <div className='wrapper'>
      <Headers />
      <form className='container-wrap'>
        <h2 className='searchHead mb-4'>Interview List</h2>
        <div className='form'>
          <div className='row px-3 first1'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  From Date
                </label>
              </div>
            </div>

            <div className='col-md-5 int__date'>
              <div className='form-group'>
                <input
                  type='date'
                  placeholder='Select From Date'
                  data-testid='search-id'
                  value={dateFrom}
                  onChange={(e) =>
                    setDateFrom(e.target.value)
                  }
                  className='form-control responsive'
                  id='fromDate'
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

            <div className='col-md-5 int__date'>
              <div className='form-group'>
                <input
                  type='date'
                  placeholder='Select From Date'
                  data-testid='search-id'
                  className='form-control responsive'
                  value={dateTo}
                  onChange={(e) =>
                    setDateTo(e.target.value)
                  }
                  id='fromDate'
                />
              </div>
            </div>
          </div>

          <div className='row px-3'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Role
                </label>
              </div>
            </div>

            <div className='form-group col-md-5 int__role'>
              <select
                onChange={(e) => setRole(e.target.value)}
                id='inputState'
                class='form-control responsive form-select'>
                <option value=''>Select Role</option>
                {roleList &&
                  roleList?.role?.map(
                    ({ role_name, role_id }) => (
                      <option value={role_name}>
                        {role_name}
                      </option>
                    ),
                  )}
              </select>
            </div>

            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Candidate Name
                </label>
              </div>
            </div>

            <div class='col-md-5'>
              <div class='form-group '>
                <input
                  type='text'
                  class='form-control responsive'
                  onChange={(e) => {
                    setCandidateName(e.target.value);
                  }}
                  placeholder='Search Candidate Name'
                  id='pname'
                />
              </div>
            </div>
          </div>

          <div className='row px-3'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Panel Name
                </label>
              </div>
            </div>

            <div class='col-md-5'>
              <div class='form-group position-relative'>
                <input
                  type='text'
                  class='form-control responsive'
                  onChange={(e) => {
                    setPanelName(e.target.value);
                  }}
                  placeholder='Search Panel Name'
                  id='pname'
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

            <div className='form-group col-md-5 int__interviewType'>
              <div>
                <select
                  onChange={(e) =>
                    setInterviewType(e.target.value)
                  }
                  className='form-select responsive form-control'>
                  <option value=''>
                    Select Interview Type
                  </option>
                  <option value='L1'>L1</option>
                  <option value='L2'>L2</option>
                  <option value='HR'>HR</option>
                </select>
              </div>
            </div>
          </div>

          <div className='row px-3'>
            <div className='col-md-1'>
              <div class='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Status
                </label>
              </div>
            </div>

            <div className='form-group col-md-5 int__status'>
              <select
                onChange={(e) => setStatus(e.target.value)}
                id='inputState'
                class='form-control responsive form-select'>
                <option value=''>Select status</option>
                <option value='Scheduled'>Scheduled</option>
                <option value='Conducted'>Conducted</option>
                <option value='PanelNoShow'>
                  PanelNoShow
                </option>
                <option value='CandidateNoShow'>
                  CandidateNoShow
                </option>
                <option value='PanelWithdrawn'>
                  PanelWithDrawn
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className='row btnGroup schedule__button'>
          <div className='row'>
            <div className='col-md-1'>
              <button
                className='btn btn-primary btnSubmit'
                onClick={handleSearch}>
                Search
              </button>
            </div>

            <div className='col-md-2'>
              <button
                id='cancelbutton'
                className='btn btn-primary btnCancel'>
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div class='row flex'>
          {interviewList && (
            <table class='table table-striped table-hover'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Interview Id</th>
                  <th scope='col'>Date</th>
                  <th scope='col'>Role</th>
                  <th scope='col'>Candidate Name</th>
                  <th scope='col'>Panel Name</th>
                  <th scope='col'>Interview Type</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>View Feedback</th>
                </tr>
              </thead>
              <tbody>
                {interviewList?.map((interview, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{interview?.id}</td>
                    <td>
                      <Moment format='DD-MM-YYYY'>
                        {
                          `${
                            interview?.panels_availabilities[0]?.available_date.split("T")[0]
                          }`
                        }
                      </Moment>
                    </td>
                    <td>
                      {interview?.roles[0]?.role_name}
                    </td>
                    <td>
                      {
                        interview?.candidate[0]
                          ?.candidate_name
                      }
                    </td>
                    <td>{interview?.users[0]?.name}</td>
                    <td>
                      {interview?.interview_type[0]?.type}
                    </td>
                    <td>
                      {
                        interview?.interview_status[0]
                          ?.interview_status
                      }
                    </td>
                    {interview?.interview_status[0]
                      ?.interview_status !== "Conducted" ? (
                      <td style={{ cursor: "pointer" }}>
                        <Visibility onClick={handleOpen} />
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby='modal-modal-title'
                          aria-describedby='modal-modal-description'>
                          <Box sx={style}>
                            <Typography
                              id='modal-modal-title'
                              variant='h5'
                              style={{
                                textTransform: "none",
                              }}
                              component='h2'>
                              The Feedback is not submitted
                              by the Panel
                            </Typography>
                            <button
                              onClick={handleClose}
                              className='mt-3 px-3 bg-primary py-1'
                              style={{
                                border: "none",
                                color: "#fff",
                              }}>
                              Ok
                            </button>
                          </Box>
                        </Modal>
                      </td>
                    ) : (
                      <td>
                        <Link
                          to={`/feedback/${interview?.id}`}>
                          <Visibility />
                        </Link>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Paginator
            totalItems={interviewList?.length}
            handlePageClick={handlePageClick}
            pageCount={pageCount}
          />
        </div>
      </form>
    </div>
  );
}

export default InterviewList;
