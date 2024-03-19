import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
import { toast } from "react-toastify";

function Schedule() {
  const [panelParam] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [candidateId, setCandidateId] = useState("");
  const [panelAvailabilityId, setPanelAvailabilityId] =
    useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidateContact, setCandidateContact] =
    useState("");
  const [candidatePan, setCandidatePan] = useState("");
  const [candidateRole, setCandidateRole] = useState("");
  const [candidateExperience, setCandidateExperience] =
    useState("");
  const [panelName, setPanelName] = useState("");
  const [panelId, setPanelId] = useState("");
  const [panelEmail, setPanelEmail] = useState("");
  const [time] = useState(panelParam.get("time"));
  const [date] = useState(panelParam.get("date"));
  const [type] = useState(panelParam.get("type"));
  const [panelParamsId] = useState(panelParam.get("panel"));
  const [userParamsId] = useState(panelParam.get("user"));
  const [typeId] = useState(panelParam.get("typeId"));
  const [interviewType, setInterviewType] = useState(type);
  const [candidateStatusId, setCandidateStatusId] =
    useState("");

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

  console.log(userParamsId);

  const navigate = useNavigate();

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

        console.log(candidateListData);

        setCandidateId(candidateListData?.usersList?.id);
        setCandidateStatusId(
          candidateListData?.usersList?.candidate_status_id,
        );

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
  }, []);

  useEffect(() => {
    let isApiSubscribed = true;
    const getPanelList = async () => {
      try {
        console.log(panelParamsId);
        const panelListResponse = await fetch(
          `http://localhost:8000/interview/panel-id/${panelParamsId}`,
        );

        console.log(panelListResponse);

        const panelListData =
          await panelListResponse.json();

        console.log(panelListData);

        // console.log(panelListData?.);

        setPanelAvailabilityId(
          panelListData?.panel_availability_id,
        );
      } catch (err) {
        console.log(err);
      }
    };

    if (isApiSubscribed) {
      getPanelList();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, [panelParamsId]);

  useEffect(() => {
    let isApiSubscribed = true;
    const getUserList = async () => {
      try {
        console.log(userParamsId);
        const userListResponse = await fetch(
          `http://localhost:8080/${userParamsId}`,
        );

        console.log(userListResponse);

        const userListData = await userListResponse.json();
        console.log(userListData);

        // setPanelId(userListData?.panel_id);
        setPanelId(userListData?.user_id);
        setPanelName(userListData?.name);
        setPanelEmail(userListData?.email);
      } catch (err) {
        console.log(err);
      }
    };

    if (isApiSubscribed) {
      getUserList();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, [panelParamsId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    navigate(`/candidate`);
  };

  const handleScheduleInterview = async (e) => {
    e.preventDefault();
    const interviewStatus = await fetch(
      "http://localhost:9000/interview-type/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const interviewData = await interviewStatus.json();
    const formData = {
      panel_availability_id: panelAvailabilityId,
      candidate_id: candidateId,
      type_id: typeId,
      remark: "Interview Schedule",
      interview_status_id:
        interviewData.interview_status_id,
      Candidate_Email: candidateEmail,
      Date: date,
      Time: time,
      Panel_Email: panelEmail,
      name: candidateName,
    };

    console.log(formData);
    console.log(interviewData);

    const schedule = await fetch(
      "http://localhost:9000/scheduleinterview",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    if (schedule.status === 200) {
      toast.success("Interview Scheduled Successfully", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/interview-list");
      }, 2000);
    }

    const scheduleData = await schedule.json();
    console.log(interviewData);

    const updateInterview = await fetch(
      `http://localhost:8000/interview/update/${panelParamsId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const statusUpdated = {
      updatedStatus: candidateStatusId + 1,
    };
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

    const updateData = await updateInterview.json();

    console.log(updateInterview);
    console.log(updateData);

    console.log(scheduleData);
    setOpen(false);
  };

  return (
    <div>
      <div className='custom-field container-field interview__container'>
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
            <div className='col-md-5 can__name'>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control responsive interview__candidateName'
                  value={candidateName}
                  placeholder='Candidate Name'
                  id='cname'
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
                  className='form-control interview__input'
                  value={candidateEmail}
                  placeholder='Email'
                  id='cname'
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
                  type='Number'
                  className='form-control interview__input'
                  value={candidateContact}
                  placeholder='Candidate Contact'
                  id='cname'
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
                  className='form-control interview__input'
                  value={candidateRole}
                  placeholder='Role'
                  id='cname'
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
                  className='form-control interview__input'
                  placeholder='PAN'
                  value={candidatePan}
                  id='cname'
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
                  value={candidateExperience}
                  className='form-control interview__input'
                  placeholder='Experience'
                  id='cname'
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
            Panel Details
          </span>
        </h1>
        <div className='form interview__form'>
          <div className='row first1'>
            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Date
                </label>
              </div>
            </div>
            <div className='col-md-5 res__date'>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control interview__input'
                  placeholder='Date'
                  id='cname'
                  value={date}
                  disabled
                />
              </div>
            </div>

            <div className='col-md-1'>
              <div className='form-group'>
                <label
                  className='fw-bolder'
                  htmlFor='first'>
                  Time
                </label>
              </div>
            </div>
            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control interview__input'
                  placeholder='Time'
                  id='cname'
                  value={time}
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
                  Panel Id
                </label>
              </div>
            </div>
            <div className='col-md-5'>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control interview__input'
                  placeholder='Panel Id'
                  id='cname'
                  value={panelId}
                  disabled
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
                  className='form-control interview__input'
                  placeholder='Panel Name'
                  id='cname'
                  value={panelName}
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
                  Email
                </label>
              </div>
            </div>
            <div className='col-md-5 email'>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control interview__input'
                  placeholder='Email'
                  id='cname'
                  value={panelEmail}
                  disabled
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
            <div className='form-group col-md-5 interview_padding'>
              <select
                class='form-control form-select'
                value={interviewType}
                disabled={type !== "L2"}
                onChange={(e) => {
                  setInterviewType(e.target.value);
                }}>
                <option>L1</option>
                <option>L2</option>
              </select>
            </div>
          </div>

          <div className='row btnGroup schedule__button'>
            <div className='row'>
              <div className='col-md-1'>
                <button
                  data-testid='schedulebutton'
                  onClick={handleOpen}
                  className='btn btn-primary'>
                  Schedule
                </button>
              </div>
              <div className='col-md-5'>
                <button
                  onClick={handleCancel}
                  id='cancelbutton'
                  className='btn btn-primary btnCancel'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <h2
            style={{ textTransform: "none" }}
            id='modal-modal-title'>
            Do you want to Schedule the Interview?
          </h2>
          <div className='addModal__btn'>
            <div className=''>
              <button
                onClick={handleScheduleInterview}
                className=''>
                Schedule
              </button>
            </div>
            <div className=''>
              <button
                onClick={handleClose}
                className=''>
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Schedule;
