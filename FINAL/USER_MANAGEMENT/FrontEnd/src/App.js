import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import Navbar from './components/navbar';
import './App.css';
// import Home from './pages/home';
import AddUser from './pages/AddUser';
// import Edit from './pages/edit';

import UserList from './pages/UserList';
//import UpdateList from './pages/UpdateList';
// import { Route, Routes} from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
// import "./Utils.scss";
import UpdateUser from './pages/UpdateUser';
import LoginPage from './components/login_page/login';
import ForgotPasswordPage from './components/Forgot_password_page/Forgot_password';
import Password_reset from './components/Reset_password/reset_password';
import Navbar from './components/navbar';

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
       <Routes>
        <Route exact path='/' element={<LoginPage />}></Route>
        <Route exact path='/forgot' element={<ForgotPasswordPage />}></Route>
        <Route exact path='/reset' element={<Password_reset />}></Route>
        <Route path="/search" element={<UserList />} />
        <Route path="/search/:ID" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<UpdateUser />} />
      </Routes>
     
    </div>
  );
}

export default App;
