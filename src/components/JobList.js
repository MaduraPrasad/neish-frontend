import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Job from './Job';
import '../style/JobList.css'; // Import additional CSS for JobList

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const [level, setLevel] = useState('');

    // Memoize fetchJobs using useCallback
    const fetchJobs = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/jobs', {
                params: {
                    filter: filter,
                    search: search,
                    level: level
                }
            });
            console.log('API Response:', response.data);

            if (response.data && Array.isArray(response.data.results)) {
                setJobs(response.data.results);
            } else {
                console.error('Unexpected data format:', response.data);
                setError('Unexpected data format');
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setError('Error fetching jobs');
        } finally {
            setLoading(false);
        }
    }, [filter, search, level]); // Dependency array

    useEffect(() => {
        console.log('Fetching jobs');
        fetchJobs();
    }, [fetchJobs]); // Include fetchJobs in dependency array

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSearch = () => {
        setLoading(true);
        fetchJobs();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="job-list">
            <h1 className="title">Job Listings</h1>
            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="filter" className="filter-label">Where</label>
                    <select id="filter" value={filter} onChange={handleFilterChange} className="filter-select">
                        <option value="">Select Location</option>
                        <option value="location1">Location 1</option>
                        <option value="location2">Location 2</option>
                        <option value="location3">Location 3</option>
                        <option value="location4">Location 4</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="level" className="filter-label">Level</label>
                    <input 
                        type="text" 
                        id="level"
                        placeholder="Job Level" 
                        value={level} 
                        onChange={handleLevelChange} 
                        className="level-input"
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="search" className="filter-label">What</label>
                    <input 
                        type="text" 
                        id="search"
                        placeholder="Search by job title or company" 
                        value={search} 
                        onChange={handleSearchChange} 
                        className="search-input"
                    />
                </div>
                
                <div className="filter-group">
                <label htmlFor="level" className="filter-label">....</label>
                    <button onClick={handleSearch} className="search-button">Search</button>
                </div>
            </div>
            {jobs.length > 0 ? (
                <div>
                    {jobs.map((job) => (
                        <Job key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div>No jobs available</div>
            )}
        </div>
    );
};

export default JobList;
