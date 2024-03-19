import React from "react";
import Headers from "../Utils/Headers";
import Interview from "./Interview";
// import { ToastContainer } from 'react-toastify';
import "./interview.scss";

function ScheduleInterview() {
  return (
    <div className='wrapper'>
      <Headers />
      <div className='container-wrap'>
        <h2 className='searchHead'>Schedule Interview</h2>
      </div>
      <Interview />
    </div>
  );
}

export default ScheduleInterview;
