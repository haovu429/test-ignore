import React from "react";
import { Link } from "gatsby";
import imgF1 from "../../assets/image/l1/png/feature-brand-1.png";
import imgF2 from "../../assets/image/l1/png/feature-brand-2.png";
import imgF3 from "../../assets/image/l1/png/feature-brand-3.png";
import imgF4 from "../../assets/image/l1/png/feature-brand-4.png";
import imgF5 from "../../assets/image/l1/png/feature-brand-5.png";
import imgF6 from "../../assets/image/l1/png/feature-brand-6.png";
import { useEffect } from "react";
import { useState } from "react";
import { JobPostServiceIml } from "../../actions/user-actions";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants/url";

const FeaturedJobs = () => {

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
    others: [],
    noOfRecords: 6,
    pageIndex: 0,
  });

  const [jobs, setJobs] = useState([]);

  

  const saveForJob = (id) => {
    const auth = localStorage.getItem("userRole");
    const isAuthenticated = localStorage.getItem("isLoggedIn");

    if (!isAuthenticated) {
      setError("You must login to save for jobs");
    } else {
      axios
        .get(
          API_BASE_URL + "/candidate/save-job-post/" + id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          if (response.data.status == 200) {
            //show success message
            setSucces("Successfuly saved for job");
            setError("")
          } else if (response.data.errMsg) {
            setError(response.data.errMsg)
            setSucces("")
          } else {
            setSucces("");
            setError("Request Failed")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const applyForJob = (id) => {
    const isAuthenticated = localStorage.getItem("isLoggedIn");

    if (!isAuthenticated) {
      setError("You must login to apply for jobs")
    } else {
      axios
        .get(
          API_BASE_URL + "/candidate/apply-job-post/" + id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          if (response.data.status == 200) {
            setSucces("Successfuly applied for job")
            setError("")
            const countTimer = setInterval(() => {
            }, 1000);
            clearInterval(countTimer);
          } else if (response.data.status != 200) {
            console.log(response.data.status)
            switch (response.data.status) {
              case 403:
                setError(response.data.errMsg + " .You can register in: http://localhost:8000/registerOfUser")
                // window.location.assign("http://localhost:8000/registerOfUser");
                break;
              default:
                setSucces("");
                setError(response.data.errMsg)
              //return 'foo';
            }
            //setError(response.data.errMsg)
            //console.error(response.data.errMsg);
            //window.location.assign("http://localhost:8000/registerOfUser");
          } else {

            setSucces("Request Failed")
          }
        })
        .catch((error) => {
          console.log(error);

        });
    }
  };

  useEffect(() => {
    JobPostServiceIml.getJobByFilterParams(filter).then((response) => { setJobs(response.data.data) });
  }, [])
  const jobList = jobs.map(job => {
    return <div className="col-12 col-lg-6">
      <div className="bg-white px-8 pt-9 pb-7 rounded-4 mb-9 feature-cardOne-adjustments">
        <div className="d-block mb-7">
          <Link to={"/groups/job-details/" + job.id}>
            <img src={imgF1} alt="" />
          </Link>
        </div>
        <Link
          to={"/groups/job-details/" + job.id}
          className="font-size-3 d-block mb-0 text-gray"
        >
          {job.workplaceType}
        </Link>
        <h2 className="mt-n4">
          <Link
            to="/#"
            className="font-size-7 text-black-2 font-weight-bold mb-4"
          >
            {job.title}
          </Link>
        </h2>
        <ul className="list-unstyled mb-1 card-tag-list">
          <li>
            <Link
              to="/#"
              className="bg-regent-opacity-15 text-denim font-size-3 rounded-3"
            >
              <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
              {job.city}
            </Link>
          </li>
          <li>
            <Link
              to="/#"
              className="bg-regent-opacity-15 text-orange font-size-3 rounded-3"
            >
              <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
              {job.employmentType}
            </Link>
          </li>
          <li>
            <Link
              to="/#"
              className="bg-regent-opacity-15 text-eastern font-size-3 rounded-3"
            >
              <i className="fa fa-dollar-sign mr-2 font-weight-bold"></i>{" "}
              {job.minBudget} - {job.maxBudget}K $
            </Link>
          </li>
        </ul>
        <p className="mb-7 font-size-4 text-gray">
          {job.description}
        </p>
        <div className="card-btn-group">
          {(
            <button
              type="submit"
              className="btn btn-green text-uppercase btn-medium rounded-3"
              onClick={() => applyForJob(job.id)}
            >
              Apply Now
            </button>
          )}
          {(
            <button
              type="submit"
              className="btn btn-outline-mercury text-black-2 text-uppercase btn-medium rounded-3"
              onClick={() => saveForJob(job.id)}
            >
              <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>{" "}
              Save it
            </button>
          )}
        </div>
      </div>
    </div>
  });
  return (
    <>
      {/* <!-- FeaturedJobs Area -->  */}
      <div className="pt-11 pt-lg-27 pb-7 pb-lg-26 bg-black-2 dark-mode-texts">
        <div className="container">
          {/* <!-- Section Top --> */}
          <div className="row align-items-center pb-14">
            {/* <!-- Section Title --> */}
            <div className="col-12 col-xl-6 col-lg-6">
              <div className="text-center text-lg-left mb-13 mb-lg-0">
                <h2 className="font-size-9 font-weight-bold">Featured Jobs</h2>
              </div>
            </div>
            {/* <!-- Section Button --> */}
            <div className="col-12 col-xl-6 col-lg-6">
              <div className="text-center text-lg-right">
                <Link to="/#" className="btn btn-outline-white text-uppercase">
                  Explore All
                </Link>
              </div>
            </div>
            {/* <!-- Section Button End --> */}
          </div>
          {/* <!-- End Section Top --> */}
          <div className="row justify-content-center">
            {jobList}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedJobs;
