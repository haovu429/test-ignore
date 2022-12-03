import React from "react";
import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";

import SearchTab from "../sections/search/SearchTab";

import { useLocation } from "@reach/router";
import { parse } from "query-string";

import { JobPostServiceIml } from "../actions/user-actions";
import { navigate } from '@reach/router';
import { useState } from "react";
import { employmentType, experienceYear } from "../components/Sidebar/MenuData";

const defaultCountries = [
  { value: "", label: "Chọn thành phố" },
  { value: "Tp Hồ Chí Minh", label: "Tp Hồ Chí Minh" },
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Cần Thơ", label: "Cần Thơ" },
  { value: "Đà Nẵng", label: "Đà Nẵng" },
];

const defaultJobTypes = [
  { value: "ft", label: "Full Time" },
  { value: "pt", label: "Part Time" },
  { value: "remote", label: "Remote" },
  { value: "contract", label: "Contract" },
];
const defaultSalaryRange = [
  { value: [0, 500], label: "< 500$" },
  { value: [500, 1000], label: "500 - 1000$" },
  { value: [1000, 2000], label: "1000 - 2000$" },
  { value: [2000, 5000], label: "2000 - 1000$" },
  { value: [5000, 10000], label: "5000 - 10000$" },
  { value: [1000, 10000], label: "5000 - 10000$" },
];
const defaultExpLevels = [
  { value: "entry", label: "Entry" },
  { value: "jn", label: "Junior" },
  { value: "mid", label: "Mid Level" },
  { value: "sr", label: "Sinior" },
];

const defaultPostedTimes = [
  { value: "jan", label: "January" },
  { value: "May", label: "May" },
  { value: "Jul", label: "July" },
  { value: "Oct", label: "October" },
];

const SearchGrid = () => {
  const location = useLocation();
  const searchParams = parse(location.search);
  const [city, setCity] = useState([searchParams.city]);
  const [title, setTitle] = useState([searchParams.title]);
  const [jobs, setJobs] = useState([]);
  const handleChange = (event) => {
    setCity(event.value)
  };

  const [error, setError] = useState("");
  const [success, setSucces] = useState("");

  const [filter, setFilter] = useState({
    minBudget: null,
    maxBudget: null,
    experienceYear: [],
    employmentTypes: [],
    titles: [],
    cities: [],
    positions: [],
    skills: [],
    others: []
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFilters(event.target[0].value, event.target[0].name);
    handleFilters(city, "cities");
    navigate('/search-list-2?title='+title+'&city='+city);
    setError("");
    setSucces("");
  }

  const handleFilters = (filters, category) => {
    const newFilters = filter
    newFilters[category] = filters
    if (category === "experienceYear" || category === "titles" || category === "cities") {
      newFilters[category] = [filters]
    }
    setFilter(newFilters);
    getProducts(newFilters);
    setError("");
    setSucces("");
  };
  const getProducts = (variables) => {
    JobPostServiceIml.getJobByFilterParams(variables).then((response) => { setJobs(response.data.data); });
  };

  return (
    <>
      <PageWrapper>
        <div className="bg-black-2 mt-15 mt-lg-22 pt-18 pt-lg-13 pb-13">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* <!-- form --> */}
                <form className="search-form">
                  <div className="filter-search-form-2 bg-white rounded-sm shadow-7 pr-6 py-7 pl-6  search-1-adjustment">
                    <div className="filter-inputs">
                      <div className="form-group position-relative w-xl-50">
                        <input
                          className="form-control focus-reset pl-13"
                          type="text"
                          id="keyword"
                          value={title}
                          name="titles"
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Type Job title, keywords"
                        />
                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
                        </span>
                      </div>
                      {/* <!-- .select-city starts --> */}
                      <div className="form-group position-relative w-lg-50">
                        <Select
                          options={defaultCountries}
                          defaultValue={city!=""?{ value: city, label: city }:defaultCountries[0]}
                          className="pl-8 h-100 arrow-3 font-size-4 d-flex align-items-center w-100"
                          border={false}
                        />
                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
                        </span>
                      </div>
                      {/* <!-- ./select-city ends --> */}
                    </div>
                    <div className="button-block">
                      <button className="btn btn-primary btn-medium line-height-reset h-100 btn-submit w-100 text-uppercase">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-default-1 pt-9 pb-13 pb-xl-30 pb-13 position-relative overflow-hidden">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 col-xl-12">
                <h2 className="font-size-8 mb-6">
                  {"You’re searching \""}{title}{"\" in \""}{city}{"\""}
                </h2>
                <form className="mb-8">
                  <div className="search-filter from-group d-flex align-items-center flex-wrap">
                    <div className="mr-5 mb-5">
                      <Select
                        options={employmentType}
                        className="font-size-4"
                        // border={false}
                        css={`
                          min-width: 175px;
                          min-width: 175px;
                        `}

                      />
                    </div>
                    <div className="mr-5 mb-5">
                      <Select
                        options={defaultSalaryRange}
                        className="font-size-4"
                        // border={false}
                        css={`
                          min-width: 175px;
                        `}
                      />
                    </div>
                    <div className="mr-5 mb-5">
                      <Select
                        options={experienceYear}
                        className="font-size-4"
                        // border={false}
                        css={`
                          min-width: 175px;
                        `}
                      />
                    </div>
                    <div className="mr-5 mb-5">
                      <Select
                        options={defaultPostedTimes}
                        className="font-size-4"
                        // border={false}
                        css={`
                          min-width: 175px;
                        `}
                      />
                    </div>
                  </div>
                </form>
                <div className="d-flex align-items-center justify-content-between mb-6">
                  <h5 className="font-size-4 font-weight-normal text-gray">
                    Showing
                    <span className="text-black-2">120</span> matched jobs
                  </h5>
                </div>
              </div>
            </div>
            <SearchTab />
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default SearchGrid;
