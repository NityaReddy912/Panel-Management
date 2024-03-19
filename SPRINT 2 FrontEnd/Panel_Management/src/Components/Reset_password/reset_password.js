import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  logout,
  selectUser,
} from "../../features/userSlice";
import { hashSync } from "bcryptjs";
import "./reset_password.css";
import logo from "../../assets/login-page-logo.png";
import visibleImg from "../../assets/visible.png";
import inVisibleImg from "../../assets/invisible.png";
import { toast } from "react-toastify";
const hostURL = "http://localhost:8080";
const user_data = JSON.parse(
  window.sessionStorage.getItem("user_data"),
);

console.log(user_data);

const logged_user_id = user_data?.user_id;
console.log(logged_user_id);

function PasswordReset() {
  const dispatch = useDispatch();
  var password = useRef(HTMLInputElement);
  var confirmPassword = useRef(HTMLInputElement);
  var email = useRef(HTMLInputElement);
  const [btnDisable, setbtnDisable] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(<></>);
  const [resetStatus, setResetStatus] = useState(<></>);
  const [cond1, setCond1] = useState(false);
  const [cond2, setCond2] = useState(false);
  const [cond3, setCond3] = useState(false);
  const [cond4, setCond4] = useState(false);
  const [cond5, setCond5] = useState(false);
  const [cond6, setCond6] = useState(false);
  var [visible, setVisible] = useState(false);
  var [visible2, setVisible2] = useState(false);
  const [cfPasswordDisable, setCfPasswordDisable] =
    useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      cond1 &&
      cond2 &&
      cond3 &&
      cond4 &&
      cond5 &&
      cond6
    ) {
      setCfPasswordDisable(false);
    } else {
      setCfPasswordDisable(true);
    }
  }, [cond1, cond2, cond3, cond4, cond5, cond6]);

  useEffect(() => {
    fetch(
      `http://localhost:8080/getbyid/${logged_user_id}`,
      {
        method: "GET",

        headers: {
          "x-access-token":
            window.sessionStorage.getItem("token"),

          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => res.json())

      .then((data, err) => {
        if (err) {
          console.log(err);

          return;
        }

        console.log(data);
        const temp = data.user[0];
        console.log(temp);
        // user_name.current.value = temp.name;
        email.current.value = temp.email;
        console.log(email.current.value);
      });
  }, []);

  function handleLogout() {
    const user_id = JSON.parse(
      window.sessionStorage.getItem("user_data"),
    ).user_id;
    fetch("http://localhost:8080/logout", {
      method: "PUT",
      headers: {
        "x-access-token":
          window.sessionStorage.getItem("token"),

        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });
    // window.sessionStorage.setItem('user_data', '');
    toast.success("Successfully Logged Out", {
      autoClose: 1000,
    });
    sessionStorage.removeItem("token");
    dispatch(logout());
    // window.sessionStorage.setItem('token', '')
    navigate("/");
  }

  function checkPassword() {
    if (
      password.current.value ===
      confirmPassword.current.value
    ) {
      setbtnDisable(false);

      setPasswordMatch(<></>);
    } else {
      setbtnDisable(true);

      setPasswordMatch(
        <small className='text-danger'>
          Passwords Doesn't match
        </small>,
      );

      // toast.error("Passwords Doesn't match");
    }

    if (!email.current.value.length) {
      setbtnDisable(true);
    } else {
      setbtnDisable(false);
    }
  }

  function checkPasswordConditions() {
    if (password.current.value.length < 8) {
      setCond1(false);
    } else {
      setCond1(true);
    }
    if (password.current.value.length > 15) {
      setCond6(false);
    } else {
      setCond6(true);
    }
    const alpha = "abcdefghijklmnopqrstuvwxyz";

    let cond = false;

    for (let i of password.current.value) {
      if (alpha.includes(i)) {
        setCond3(true);

        cond = true;

        break;
      }
    }

    if (!cond) {
      setCond3(false);
    }

    const Alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    cond = false;

    for (let i of password.current.value) {
      if (Alpha.includes(i)) {
        setCond2(true);

        cond = true;

        break;
      }
    }

    if (!cond) {
      setCond2(false);
    }

    const spcl = "!@#$%^&*()_+-=`~/[]{}:;'\".<>,?|\\";

    cond = false;

    for (let i of password.current.value) {
      if (spcl.includes(i)) {
        setCond4(true);

        cond = true;

        break;
      }
    }

    if (!cond) {
      setCond4(false);
    }

    const digit = "0123456789";

    cond = false;

    for (let i of password.current.value) {
      if (digit.includes(i)) {
        setCond5(true);

        cond = true;

        break;
      }
    }

    if (!cond) {
      setCond5(false);
    }
  }

  function cancel() {
    setbtnDisable(true);

    setPasswordMatch(<></>);

    navigate("/");
  }

  function reset(e) {
    e.preventDefault();

    fetch(hostURL + "/reset_password", {
      method: "PUT",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email.current.value,

        password: hashSync(password.current.value),
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);

        if (data.err) {
          setResetStatus(
            <small className='text-danger'>
              {data.err}
            </small>,
          );

          toast.error(data.err);

          return;
        }

        setResetStatus();

        handleLogout();

        toast.success(data.msg);

        return;
      })

      .catch((err) => {
        console.log(err);
      });
  }

  function toggleVisibility() {
    setVisible((prev) => !prev);
  }

  function toggleVisibility2() {
    setVisible2((prev) => !prev);
  }
  return (
    <header align='center'>
      <div className='container p-4 password-reset-page-content col-md-5'>
        <img
          src={logo}
          className='img-fluid'
          alt='logo'
        />

        <br />

        <h1>Password Reset</h1>

        <form className='password-reset-page-form'>
          <div className='form-group'>
            <label
              for='reset-email-id'
              className='loginInput'
              style={{ float: "left" }}>
              <b>Email</b>
            </label>

            <input
              ref={email}
              disabled='true'
              id='reset-email-id'
              type='email'
              onInput={checkPassword}
              className='form-control'
              placeholder='Enter your email'
            />
          </div>

          <div className='form-group'>
            <label
              for='reset-password'
              className='loginInput'
              style={{ float: "left" }}>
              <b>Password</b>
            </label>

            <div className='password-field'>
              <input
                ref={password}
                id='reset-password'
                type={visible ? "text" : "password"}
                onChange={checkPasswordConditions}
                className='form-control passwords reset-input'
                placeholder='Enter your Password'
              />

              <img
                id='password-visibility'
                onClick={toggleVisibility}
                src={
                  visible ? visibleImg : inVisibleImg
                }></img>
            </div>
          </div>

          <div className='password-rules'>
            <ul
              style={{
                listStyleType: "none",

                fontSize: "x-small",

                float: "left",

                textJustify: "left",
              }}>
              <li
                align='left'
                className={
                  cond1 ? "text-success" : "text-danger"
                }>
                {cond1 ? <>&#x2705;</> : <>&#x274C;</>}{" "}
                Atleast 8 characters long.
              </li>

              <li
                align='left'
                className={
                  cond6 ? "text-success" : "text-danger"
                }>
                {" "}
                {cond6 ? <>&#x2705;</> : <>&#x274C;</>}
                Maximum 15 characters long.{" "}
              </li>
              <li
                align='left'
                className={
                  cond2 ? "text-success" : "text-danger"
                }>
                {cond2 ? <>&#x2705;</> : <>&#x274C;</>}{" "}
                Atleast one Uppercase Alphabet.
              </li>
              <li
                align='left'
                className={
                  cond3 ? "text-success" : "text-danger"
                }>
                {cond3 ? <>&#x2705;</> : <>&#x274C;</>}{" "}
                Atleast one Lowercase Alphabet.
              </li>
              <li
                align='left'
                className={
                  cond4 ? "text-success" : "text-danger"
                }>
                {cond4 ? <>&#x2705;</> : <>&#x274C;</>}{" "}
                Atleast one special Character.
              </li>
              <li
                align='left'
                className={
                  cond5 ? "text-success" : "text-danger"
                }>
                {cond5 ? <>&#x2705;</> : <>&#x274C;</>}{" "}
                Atleast one Digit.
              </li>
            </ul>
          </div>

          <div className='form-group'>
            <label
              for='confirm-password'
              style={{ float: "left" }}
              className='loginInput'>
              <b>Confirm Password</b>
            </label>

            <div className='password-field'>
              <input
                ref={confirmPassword}
                disabled={cfPasswordDisable}
                id='confirm-pasword'
                onInput={checkPassword}
                type={visible2 ? "text" : "password"}
                className='form-control'
                placeholder='Confirm your Password'
              />

              <img
                id='password-visibility'
                style={{
                  display: cfPasswordDisable ? "none" : "",
                }}
                onClick={toggleVisibility2}
                src={
                  visible2 ? visibleImg : inVisibleImg
                }></img>
            </div>
          </div>

          {passwordMatch}

          <div
            style={{
              display: "flex",

              justifyContent: "space-between",
            }}>
            <button
              onClick={reset}
              disabled={btnDisable}
              className='btn btn-primary col-5'>
              Reset Password
            </button>

            <button
              onClick={cancel}
              className='btn btn-primary col-5'>
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}

export default PasswordReset;
