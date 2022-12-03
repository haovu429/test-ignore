import axios from 'axios';

import {
    PERFUME_ADDED_SUCCESS,
    PERFUME_UPDATED_SUCCESS,
    PERFUME_ADDED_FAILURE,
    PERFUME_UPDATED_FAILURE,
    FETCH_USER_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_COMPANYS_SUCCESS,
    FETCH_ALL_USERS_ORDERS_SUCCESS, FORM_RESET
} from "../utils/constants/actions-types";
import { API_BASE_URL } from "../utils/constants/url";

// const config = {
//     headers: {
//       Authorization: "Bearer " + localStorage.getItem("token")
//     }};
class CandidateService {

    getCandidateSettingProfile() {
        return axios.get(API_BASE_URL + "/candidate/profile", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }})
    }

    createCompany(company) {
        return axios.post(API_BASE_URL + "/admin/add-company", company, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }})
    }

    getCompanyById(companyId) {
        return axios.get(API_BASE_URL + '/admin/get-one-company/' + companyId, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }});
    }

    getCompanyByKeyWordAndStatus(keyword, status) {
        return axios.get(API_BASE_URL + '/search?' + 'keyword=' + keyword + '&status=' + status, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }});
    }

    updateCompany(company) {
        return axios.put(API_BASE_URL + '/admin/update-info-company', company, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }});
    }

    deleteCompany(companyId) {
        return axios.delete(API_BASE_URL + '/company/' + companyId, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }});
    }

}

export const CandidateServiceIml = new CandidateService();