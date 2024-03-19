import React from "react";
import Headers from "../Utils/Headers";
import "./interview.scss";
import Schedule from "./ScheduleConfirm";

function ConfirmSchedule() {
  return (
    <div className='wrapper'>
      <Headers />
      <div className='container-wrap'>
        <h2 className='searchHead'>Confirm Schedule</h2>
      </div>
      <Schedule />
    </div>
  );
}

export default ConfirmSchedule;
