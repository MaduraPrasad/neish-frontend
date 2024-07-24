import React from 'react';
import './App.css';
import JobList from './components/JobList';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Job Listings</h1>
            </header>
            <JobList />
        </div>
    );
};

export default App;
