import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddCandidateStatus from "./pages/AddPage/AddCandidateStatus";
import AddGrade from "./pages/AddPage/AddGrade";
import AddPanelLevel from "./pages/AddPage/AddPanelLevel";
import AddPanelType from "./pages/AddPage/AddPanelType";
import AddRole from "./pages/AddPage/AddRole";
import CandidateStatus from "./pages/CandidateStatus";
import Grade from "./pages/Grade";
import PanelLevel from "./pages/PanelLevel";
import PanelType from "./pages/PanelType";
import Role from "./pages/Role";
import UpdateCandidateStatus from "./pages/UpdatePage/UpdateCandidateStatus";
import UpdateGrade from "./pages/UpdatePage/UpdateGrade";
import UpdatePanelLevel from "./pages/UpdatePage/UpdatePanelLevel";
import UpdatePanelType from "./pages/UpdatePage/UpdatePanelType";
import UpdateRole from "./pages/UpdatePage/UpdateRole";
import "./Main.scss";
import Login from "./Components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/userSlice";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Headers from "./Components/Utils/Headers";
import AddUser from "./Components/User/AddUser";
import UpdateUser from "./Components/User/UpdateUser";
import UserList from "./Components/User/UserList";
import ForgotPassword from "./Components/Forgot_password_page/Forgot_password";
import PasswordReset from "./Components/Reset_password/reset_password";
import ImportCandidate from "./Components/Candidate/ImportCandidate";
import EditCandidate from "./Components/Candidate/EditCandidate";
import AddCandidate from "./Components/Candidate/AddCandidate";
import CandidateList from "./Components/Candidate/CandidateList";
import ScheduleInterview from "./Components/Interview/ScheduleInterview";
import ConfirmSchedule from "./Components/Interview/ConfirmSchedule";
import PanelList from "./Components/Panel/PanelList/PanelList";
import PanelAvailabilityList from "./Components/Panel/PanelAvailibility/Pages/Panel/PanelAvailabilityList";
import AddPanel from "./Components/Panel/AddPanel/AddPanel";
import EditPanel from "./Components/Panel/EditPanel/EditPanel";
import AddPanelAvailbilityPANELmultiple from "./Components/Panel/AddPanelAvailibilityPANEL/multiple/PANELmultiple";
import AddPanelAvailbilityPANELsingle from "./Components/Panel/AddPanelAvailibilityPANEL/single/PANELsingle";
import AddPanelAvailibilityPHmultiple from "./Components/Panel/AddPanelAvailibilityPH/multiple/PHmultiple";
import UpdatePanelAvailibility from "./Components/Panel/updatePanel/updatePanel";

function App() {
  const [role, setRole] = useState();
  const user = useSelector(selectUser);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    let isApiSubscribed = true;

    if (token) {
      const decode = jwt_decode(token);
      console.log(decode);
      if (!user) {
        dispatch(
          login({
            user_id: decode.User_ID,
            email: decode.email,
            username: decode.name,
            role_id: decode.role_id,
          }),
        );
      }

      if (user) {
        console.log(user);
        const getRoleList = async () => {
          const roleListResponse = await fetch(
            `http://localhost:5000/role/role-id/${user.role_id}`,
            {
              headers: {
                "x-access-token":
                  window.sessionStorage.getItem("token"),
              },
            },
          );

          const roleListData =
            await roleListResponse.json();
          console.log(roleListData);

          setRole(roleListData?.role_name);
        };

        if (isApiSubscribed) {
          getRoleList();
        }
      }
    }

    return () => {
      isApiSubscribed = false;
    };
  }, [token, user, dispatch]);

  console.log(user);
  console.log(role);

  return (
    <>
      <ToastContainer />

      <Routes>
        {!user ? (
          <>
            <Route
              path='/'
              element={<Navigate to='/login' />}
            />
            <Route
              path='/role'
              element={<Navigate to='/login' />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/forgot'
              element={<ForgotPassword />}></Route>
            <Route
              path='/reset'
              element={<PasswordReset />}></Route>
          </>
        ) : (
          <>
            {user?.role_id === 1001 && (
              <>
                <Route
                  path='/'
                  element={<Navigate to='/role' />}
                />
                <Route
                  path='/login'
                  element={<Navigate to='/role' />}
                />
                <Route
                  path='/reset'
                  element={<PasswordReset />}></Route>

                <Route
                  path='/role'
                  element={<Role />}
                />
                <Route
                  path='/role/add'
                  element={<AddRole />}
                />
                <Route
                  path='/role/update/:id'
                  element={<UpdateRole />}
                />
                <Route
                  path='/panel-type'
                  element={<PanelType />}
                />
                <Route
                  path='/panel-type/add'
                  element={<AddPanelType />}
                />
                <Route
                  path='/panel-type/update/:id'
                  element={<UpdatePanelType />}
                />
                <Route
                  path='/panel-level'
                  element={<PanelLevel />}
                />
                <Route
                  path='/panel-level/add'
                  element={<AddPanelLevel />}
                />
                <Route
                  path='panel-level/update/:id'
                  element={<UpdatePanelLevel />}
                />
                <Route
                  path='/grade'
                  element={<Grade />}
                />
                <Route
                  path='/grade/add'
                  element={<AddGrade />}
                />
                <Route
                  path='/grade/update/:id'
                  element={<UpdateGrade />}
                />
                <Route
                  path='/candidate-status'
                  element={<CandidateStatus />}
                />
                <Route
                  path='/candidate-status/add'
                  element={<AddCandidateStatus />}
                />
                <Route
                  path='/candidate-status/update/:id'
                  element={<UpdateCandidateStatus />}
                />
                <Route
                  path='/user'
                  element={<UserList />}
                />
                <Route
                  path='/add'
                  element={<AddUser />}
                />
                <Route
                  path='/edit/:id'
                  element={<UpdateUser />}
                />
                <Route
                  path='/candidate'
                  element={<CandidateList />}
                />
                <Route
                  path='/add-candidate'
                  element={<AddCandidate />}
                />
                <Route
                  path='/candidate-edit/:id'
                  element={<EditCandidate />}
                />
                <Route
                  path='/candidate-import'
                  element={<ImportCandidate />}
                />
                <Route
                  exact
                  path='/panelList'
                  element={<PanelList />}
                />
                <Route
                  exact
                  path='/panelavailbility'
                  element={<PanelAvailabilityList />}
                />
                <Route
                  exact
                  path='/addpanel'
                  element={<AddPanel />}
                />
                <Route
                  exact
                  path='/:id/editpanel'
                  element={<EditPanel />}
                />
                <Route
                  exact
                  path='/panelmultiple'
                  element={
                    <AddPanelAvailbilityPANELmultiple />
                  }
                />
                <Route
                  exact
                  path='/panelsingle'
                  element={
                    <AddPanelAvailbilityPANELsingle />
                  }
                />
                <Route
                  exact
                  path='/phmultiple'
                  element={
                    <AddPanelAvailibilityPHmultiple />
                  }
                />
                <Route
                  exact
                  path='/UpdatePanel/:id/:name/:availdate/:grade'
                  element={<UpdatePanelAvailibility />}
                />
                <Route
                  path='/interview-schedule/:id'
                  element={<ScheduleInterview />}
                />
                <Route
                  path='/confirm/:id'
                  element={<ConfirmSchedule />}
                />
              </>
            )}
            {user.role_id === 1003 && (
              <>
                <Route
                  path='/'
                  element={<Navigate to='/user' />}
                />
                <Route
                  path='/login'
                  element={<Navigate to='/user' />}
                />
                <Route
                  path='/reset'
                  element={<PasswordReset />}></Route>

                <Route
                  path='/'
                  element={<Navigate to='/user' />}
                />
                <Route
                  path='/user'
                  element={<UserList />}
                />
                <Route
                  path='/add'
                  element={<AddUser />}
                />
                <Route
                  path='/edit/:id'
                  element={<UpdateUser />}
                />
                <Route
                  path='/candidate'
                  element={<CandidateList />}
                />
                <Route
                  path='/add-candidate'
                  element={<AddCandidate />}
                />
                <Route
                  path='/candidate-edit/:cid'
                  element={<EditCandidate />}
                />
                <Route
                  path='/candidate-import'
                  element={<ImportCandidate />}
                />
                <Route
                  exact
                  path='/panelList'
                  element={<PanelList />}
                />
                <Route
                  exact
                  path='/panelavailbility'
                  element={<PanelAvailabilityList />}
                />
                <Route
                  exact
                  path='/addpanel'
                  element={<AddPanel />}
                />
                <Route
                  exact
                  path='/:id/editpanel'
                  element={<EditPanel />}
                />
                <Route
                  exact
                  path='/panelmultiple'
                  element={
                    <AddPanelAvailbilityPANELmultiple />
                  }
                />
                <Route
                  exact
                  path='/panelsingle'
                  element={
                    <AddPanelAvailbilityPANELsingle />
                  }
                />
                <Route
                  exact
                  path='/phmultiple'
                  element={
                    <AddPanelAvailibilityPHmultiple />
                  }
                />
                <Route
                  exact
                  path='/UpdatePanel/:id/:name/:availdate/:grade'
                  element={<UpdatePanelAvailibility />}
                />
                <Route
                  path='/interview-schedule/:id'
                  element={<ScheduleInterview />}
                />
                <Route
                  path='/confirm/:id'
                  element={<ConfirmSchedule />}
                />
              </>
            )}
            {user.role_id === 1002 && (
              <>
                <Route
                  path='/'
                  element={<Navigate to='/user' />}
                />
                <Route
                  path='/login'
                  element={<Navigate to='/user' />}
                />
                <Route
                  path='/reset'
                  element={<PasswordReset />}></Route>
                <Route
                  path='/user'
                  element={<UserList />}
                />
                <Route
                  path='/add'
                  element={<AddUser />}
                />
                <Route
                  path='/edit/:id'
                  element={<UpdateUser />}
                />
                <Route
                  path='/candidate-import'
                  element={<ImportCandidate />}
                />
                <Route
                  path='/candidate'
                  element={<CandidateList />}
                />
                <Route
                  path='/add-candidate'
                  element={<AddCandidate />}
                />
                <Route
                  path='/candidate-edit/:id'
                  element={<EditCandidate />}
                />
                <Route
                  exact
                  path='/panelList'
                  element={<PanelList />}
                />
                <Route
                  exact
                  path='/panelavailbility'
                  element={<PanelAvailabilityList />}
                />
                <Route
                  exact
                  path='/addpanel'
                  element={<AddPanel />}
                />
                <Route
                  exact
                  path='/:id/editpanel'
                  element={<EditPanel />}
                />
                <Route
                  exact
                  path='/panelmultiple'
                  element={
                    <AddPanelAvailbilityPANELmultiple />
                  }
                />
                <Route
                  exact
                  path='/panelsingle'
                  element={
                    <AddPanelAvailbilityPANELsingle />
                  }
                />
                <Route
                  exact
                  path='/phmultiple'
                  element={
                    <AddPanelAvailibilityPHmultiple />
                  }
                />
                <Route
                  exact
                  path='/UpdatePanel/:id/:name/:availdate/:grade'
                  element={<UpdatePanelAvailibility />}
                />
                <Route
                  path='/interview-schedule/:id'
                  element={<ScheduleInterview />}
                />
                <Route
                  path='/confirm/:id'
                  element={<ConfirmSchedule />}
                />
              </>
            )}
            {/* <Route
            path='/'
            element={<Navigate to='/role' />}
          />
          <Route
            path='/role'
            element={<Role />}
          />
          <Route
            path='/role/add'
            element={<AddRole />}
          />
          <Route
            path='/role/update/:id'
            element={<UpdateRole />}
          />
          <Route
            path='/panel-type'
            element={<PanelType />}
          />
          <Route
            path='/panel-type/add'
            element={<AddPanelType />}
          />
          <Route
            path='/panel-type/update/:id'
            element={<UpdatePanelType />}
          />
          <Route
            path='/panel-level'
            element={<PanelLevel />}
          />
          <Route
            path='/panel-level/add'
            element={<AddPanelLevel />}
          />
          <Route
            path='/panel-level/update/:id'
            element={<UpdatePanelLevel />}
          />
          <Route
            path='/grade'
            element={<Grade />}
          />
          <Route
            path='/grade/add'
            element={<AddGrade />}
          />
          <Route
            path='/grade/update/:id'
            element={<UpdateGrade />}
          />
          <Route
            path='/candidate-status'
            element={<CandidateStatus />}
          />
          <Route
            path='/candidate-status/add'
            element={<AddCandidateStatus />}
          />
          <Route
            path='/candidate-status/update/:id'
            element={<UpdateCandidateStatus />}
          /> */}
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
