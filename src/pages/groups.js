import {Router} from "@reach/router"
import React from 'react';
import JobDetails from "./job-details";
import SearchGrid from "./search-list-2";

const Groups = () => (
    <div>
        <Router>
            <JobDetails path="/groups/job-details/:id" />
            <JobDetails path="/groups/candidate-profiles-2" />
            <JobDetails path="/groups/search-list-2?title='title'&city='city'"/>
        </Router>
    </div>
)

export default Groups