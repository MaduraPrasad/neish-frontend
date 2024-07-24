import React from 'react';
import '../style/Job.css'; // Import the CSS file for styling

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `Published at: ${year}-${month}-${day}`;
};

const Job = ({ job }) => {
    return (
        <div className="job-container">
            <img className="job-logo" src={job.logo_thumb_url} alt={job.name} />
            <div className="job-details">
                <h2 className="job-name">{job.name}</h2>
                <p className="job-title">{job.title}</p>
                <p className="job-address">{job.address}</p>
                <p className="job-address">{job.company.name}</p>
                <p className="job-address">{job.job_type.name}</p>
                <p className="job-address">{formatDate(job.updated_at)}</p>
            </div>
        </div>
    );
};

export default Job;
