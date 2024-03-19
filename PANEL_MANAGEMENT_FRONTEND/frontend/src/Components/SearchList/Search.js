import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

function Search({
  onSearchData,
  filterName,
  onSearchValidate,
}) {
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [notSubmit, setNotSubmit] = useState("");
  const [notValidate, setNotValidate] = useState(false);

  const handleChangeRoleId = (e) => {
    setNotSubmit(false);
    setNotValidate(false);
    setRoleId(e.target.value);
  };

  const handleChangeRoleName = (e) => {
    setNotValidate(false);
    setNotSubmit(false);
    setRoleName(e.target.value.toLowerCase());
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    let searchData = {};
    let notValidateData = {};

    if (roleId && roleId.length !== 4) {
      notValidateData = {
        notValidate: true,
      };

      onSearchValidate(notValidateData);
      setNotValidate(true);
    } else {
      if (roleName || roleId) {
        notValidateData = {
          notValidate: false,
        };

        onSearchValidate(notValidateData);
        setNotValidate(false);
      } else {
        notValidateData = {
          notValidate: true,
        };

        onSearchValidate(notValidateData);
        setNotValidate(true);
      }
    }

    if (roleId || roleName) {
      setNotSubmit(false);
      searchData = {
        roleId,
        roleName,
        notSubmit: false,
      };

      onSearchData(searchData);

      setRoleName("");
      setRoleId("");
    } else {
      setNotSubmit(true);

      searchData = {
        notSubmit: true,
      };

      onSearchData(searchData);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmitSearch}>
        <div className='row'>
          <div className='col-md-1'>
            <div className='form-group'>
              <label
                className='fw-bolder'
                htmlFor='first'>
                {filterName} Id
              </label>
            </div>
          </div>
          <div
            className={`col-md-5 ${
              filterName === "panel level" ||
              filterName === "panel type"
                ? "filterNameMargin"
                : ""
            } ${
              (filterName === "candidate status" ||
                filterName === "candidate role") &&
              "filterNameMarginCS"
            }`}>
            <div className='form-group'>
              <input
                type='text'
                data-testid='search-id'
                className={`form-control ${
                  notSubmit || notValidate
                    ? "search__input"
                    : ""
                }`}
                value={roleId}
                onChange={handleChangeRoleId}
                placeholder={`Enter ${filterName} Id`}
                id='roleId'
              />
            </div>
            {notSubmit && (
              <p className='mb-0 search__warning'>
                <ExclamationTriangleIcon className='search__warningIcon' />
                Please enter the Search Data
              </p>
            )}
            {notValidate && !notSubmit && (
              <p className='mb-0 search__warning'>
                <ExclamationTriangleIcon className='search__warningIcon' />
                Please Enter the 4 digit Number
              </p>
            )}
          </div>
        </div>

        <div className='row'>
          <div className='col-md-1'>
            <div className='form-group'>
              <label
                className='fw-bolder'
                htmlFor='first'>
                {filterName} Name
              </label>
            </div>
          </div>
          <div
            className={`col-md-5 ${
              filterName === "panel level" ||
              filterName === "panel type"
                ? "filterNameMargin"
                : ""
            } ${
              (filterName === "candidate status" ||
                filterName === "candidate role") &&
              "filterNameMarginCS"
            }`}>
            <div className='form-group'>
              <input
                type='text'
                data-testid='search-name'
                value={roleName}
                onChange={handleChangeRoleName}
                className={`form-control ${
                  notSubmit && "search__input"
                }`}
                placeholder={`Enter ${filterName} Name`}
                id='roleName'
              />
            </div>
          </div>
        </div>

        <div className='search mt-4'>
          <div className='col-md-6'>
            <button
              type='submit'
              className='btn btn-primary'>
              Search
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Search;
