import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

function Schedule() {
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
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  const [panelParam] = useSearchParams();

  const [panelParamsId, setPanelParamsId] = useState(
    panelParam.get("panel"),
  );

  const [userParamsId, setUserParamsId] = useState(
    panelParam.get("user"),
  );

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
          candidateListData?.usersList[0]
            ?.it_experience_years,
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
          `http://localhost:8000/panel/${panelParamsId}`,
        );

        console.log(panelListResponse);

        const panelListData =
          await panelListResponse.json();
        console.log(panelListData);

        setPanelId(panelListData?.panel_id);
        setTimeStart(panelListData?.start_time);
        setTimeEnd(panelListData?.end_time);
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

  const handleCancel = () => {
    navigate(`/interview-schedule/${id}`);
  };

  return (
    <div>
      <div className='custom-field container-field interview__container'>
        <h1>
          <span className='fw-bolder tag'>
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
                  className='form-control responsive'
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
          <span className='fw-bolder tag'>
            Panel Search
          </span>
        </h1>
        <form className='form interview__form'>
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
                  type='date'
                  className='form-control interview__input'
                  placeholder='Date'
                  id='cname'
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
                  value={`${timeStart} - ${timeEnd}`}
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
              <select class='form-control form-select'>
                <option selected>
                  Select Interview Type
                </option>
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
                  type='submit'
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
        </form>
      </div>
    </div>
  );
}

export default Schedule;
