import React from 'react';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageWrapper from '../components/PageWrapper';

function Support() {
    return (
        <>
            <PageWrapper>
                <div className="bg-default-1 pl-lg-28 pt-28 pt-lg-28 pb-13 pb-lg-25">
                    <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faInfoCircle} />Contacts</h4>
                    <br />
                    <p><b>Mobile:</b> (066) 696-66-23<br />
                        <b>E-mail:</b> ngocdiem2001@gmail.com</p>
                    <br />
                    <h6>Working time</h6>
                    <p>We support from 08:00 to 20:00 without breaks and weekends. <br />
                        All requests are accepted around the clock.</p>
                    <br />
                </div>
            </PageWrapper>
        </>
    )
}

export default Support