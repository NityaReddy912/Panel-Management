import React, { useEffect, useState } from "react";

import {
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

// import ToggleButton from "./ToggleButton.js";

import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import "./SingleList.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function SingleList({ hash, candidate, candidateList }) {
  const [CandidateName, setName] = useState();
  const [Email, setEmail] = useState();
  const [Role, setRole] = useState();
  const user = useSelector(selectUser);
  console.log(user);

  const [status, setStatus] = useState();
  const [Contact, setPhone] = useState();
  const [PAN, setPan] = useState();
  const [Experience, setExperience] = useState();

  // const [isActive, setIsActive] = useState();

  // const triggerToggle = () => {

  //     setIsActive(user.Action);

  // };

  const navigate = useNavigate();

  useEffect(() => {
    let isApiSubscribed = true;

    const getStatus = async () => {
      console.log(candidate?.candidate_status_id);
      const roleListResponse = await fetch(
        `http://localhost:5000/candidate-status/status-id/${candidate?.candidate_status_id}`,
        {
          headers: {
            "x-access-token":
              window.sessionStorage.getItem("token"),
          },
        },
      );

      const roleListData = await roleListResponse.json();
      console.log(roleListData);

      setStatus(roleListData?.candidate_status);
    };

    if (isApiSubscribed) {
      getStatus();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, []);

  useEffect(() => {
    setName(candidate.candidate_name);

    setEmail(candidate.email);

    setPhone(candidate.contact);

    setRole(candidate.role);

    setPan(candidate.pan);

    setExperience(candidate.it_experience_years);
    setStatus(candidate.Candidate_Status[0].candidate_status);
  }, [candidate]);

  const handleAction = (e) => {
    e.preventDefault();
    navigate(
      `/interview-schedule/${candidate?._id}?status=${status}`,
    );
  };

  let e1;

  if (
    candidate.status === "022 L1 Rejected" ||
    candidate.status === "032 L2 Rejected" ||
    candidate.status === "041 HR Rejected" ||
    candidate.status === "090 Drop"
  ) {
    e1 = (
      <XCircleIcon
        color='white'
        className='singleList__icon'></XCircleIcon>
    );
  } else {
    e1 = (
      <CheckCircleIcon
        color='#0d6efd'
        className='singleList__icon'></CheckCircleIcon>
    );
  }

  return (
    <tr className='singleList'>
      <td>{hash}</td>

      <td>{CandidateName}</td>

      <td>{Email}</td>

      <td>{Contact}</td>

      <td>{PAN}</td>

      <td>{Role}</td>

      <td>{Experience}</td>

      <td>{status}</td>

      <td className='singleList__action'>
        {user.role_id !== 1003 && (
          <Link to={`/candidate-edit/${candidate._id}`}>
            <PencilIcon className='singleList__pencilIcon' />
          </Link>
        )}
        <p>|</p>
        <button
          className='btn btn-primary btn-xs'
          disabled={
            user.role_id === 1001 ||
            user.role_id === 1003 ||
            status === "010-Screening" ||
            status?.slice(6) !== "TBS"
          }
          onClick={handleAction}>
          Schedule
        </button>
      </td>
    </tr>
  );
}

export default SingleList;
