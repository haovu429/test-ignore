import React from "react";

import { Select } from "../../components/Core";
import imgH from "../../assets/image/l1/png/hero-image-man.png";
import imgP from "../../assets/image/patterns/hero-pattern.png";
import { useEffect } from "react";
import { useState } from "react";
import { JobPostServiceIml } from "../../actions/user-actions";
import { navigate } from '@reach/router';

const defaultCountries = [
  { value: "a", label: "Chọn thành phố" },
  { value: "Tp Hồ Chí Minh", label: "Tp Hồ Chí Minh" },
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Cần Thơ", label: "Cần Thơ" },
  { value: "Đà Nẵng", label: "Đà Nẵng" },
];


const Hero = () => {

  const [city, setCity] = useState([]);
  const [title, setTitle] = useState([]);
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
      if(city){
        newFilters[category] = [filters]
      }
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
      {/* <!-- Hero Area --> */}
      <div className="bg-gradient-1 pt-26 pt-md-32 pt-lg-33 pt-xl-35 position-relative z-index-1 overflow-hidden">
        {/* <!-- .Hero pattern --> */}
        <div className="pos-abs-tr w-50 z-index-n2">
          <img src={imgP} alt="" className="gr-opacity-1" />
        </div>
        {/* <!-- ./Hero pattern --> */}
        <div className="container">
          <div className="row position-relative align-items-center">
            <div
              className="col-xxl-6 col-xl-7 col-lg-8 col-md-12 pt-lg-13 pb-lg-33 pb-xl-34 pb-md-33 pb-10"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <h1 className="font-size-11 mb-12 pr-md-30 pr-lg-0">
                Find the perfect job that you deserve.
              </h1>
              <div className="">
                {/* <!-- .search-form --> */}
                <form onSubmit={handleSubmit} className="search-form shadow-6">
                  <div className="filter-search-form-1 bg-white rounded-sm shadow-4">
                    <div className="filter-inputs">
                      <div className="form-group position-relative">
                        <input
                          className="form-control focus-reset pl-13"
                          type="text"
                          id="keyword"
                          value={title}
                          name="titles"
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Job title"
                        />
                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
                        </span>
                      </div>
                      {/* <!-- .select-city starts --> */}
                      <div className="form-group position-relative">
                        <Select
                          name="cities"
                          onChange={handleChange}
                          options={defaultCountries}
                          className="pl-8 h-100 arrow-3 font-size-4 d-flex align-items-center w-100"
                          border={false}
                        />

                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
                        </span>
                      </div>
                      {/* <!-- ./select-city ends --> */}
                    </div>
                    {/* <!-- .Hero Button --> */}
                    <div className="button-block">
                      <button className="btn btn-primary line-height-reset h-100 btn-submit w-100 text-uppercase">
                        Search
                      </button>
                    </div>
                    {/* <!-- ./Hero Button --> */}
                  </div>
                </form>
                {/* <!-- ./search-form --> */}
                <p className="heading-default-color font-size-3 pt-7">
                  <span className="text-smoke">Search keywords e.g.</span>{" "}
                  Product Designer
                </p>
              </div>
            </div>
            {/* <!-- Hero Right Image --> */}
            <div
              className="col-lg-6 col-md-4 col-sm-6 col-xs-6 col-8 pos-abs-br z-index-n1 position-static position-md-absolute mx-auto ml-md-auto"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <div className=" ml-xxl-23 ml-xl-12 ml-md-7">
                <img src={imgH} alt="" className="w-100" />
              </div>
            </div>
            {/* <!-- ./Hero Right Image --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
