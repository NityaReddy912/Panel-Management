import React, {
  useReducer,
  useState,
  useRef,
  useEffect,
  useMemo
} from "react";
// import ReactPaginate from "react-paginate"
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Paginator from '../PanelAvailibility/Pages/Panel/Paginator'

import NavBar from '../../Utils/Headers';
import SearchList from "../../SearchList/SearchList";

const hostURL = "http://localhost:8000";
function PanelList() {
  const [searchList, setSearchList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const assocID = useRef(HTMLInputElement);
  const assocName = useRef(HTMLInputElement);
  const email = useRef(HTMLInputElement);
  const role = useRef(HTMLInputElement);
  const grade = useRef(HTMLInputElement);
  const isActive = useRef(HTMLInputElement);
  const interviewType = useRef(HTMLInputElement);

  async function search(e) {
    e.preventDefault();
    fetch(hostURL + "/panelList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: assocID.current.value,
        name: assocName.current.value,
        email: email.current.value,
        role: role.current.value,
        grade: grade.current.value,
        interviewType: interviewType.current.value,
        isActive: isActive.current.checked,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setSearchList(result.data);
        setTotalPages(result.totalItems);
      });
  }

  async function handleActivateUser(item) {
    console.log(item);
    const raw_data = await fetch(
      hostURL + "/panelList/updateActive/" + item.user_id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: item.is_active }),
      },
    );
    if (item.is_active) {
      toast.success("User Inactivated", {
        autoClose: 1000,
      });
    } else {
      toast.success("User Activated", { autoClose: 1000 });
    }
    const data = await raw_data.json();
    setPage(1);
    search({ preventDefault: () => { } });
  }

  useEffect(() => {
    isActive.current.checked = true;
    search({ preventDefault: () => { } });
  }, []);

  const pageSize = 10;
  const PageCount = totalPages / pageSize;


  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return SearchList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);


  return (
    <div className="p-2">
      <NavBar />

      <div className='container-wrap px-3'>
        <h2>Panels List</h2>
        <div className='container-wrap'>
          <form className='px-2'>
            <div className='row mb-4'>
              <div className='col-md-12'>
                {/* <Link to="/add"> */}
                <button
                  type='submit'
                  onClick={(e) => {
                    navigate("/addpanel");
                  }}
                  className='btn btn-primary float-end ms-4 '>
                  +Add Panel
                </button>
                {/* </Link> */}
              </div>
            </div>
            <div className='row mb-6'>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    htmlFor='userid'>
                    Associate Id
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='userid'
                    ref={assocID}
                    maxLength="7"
                    placeholder='Enter Associate Id '
                  />
                </div>
              </div>
              <div className="col-sm-1"></div>

              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    htmlFor='name'>
                    Name
                  </label>
                </div>
              </div>

              <div className='col-md-4'>
                <div className='form-group '>
                  <input
                    ref={assocName}
                    type='text'
                    className='form-control'
                    maxLength="30"
                    placeholder='Enter Associate Name'
                    id='name'
                  />
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    htmlFor='grade'>
                    Grade
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <select
                    className='form-select'
                    ref={grade}>
                    <option value=''>Select Grade</option>
                    <option value='c1'>c1</option>
                    <option value='c2'>c2</option>
                    <option value='d1'>d1</option>
                    <option value='d2'>d2</option>
                    <option value='e1'>e1</option>
                    <option value='e2'>e2</option>
                    <option value='f1'>f1</option>
                    <option value='f2'>f2</option>
                  </select>
                </div>
              </div>
              {/* &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; */}
              <div className="col-sm-1"></div>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    htmlFor='first'>
                    Interview Type
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <select
                    id='role'
                    ref={interviewType}
                    className='form-select'
                    aria-label='Select Role'>
                    <option value=''>
                      Select Interview Type
                    </option>
                    <option value='L1'>L1</option>
                    <option value='L2'>L2</option>
                    <option value='L1-L2'>L1&L2</option>
                    <option value='HR'>HR</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    htmlFor='email'>
                    Email
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    ref={email}
                    placeholder='Enter Email'
                  />
                </div>
              </div>
              <div className="col-sm-1"></div>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    htmlFor='first'>
                    Roles
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <select
                    id='role'
                    ref={role}
                    className='form-select'
                    aria-label='Select Role'>
                    <option value=''>Select Role</option>
                    {/* <option value="AES-DigitalFS-JavaMS">AES-DigitalFS-JavaMS</option>
                                    <option value="AES-DigitalFS-JavaFS">AES-DigitalFS-JavaFS</option>
                                    <option value="AES-DigitalFS-DotnetFS">AES-DigitalFS-DotnetFS</option>
                                    <option value="AES-FED-Angular">AES-FED-Angular</option>
                                    <option value="AES-FED-React">AES-FED-React</option>
                                    <option value="AES-FED-MEAN">AES-FED-MEAN</option>
                                    <option value="AES-FED-MERN">AES-FED-MERN</option>
                                    <option value="AES-AgileDevOps-Agile">AES-AgileDevOps-Agile</option>
                                    <option value="AES-AgileDevOps-DevOps">AES-AgileDevOps-DevOps</option>
                                    <option value="AES-DigitalPlatforms-AEM">AES-DigitalPlatforms-AEM</option>
                                    <option value="AES-DigitalPlatforms-Liferay">AES-DigitalPlatforms-Liferay</option>
                                    <option value="AES-DigitalPlatforms-Sitecore">AES-DigitalPlatforms-Sitecore</option>
                                    <option value="AES-DigitalPlatforms-M365">AES-DigitalPlatforms-M365</option>
                                    <option value="AES-DigitalPlatforms-Drupal">AES-DigitalPlatforms-Drupal</option>
                                    <option value="AES-Lowcode-Outsystems">AES-Lowcode-Outsystems</option>
                                    <option value="AES-Lowcode-MSApps">AES-Lowcode-MSApps</option>
                                    <option value="AES-Mobility-IOS">AES-Mobility-IOS</option>
                                    <option value="AES-Mobility-Android">AES-Mobility-Android</option>
                                    <option value="AES-Mobility-ReactNative">AES-Mobility-ReactNative</option>
                                    <option value="AES-ApplicationModernization-Mainframe">AES-ApplicationModernization-Mainframe</option>
                                    <option value="AES-DigitalFS-Integration">AES-DigitalFS-Integration</option>
                                    <option value="AES-CloudApps-Azure">AES-CloudApps-Azure</option>
                                    <option value="AES-CloudApps-AWS">AES-CloudApps-AWS</option>
                                    <option value="AES-CloudApps-GCP">AES-CloudApps-GCP</option>
                                    <option value="AES-Mobility-Others">AES-Mobility-Others</option> */}
                    <option value={"practice head"}>
                      Practice Head(PH)
                    </option>
                    <option value={"talent acquisition"}>
                      Talent Acquisition(TA)
                    </option>
                    <option value={"panel"}>
                      Panel(Interviewer)
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <div className='col-md-1'>
                <div className='form-group'>
                  <label
                    className='fw-bolder'
                    htmlFor='userid'>
                    IsActive
                  </label>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <div className='col-sm-3 form-check form-switch'>
                    <input
                      ref={isActive}
                      className='form-check-input'
                      type='checkbox'
                      data-testid='checkbox'
                      role='switch'
                      id='isActive'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='row addList__button'>
              <div className='col-md-1'>
                <button
                  type='submit'
                  onClick={search}
                  className='btn btn-primary'
                  data-testid='submit'
                  value=''>
                  Search
                </button>
              </div>
            </div>

            <div className='col-sm-12 overflow-auto'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Associate Id</th>
                    <th>Associate Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Grade</th>
                    <th>Roles</th>
                    <th>Interview Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {searchList.map((item, index) => {
                    if (
                      index >= (page - 1) * pageSize &&
                      index < page * pageSize
                    ) {
                      return (
                        <tr key={index}>
                          <th scope='row'>{index + 1}</th>
                          <td>{item.user_id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.contact}</td>
                          <td>{item.grade}</td>
                          <td>{item.role_name}</td>
                          <td>{item.type}</td>
                          <td>
                            <FaPencilAlt
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(
                                  "/" +
                                  item.user_id +
                                  "/editpanel",
                                );
                              }}
                            />
                            &emsp;|&emsp;
                            <div className='col-sm-3 form-check form-switch'>
                              <input
                                className='form-check-input'
                                checked={item.is_active}
                                type='checkbox'
                                onChange={(e) => {
                                  e.preventDefault();
                                  handleActivateUser(item);
                                }}
                                data-testid='checkbox'
                                role='switch'
                                id='isActive'
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
            <b>
              {totalPages === 0 ? "No records fetched" : ""}
            </b>
            <b>
              {totalPages
                ? page * pageSize -
                9 +
                " - " +
                (page * pageSize <= totalPages
                  ? page * pageSize
                  : totalPages) +
                " of " +
                Math.ceil(totalPages) +
                " records"
                : ""}
            </b>
          </form>

          <div>
            <Paginator
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={SearchList.length}
              pageSize={pageSize}
              onPageChange={page => setCurrentPage(page)}
            />


          </div>




          {/* <div

            className='btn-group'
            style={{ float: "right" }}>

            <button
              className='btn btn-outline-primary col-sm-4'
              disabled={page === 1}
              onClick={() => {
                setPage(page - 1);
              }}>
              Prev
            </button>
            <button
              className='btn btn-outline-primary col-sm-3'
              onClick={(e) => {
                e.preventDefault();
              }}>
              {page}
            </button>
            <button
              className='btn btn-outline-primary col-sm-4'
              disabled={
                page >= Math.ceil(totalPages / pageSize)
              }
              onClick={() => {
                setPage(page + 1);
              }}>
              Next
            </button>
          </div> */}
          {/* <div
          className='btn-group'
          style={{ float: "right" }}>
          <button
            className='btn btn-outline-primary col-sm-4'
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}>
            Prev
          </button>

          <button
            className='btn btn-outline-primary col-sm-3'
            onClick={(e) => {
              e.preventDefault();
              setPage(1)
            }}>
            {1}
          </button>
          <button
            className='btn btn-outline-primary col-sm-3'
            onClick={(e) => {
              e.preventDefault();
              setPage(2)
            }} >
            {2}
          </button>
          <button
            className='btn btn-outline-primary col-sm-3'
            onClick={(e) => {
              e.preventDefault();
              setPage(3)
            }}>
            {3}
          </button>
         
          <button
            className='btn btn-outline-primary col-sm-4'
            disabled={page >= Math.ceil(totalPages / 3)}
            onClick={() => {
              setPage(page + 1);
            }}>
            Next
          </button>
        </div> */}
        </div>
      </div>
    </div>

  );
}

export default PanelList;
