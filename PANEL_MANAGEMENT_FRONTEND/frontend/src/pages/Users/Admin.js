import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddCandidateStatus from "../../pages/AddPage/AddCandidateStatus";
import AddGrade from "../../pages/AddPage/AddGrade";
import AddPanelLevel from "../../pages/AddPage/AddPanelLevel";
import AddPanelType from "../../pages/AddPage/AddPanelType";
import AddRole from "../../pages/AddPage/AddRole";
import CandidateStatus from "../../pages/CandidateStatus";
import Grade from "../../pages/Grade";
import PanelLevel from "../../pages/PanelLevel";
import PanelType from "../../pages/PanelType";
import Role from "../../pages/Role";
import UpdateCandidateStatus from "../../pages/UpdatePage/UpdateCandidateStatus";
import UpdateGrade from "../../pages/UpdatePage/UpdateGrade";
import UpdatePanelLevel from "../../pages/UpdatePage/UpdatePanelLevel";
import UpdatePanelType from "../../pages/UpdatePage/UpdatePanelType";
import UpdateRole from "../../pages/UpdatePage/UpdateRole";
import "../../Main.scss";

function Admin() {
  return (
    <Routes>
      <Route
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
      />
    </Routes>
  );
}

export default Admin;
