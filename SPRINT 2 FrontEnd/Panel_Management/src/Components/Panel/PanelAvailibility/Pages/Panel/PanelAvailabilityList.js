import React, { useEffect, useState, useRef } from "react";
import Button from "../../UI/Button";
import DropDown from "../../UI/DropDown";
import FieldInput from "../../UI/FieldInput";
import { FaPlus } from "react-icons/fa";
import Datepicker from "../../UI/Datepicker";
import SearchList from "./SearchList";
import { useDispatch, useSelector } from "react-redux";
import { panavailActions } from "../../store/panelavailability";
import {
  fetchFormData,
  fetchRoleDropdowmItems,
  fetchAvailStatDropdowmItems,
  fetchIntTypeDropdowmItems,
} from "../../store/panelavailability-actions";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import NavBar from '../../../../Utils/Headers';

const PanelAvailabilityList = () => {
  /*  const data = [
    {
      AssociateName: "Upendra",
      AssociateID :"75254",
      Email:"b.upendra@zensar.com",
      Contact:"9908765432",
      Role:"TA",
      InterviewType:"Intermediate"
    },
    {
      AssociateName: "Onkar",
      AssociateID :"75253",
      Email:"o.budrukkar@zensar.com",
      Contact:"990878432",
      Role:"PH",
      InterviewType:"Expert"
    }

  ];
 */

  /* const csvTemplate = {
    filename: 'Template.csv',
    headers: Object.keys(data[0]),
    data: data
  } */

  const navigate = useNavigate();
  var loggedUser = {};
  useEffect(()=>{
    loggedUser = JSON.parse(window.sessionStorage.getItem('user_data'));
  }, []);

  const dispatch = useDispatch();
  let panelName = useSelector(
    (state) => state.panelAvailability.selectedPanelName,
  );
  let panelId = useSelector(
    (state) => state.panelAvailability.selectedPanelId,
  );
  let fromDate = useSelector(
    (state) => state.panelAvailability.selectedFromDate,
  );
  let toDate = useSelector(
    (state) => state.panelAvailability.selectedToDate,
  );
  let email = useSelector(
    (state) => state.panelAvailability.selectedEmail,
  );
  let availabilityy = useSelector(
    (state) => state.panelAvailability.availability,
  );
  let rolee = useSelector(
    (state) => state.panelAvailability.role,
  );
  let interviewTypee = useSelector(
    (state) => state.panelAvailability.interviewType,
  );
  let notSubmitt = useSelector(
    (state) => state.panelAvailability.notSubmit,
  );
  let notValidatee = useSelector(
    (state) => state.panelAvailability.notValidate,
  );
  let roledropdownListt = useSelector(
    (state) => state.panelAvailability.roledropdownList,
  );
  let inttypedropdownListt = useSelector(
    (state) => state.panelAvailability.inttypedropdownList,
  );
  let availstatdropdownListt = useSelector(
    (state) =>
      state.panelAvailability.availstatdropdownList,
  );
  let dataListt = useSelector(
    (state) => state.panelAvailability.dataList,
  );
  let pagee = useSelector(
    (state) => state.panelAvailability.page,
  );
  let sendReq = useSelector(
    (state) => state.panelAvailability.sendRequest,
  );
  let totalPages = useSelector(
    (state) => state.panelAvailability.totalPages,
  );
  const [csvData, setCsvData] = useState([]);
  const excelRef = useRef();
  const getCsvData = async () => {
    console.log("hi");
    try {
      const roleListResponse = await fetch(
        `http://localhost:8000/panelavail?fromDate=${fromDate}&toDate=${toDate}&panelId=${panelId}&panelName=${panelName}&email=${email}&availabilityStatus=${availabilityy}&role=${rolee}&interviewType=${interviewTypee}&page=${pagee}`,
      );

      const roleListData = await roleListResponse.json();
      console.log(roleListData);
      setCsvData(roleListData.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFromDate = (data) => {
    dispatch(panavailActions.changeFromDate(data));
  };

  const getToDate = (data) => {
    dispatch(panavailActions.changeToDate(data));
  };

  const getPanelId = (data) => {
    dispatch(panavailActions.changePanelId(data));
  };

  const getPanelName = (data) => {
    dispatch(panavailActions.changePanelName(data));
  };

  const getEmail = (data) => {
    dispatch(panavailActions.changeEmail(data));
  };

  const getAvailabilityStatus = (data) => {
    dispatch(panavailActions.changeAvailability(data));
  };

  const getRole = (data) => {
    dispatch(panavailActions.changeRole(data));
  };

  const getInterviewType = (data) => {
    dispatch(panavailActions.changeInterviewType(data));
  };

  const resetHandler = () => {
    dispatch(panavailActions.changeFromDate(""));
    dispatch(panavailActions.changeToDate(""));
    dispatch(panavailActions.changePanelId(""));
    dispatch(panavailActions.changePanelName(""));
    dispatch(panavailActions.changeEmail(""));
    dispatch(panavailActions.changeAvailability(""));
    dispatch(panavailActions.changeRole(""));
    dispatch(panavailActions.changeInterviewType(""));
  };
  useEffect(() => {
    if (csvData.length > 0) {
      console.log("ExportExcel useEffect");
      excelRef.current.link.click();
    }
  }, [csvData]);

  useEffect(() => {
    dispatch(fetchRoleDropdowmItems());
    dispatch(fetchAvailStatDropdowmItems());
    dispatch(fetchIntTypeDropdowmItems());
  }, []);

  useEffect(() => {
    dispatch(
      fetchFormData(
        fromDate,
        toDate,
        panelId,
        panelName,
        email,
        availabilityy,
        rolee,
        interviewTypee,
        pagee,
      ),
    );
  }, [sendReq]);

  const onNext = () => {
    dispatch(panavailActions.changePage(pagee + 1));
  };

  const onPrevious = () => {
    if (pagee === 1) {
      return;
    }
    dispatch(panavailActions.changePage(pagee - 1));
  };

  const handleSearchData = () => {
    dispatch(panavailActions.sendRequestt());
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    if (panelId) {
      dispatch(panavailActions.changeNotSubmit(false));
     // if (panelId.trim().length === 1) {
        handleSearchData();
     // }
    } else if (
      panelName ||
      fromDate ||
      toDate ||
      email ||
      availabilityy ||
      rolee ||
      interviewTypee
    ) {
      dispatch(panavailActions.changeNotSubmit(false));

      handleSearchData();
    } else {
      dispatch(panavailActions.changeNotSubmit(true));
    }

    /* if (panelId && panelId.length !== 1) {
      dispatch(panavailActions.changeNotValidate(true));
    } else {
      if (
        panelName ||
        fromDate ||
        toDate ||
        email ||
        availabilityy ||
        rolee ||
        interviewTypee
      ) {
        dispatch(panavailActions.changeNotValidate(false));
      } else {
        dispatch(panavailActions.changeNotValidate(true));
      }
    } */
  };

  const roledropdownItems = roledropdownListt.map(
    (role) => {
      return (
        <option
          key={role}
          value={role}>
          {role}
        </option>
      );
    },
  );
  const inttypedropdownItems = inttypedropdownListt.map(
    (role) => {
      return (
        <option
          key={role}
          value={role}>
          {role}
        </option>
      );
    },
  );
  const availstatdropdownItems = availstatdropdownListt.map(
    (role) => {
      return (
        <option
          key={role}
          value={role}>
          {role}
        </option>
      );
    },
  );

  function gotoMult(){
    console.log(1); 
    if(loggedUser.role_id === '1001')
      {navigate('/phmultiple')}
    else{navigate('/panelmultiple')}
  }

  return (
    <>
     <div className="p-2  ">
      <NavBar/>
     </div>
      <div className='container-fluid'>
        {notSubmitt && (
          <p className='alert alert-danger'>
            Please enter a valid Search Data
          </p>
        )}
       {/*  {notValidatee && !notSubmitt && (
          <p className='alert alert-danger'>
            Please Enter the 1 digit Number
          </p>
        )} */}

        <div>
          <h1 className='m-3 text-dark d-inline-block'>
            Panel Availability List
          </h1>

          <Button customClass='col-3 float-end mb-2 me-4 mt-4' click={gotoMult} >
            <FaPlus className='me-3 mb-1' />
            Add Panel Availability-Multiple
          </Button>
        </div>
        <div style={{ clear: "both" }}></div>
        <Button customClass='col-3 float-end mb-4 me-4 mt-2' click={()=>{navigate('/panelsingle')}}>
          <FaPlus className='me-4 mb-1' /> Add Panel
          Availability-Single
        </Button>

        <div
          className='container-wrap mt-5'
          style={{ clear: "both" }}>
          <form>
            <div className='row mb-3'>
              <Datepicker
                min={new Date().toISOString().split("T")[0]}
                value={fromDate}
                bootclasslabel='ms-4'
                label='From Date'
                placeholder='Select From Date'
                dateHandler={getFromDate}
              />
              <div className='col-sm-1'></div>
              <Datepicker
                min={fromDate}
                value={toDate}
                bootclasslabel='ms-4'
                label='To Date'
                placeholder='Select To Date'
                dateHandler={getToDate}
              />
            </div>
            <div className='row mb-3'>
              <FieldInput
                value={panelId}
                fieldInput={getPanelId}
                label='Panel Id'
                for='Panel Id'
                bootclasslabel='ms-4'
                type='text'
                placeholder='Enter Panel Id'
              />
              <div className='col-sm-1'></div>
              <FieldInput
                value={panelName}
                fieldInput={getPanelName}
                label='Panel Name'
                for='Panel Name'
                type='text'
                bootclasslabel='ms-4 '
                placeholder='Enter Panel Name'
              />
            </div>
            <div className='row mb-3'>
              <FieldInput
                value={email}
                fieldInput={getEmail}
                label='Email'
                for='Email'
                type='email'
                bootclasslabel='ms-4'
                placeholder='Enter Email Id'
              />

              <div className='col-sm-1'></div>
              <DropDown
                value={availabilityy}
                label='Status'
                for='Availability Status'
                bootclasslabel='ms-4'
                dropdown={getAvailabilityStatus}>
                <option
                  value=''
                  disabled>
                  Select Availability Status
                </option>
                {availstatdropdownItems}
              </DropDown>
            </div>
            <div className='row mb-3'>
              <DropDown
                value={rolee}
                label='Role'
                for='Role'
                bootclasslabel='ms-4'
                dropdown={getRole}>
                <option
                  value=''
                  disabled>
                  Select Role
                </option>
                {roledropdownItems}
              </DropDown>
              <div className='col-sm-1'></div>
              <DropDown
                value={interviewTypee}
                label='Interview Type'
                for='Interview Type'
                bootclasslabel='ms-4'
                dropdown={getInterviewType}>
                <option
                  value=''
                  disabled>
                  Select Interview Type
                </option>
                {inttypedropdownItems}
              </DropDown>
            </div>

            <Button
              type='button'
              click={handleSubmitSearch}
              customClass={" me-3 ms-4"}>
              Search
            </Button>

            <Button
              type='button'
              click={resetHandler}
              customClass={" me-3"}>
              Reset
            </Button>
            <span>
              <Button
                type='button'
                click={getCsvData}
                customClass={" me-3"}>
                Export Data
              </Button>
              <CSVLink
                data={csvData}
                style={{ display: "none" }}
                ref={excelRef}
                target='_blank'></CSVLink>
            </span>
          </form>
          {!notValidatee && (
            <SearchList
              roleList={dataListt}
              onNext={onNext}
              onPrevious={onPrevious}
              page={pagee}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PanelAvailabilityList;
