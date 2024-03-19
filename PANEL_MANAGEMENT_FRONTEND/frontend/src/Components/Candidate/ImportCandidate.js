import React, { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
//import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./app.css";
import "./add.css";
import Headers from "../Utils/Headers";

const allowedExtensions = ["csv"];

function ImportCandidate() {
  const [rowData, setRowData] = useState([]);
  const [dummy, setDummy] = useState([]);
  const [t, setT] = useState([]);
  const [rec, setRec] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState(
    "Select File to import candidates",
  );

  const history = useNavigate();
  function cancel() {
    history("/candidate");
    datafetch = [];
    invalidData = [];
  }
  let datafetch = [],
    res,
    invalidData = [];

  const postData = async (parsedData) => {
    res = await fetch(
      "http://localhost:7000/postmultiple",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: parsedData,
        }),
      },
    );
    datafetch = await res.json();
    console.log("datafetch-------------", datafetch);

    // let  msg = JSON.stringify(datafetch);
    setDummy(invalidData);
    setRowData(datafetch);
    console.log("datafetch inside fetch api : ", datafetch);
    console.log("MSG  ", rowData);

    // if (res.status === 422 || !data) {
    //   //window.alert(`Invalid Registration`);
    //   toast.error("Invalid Registration");
    //   console.log("Invalid Registration");
    // } else
    console.log("--------------------");
    console.log("res status :", res.status);
    if (res.status === 500) {
      //window.alert(`Invalid Registration ${msg}`);
      toast.error("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      console.log(
        "----------inside else------rowdata",
        JSON.stringify(rowData),
      );
      if (JSON.stringify(rowData) === JSON.stringify([])) {
        toast.success("Registration Successfull");
      } else {
        toast.success("duplicates are present");
      }
      // toast.success(JSON.stringify(rowData));
      console.log("Registration Sucessfull");
    }
  };

  useEffect(() => {}, [rowData, dummy]);

  const handleFileChange = (e) => {
    setError("");
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }
      setFile(inputFile);
      setFileName(inputFile.name);
    }
  };

  const handleParseAndSend = () => {
    console.log(
      "---------------start-1--------------------",
    );
    function csvJSON(csv) {
      function validateName(name) {
        const regex = /^[A-Za-z ]+$/;

        return regex.test(name);
      }

      function validatePAN(pan) {
        let regex =
          /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

        return regex.test(pan);
      }

      function validateContact(contact) {
        if (!/^\d{10}$/.test(contact)) {
          return false;
        } else {
          return true;
        }
      }

      function validateEmail(email) {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(String(email).toLowerCase());
      }

      function validateExperience(experience) {
        return parseFloat(experience) > 0;
      }
      //console.log(csv)
      let lines = csv.split("\n");
      let result = [];
      // NOTE: If your columns contain commas in their values, you'll need
      // to deal with those before doing the next step
      // (you might convert them to &&& or something, then covert them back later)
      // jsfiddle showing the issue https://jsfiddle.net/
      let headers = lines[0].trim("\n").split(",");
      const nx = lines.length;
      const hl = headers.length;
      for (let i = 1; i < nx; ++i) {
        if (!lines[i]) continue;
        var obj = {};
        var currentline = lines[i].trim("\n").split(",");
        console.log(
          "current line ---------------------;;;;;;;;;;;;;;",
          currentline,
        );

        if (currentline.length == 6) {
          let flag = true;

          for (let j = 0; j < hl; ++j) {
            let current = currentline[j];

            console.log("xyz", current);

            if (j === 0) {
              //name

              current =
                current[0].toUpperCase() +
                current.substring(1);

              if (!validateName(current)) flag = false;
            } else if (j === 1) {
              //email

              current = current.toLowerCase();

              if (!validateEmail(current)) flag = false;
            } else if (j == 2) {
              //contact

              if (!validateContact(current)) flag = false;
            } else if (j === 3) {
              //pan

              current = current.toUpperCase();

              if (!validatePAN(current)) flag = false;
            } else if (j === 4) {
              //role
            } else if (j === 5) {
              if (!validateExperience(current))
                flag = false;
            } else {
            }

            obj[headers[j]] = current;
          }

          if (flag == true) {
            result.push(obj);
          } else {
            invalidData.push(obj);
          }
        }
      }

      return result; //JavaScript object
    }
    console.log("Hello psend");
    if (!file) return setError("Enter a valid file");
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      console.log("--------------start-2-----------------");
      let parsedData = csvJSON(target.result);
      // console.log(parsedData);
      parsedData = parsedData.filter((item) => {
        if (item.candidate_name.length) {
          return true;
        }
        return false;
      });
      console.log(parsedData);
      setDataa([
        "candidate_name",
        "email",
        "contact",
        "pan",
        "role",
        "it_experience_years",
      ]);
      await postData(parsedData);
      console.log(
        "--------------end-2---------------------",
      );
    };
    reader.readAsText(file);

    console.log(
      "----------------end-1----------------------",
    );
  };

  const data = [
    {
      candidate_name: "",
      email: "",
      contact: "",
      pan: "",
      role: "",
      it_experience_years: "",
    },
  ];
  const headers = [
    { label: "candidate_name", key: "candidate_name" },
    { label: "email", key: "email" },
    { label: "contact", key: "contact" },
    { label: "pan", key: "pan" },
    { label: "role", key: "role" },
    {
      label: "it_experience_years",
      key: "it_experience_years",
    },
  ];

  const csvTemplate = {
    filename: "Template.csv",
    headers: headers,
    data: data,
  };

  //const d = [{candidate_name:"vasu", email:"abc@gmail.com", contact : "7689876543", pan:"HGFDT6543R", role:"AES-FED-MEAN", it_experience_years:"2"}]
  return (
    <div className='wrapper'>
      <Headers />
      <div className='p-3'>
        <div className='row'>
          <span className='content1'>
            <h2> Import Candidates</h2>
          </span>
          <div className='col-md-11 my-2 mx-auto text-right d-grid gap-2 d-md-flex justify-content-md-end'>
            <div className='btn btn-primary btn-sm float-end py-2'>
              <CSVLink
                {...csvTemplate}
                id='download_template'>
                Download Template
              </CSVLink>
            </div>
          </div>
          <div className=''>
            <span>
              <b>Select File</b>
              <input
                id='file-input'
                className='content6'
                type='file'
                placeholder='Select File to import Candidates'
                onChange={handleFileChange}
              />
              <label
                for='file-input'
                id='file-ip-label'
                className='col-sm-2 col-form-label fw-lighter ms-5'>
                <div id='file-input-label'>
                  <span>{fileName} </span>
                  <div style={{ float: "right" }}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-upload'
                      viewBox='0 0 16 16'>
                      <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z' />
                      <path d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z' />
                    </svg>
                  </div>
                </div>
              </label>
            </span>
            <span className='content3'>
              <button
                className='btn btn-primary btn-xl '
                onClick={handleParseAndSend}>
                Upload File
              </button>
            </span>
            <span>{"   "}</span>
            <span className='content4'>
              <button
                className='btn btn-primary btn-xl'
                onClick={cancel}>
                {" "}
                Cancel
              </button>
            </span>
            <div style={{ marginTop: "3rem" }}>
              {error
                ? error
                : dataa.map((col, idx) => (
                    <div key={idx}></div>
                  ))}
            </div>
          </div>
        </div>
        {/* </div> */}

        <div>
          {Array.isArray(rowData) && rowData.length > 0 ? (
            <table
              className='table table-striped table-responsive'
              style={{ paddingLeft: "5px" }}>
              <thead>
                <h4>Duplicate Data</h4>
                <tr>
                  <th
                    scope='col'
                    className=''>
                    Name
                  </th>
                  <th
                    scope='col'
                    className=''>
                    Email
                  </th>
                  <th
                    scope='col'
                    className='w-15'>
                    Contact
                  </th>
                  <th
                    scope='col'
                    className='table_pan'>
                    PAN
                  </th>
                  <th
                    scope='col'
                    className='table_role px-3'>
                    Role
                  </th>
                  <th
                    scope='col'
                    className='table_exp'>
                    Experience
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(rowData) &&
                  rowData?.map((row) => (
                    <tr className='table_padding'>
                      <td
                        scope='col'
                        className=''>
                        {row.candidate_name}
                      </td>
                      <td
                        scope='col'
                        className=''>
                        {row.email}
                      </td>
                      <td
                        scope='col'
                        className=''>
                        {row.contact}
                      </td>
                      <td
                        scope='col'
                        className='table_pan '>
                        {row.pan}
                      </td>
                      <td
                        scope='col'
                        className='table_role px-3'>
                        {row.role}
                      </td>
                      <td
                        scope='col'
                        className='table_exp px-4 '>
                        {row.it_experience_years}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : null}
        </div>

        <div>
          {dummy.length && dummy.length > 0 ? (
            <table
              className='table table-striped table-responsive'
              style={{ paddingLeft: "5px" }}>
              <thead>
                <h4>Invalid Data</h4>

                <tr>
                  <th
                    scope='col'
                    className=''>
                    Candidate Name
                  </th>

                  <th
                    scope='col'
                    className=''>
                    Email
                  </th>

                  <th
                    scope='col'
                    className='w-15'>
                    Contact
                  </th>

                  <th
                    scope='col'
                    className='table_pan'>
                    PAN
                  </th>

                  <th
                    scope='col'
                    className='table_role px-3'>
                    Role
                  </th>

                  <th
                    scope='col'
                    className='table_exp'>
                    Experience
                  </th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(dummy) &&
                  dummy?.map((row) => (
                    <tr className='table_padding'>
                      <td
                        scope='col'
                        className=''>
                        {row.candidate_name}
                      </td>

                      <td
                        scope='col'
                        className=''>
                        {row.email}
                      </td>

                      <td
                        scope='col'
                        className=''>
                        {row.contact}
                      </td>

                      <td
                        scope='col'
                        className='table_pan '>
                        {row.pan}
                      </td>

                      <td
                        scope='col'
                        className='table_role px-3'>
                        {row.role}
                      </td>

                      <td
                        scope='col'
                        className='table_exp px-4 '>
                        {row.it_experience_years}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ImportCandidate;
