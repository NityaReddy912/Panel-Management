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

function SingleList({ hash, candidate, candidateList }) {
  const [CandidateName, setName] = useState();

  const [Email, setEmail] = useState();

  const [Role, setRole] = useState();

  const [status, setStatus] = useState();

  const [Contact, setPhone] = useState();

  const [PAN, setPan] = useState();

  const [Experience, setExperience] = useState();

  console.log(candidate);

  // const [isActive, setIsActive] = useState();

  // const triggerToggle = () => {

  //     setIsActive(user.Action);

  // };

  const navigate = useNavigate();

  useEffect(() => {
    setName(candidate.candidate_name);

    setEmail(candidate.email);

    setPhone(candidate.contact);

    setRole(candidate.role);

    setPan(candidate.pan);

    setExperience(candidate.it_experience_years);

    setStatus(candidate.status);
  }, [candidate]);

  const handleAction = (e) => {
    e.preventDefault();
    navigate(`/interview-schedule/${candidate?._id}`);
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
        <Link to={`/candidate-edit/${candidate._id}`}>
          <PencilIcon className='singleList__pencilIcon' />
        </Link>
        <p>|</p>
        <button
          className='btn btn-primary btn-xs'
          onClick={handleAction}>
          Schedule
        </button>
      </td>
    </tr>
  );
}

export default SingleList;
