import axios from 'axios';

import {
    USER_UPDATED_SUCCESS,
    USER_ADDED_REVIEW_SUCCESS,
    USER_ADDED_REVIEW_FAILURE
} from "../utils/constants/actions-types";
import { API_BASE_URL } from "../utils/constants/url";

const configAuth = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
}
class JobPostService {

    getAllActiveJobPosts() {
        return axios.get(API_BASE_URL + "/common/get-active-job-post")
    }

    getAllCandidateApplyJobPosts(jobPostId) {
        return axios.get(API_BASE_URL + "/employer/candidate-apply-jobpost/" + jobPostId,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
    }
    getHotJobPosts() {
        return axios.get(API_BASE_URL + "/common/get-hot-job-post")
    }

    getDueSoonJobPosts() {
        return axios.get(API_BASE_URL + "/common/get-job-post-due-soon")
    }

    getJobPostAppliedByCandidate() {
        return axios.get(API_BASE_URL + "/candidate/get-job-post-applied", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    }

    getJobPostSavedByCandidate() {
        return axios.get(API_BASE_URL + "/candidate/get-job-post-saved", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    }

    getJobPostCreateByEmployer() {
        return axios.get(API_BASE_URL + "/employer/get-all-job-post-created", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    }

    getJobByFilterParams(filter) {
        return axios.post(API_BASE_URL + "/common/job-post-filter", filter);
    }

    createJobPost(jobPost) {
        return axios.post(API_BASE_URL + "/employer/post-job", jobPost, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    }

    getJobPostById(jobPostId) {
        return axios.get(API_BASE_URL + '/common/job-post/get-one/' + jobPostId);
    }

    getJobPostByKeyWordAndStatus(keyword, status) {
        return axios.get(API_BASE_URL + '/search?' + 'keyword=' + keyword + '&status=' + status);
    }

    updateJobPost(jobPost) {
        return axios.put(API_BASE_URL + '/employer/update-job-post', jobPost, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
    }

    cancelAppliedJob(jobPostId) {
        return axios.get(API_BASE_URL + '/candidate/cancel-apply-job-post/' + jobPostId, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
    }

    cancelSavedJob(jobPostId) {
        return axios.get(API_BASE_URL + '/candidate/cancel-saved-job-post/' + jobPostId, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
    }

    deleteJobPost(jobPostId) {
        return axios.delete(API_BASE_URL + '/employer/delete-job-post/' + jobPostId, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
    }

}

export const JobPostServiceIml = new JobPostService();

class ExperienceService {

    getExperienceByCandidate() {
        return axios.get(API_BASE_URL + "/candidate/get-experience", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    }

    getJobPostCreateByEmployer() {
        return axios.get(API_BASE_URL + "/employer/get-all-job-post-created", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    }

    getAppliedJobPost() {
        return axios.get(API_BASE_URL + "/employer/get-all-job-post-created", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    }



    createExperience(experience) {
        return axios.post(API_BASE_URL + "/candidate/add-experience", experience, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    }

    getJobPostById(jobPostId) {
        return axios.get(API_BASE_URL + '/common/job-post/get-one/' + jobPostId);
    }

    getJobPostByKeyWordAndStatus(keyword, status) {
        return axios.get(API_BASE_URL + '/search?' + 'keyword=' + keyword + '&status=' + status);
    }

    updateExperience(experience) {
        return axios.put(API_BASE_URL + '/candidate/update-experience', experience, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
    }

    deleteExperience(experienceId) {
        return axios.get(API_BASE_URL + '/candidate/delete-experience/' + experienceId, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
    }

}

export const ExperienceServiceIml = new ExperienceService();

class UserService {

    getUserProfile() {
        return axios.get(API_BASE_URL + "/user/profile", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    }
}

export const UserServiceIml = new UserService();

export const updateUserInfo = (userData, history) => async (dispatch) => {
    axios({
        method: "PUT",
        url: API_BASE_URL + "/user/editPassword",
        data: userData,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: USER_UPDATED_SUCCESS
    })

    history.push("/candidate-profile-2");
};

export const getUserProfile = (userData, history) => async (dispatch) => {
    axios({
        method: "GET",
        url: API_BASE_URL + "/user/profile",
        data: userData.data || {},
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: USER_UPDATED_SUCCESS
    })
};

export const updateUserProfile = (userProfileData, history) => async (dispatch) => {
    axios({
        method: "PUT",
        url: API_BASE_URL + "/user/editProfile",
        data: userProfileData,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    dispatch({
        type: USER_UPDATED_SUCCESS
    })

    history.push("/candidate-profile-2");
};

export const addReviewToPerfume = (data) => async (dispatch) => {
    try {
        await axios.post(API_BASE_URL + "/user/review", data);

        dispatch({
            type: USER_ADDED_REVIEW_SUCCESS
        })

        window.location.reload();
    } catch (error) {
        dispatch({
            type: USER_ADDED_REVIEW_FAILURE,
            payload: error.response.data
        })
    }
};
