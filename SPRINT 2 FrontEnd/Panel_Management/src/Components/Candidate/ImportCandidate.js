import React from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
//import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./app.css";
import Headers from "../Utils/Headers";

const allowedExtensions = ["csv"];

function ImportCandidate() {
  const history = useNavigate();
  function cancel() {
    history("/candidate");
  }

  const [dataa, setDataa] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState(
    "Select File to import candidates",
  );

  const postData = async (parsedData) => {
    const res = await fetch(
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

    const data = await res.json();
    console.log("data : " + data);
    //const msg = JSON.stringify(data);

    // if (res.status === 422 || !data) {
    //   //window.alert(`Invalid Registration`);
    //   toast.error("Invalid Registration");
    //   console.log("Invalid Registration");
    // } else
    if (res.status === 500 || !data) {
      //window.alert(`Invalid Registration ${msg}`);
      toast.error("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      //window.alert("Registration Sucessfull");
      toast.success(data);
      console.log("Registration Sucessfull");
    }
  };

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

      for (var i = 1; i < nx; ++i) {
        if (!lines[i]) continue;
        var obj = {};
        var currentline = lines[i].trim("\n").split(",");
        for (var j = 0; j < hl; ++j) {
          let one = currentline[j];
          if (typeof one === "null") break;
          obj[headers[j]] = one;
        }

        result.push(obj);
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
      </div>
    </div>
  );
}

export default ImportCandidate;
