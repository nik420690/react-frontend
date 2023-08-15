import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import axios from 'axios';

const ShowStatistics = () => {
    const [lastCalledEndpoint, setLastCalledEndpoint] = useState({});
    const [frequentlyCalledService, setFrequentlyCalledService] = useState('');
    const [individualCalls, setIndividualCalls] = useState({});

    useEffect(() => {
        axios.get('https://statistics-jeb4.onrender.com/last-called-endpoint')
            .then(response => setLastCalledEndpoint(response.data))
            .catch(error => console.error('Error fetching last called endpoint:', error));

        axios.get('https://statistics-jeb4.onrender.com/frequently-called-service')
            .then(response => setFrequentlyCalledService(response.data.Frequently_Called_Service))
            .catch(error => console.error('Error fetching frequently called service:', error));

        axios.get('https://statistics-jeb4.onrender.com/number-of-indviduals-calls')
            .then(response => setIndividualCalls(response.data.countOf_individuals_calls))
            .catch(error => console.error('Error fetching number of individual calls:', error));
    }, []);

    return (
        <>
            <AdminDashboard />
            <div className="container mt-5">
                <h2 className="mb-3">Statistics</h2>
                
                <h4>Last Called Endpoint</h4>
                <p>Service: {lastCalledEndpoint.service}</p>
                <p>Endpoint: {lastCalledEndpoint.Last_Called_Endpoint}</p>

                <h4>Frequently Called Service</h4>
                <p>{frequentlyCalledService}</p>

                <h4>Number of Individual Calls</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Endpoint</th>
                            <th>Calls Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(individualCalls).map(([service, endpoints]) => (
                            Object.entries(endpoints).map(([endpoint, count]) => (
                                <tr key={`${service}-${endpoint}`}>
                                    <td>{service}</td>
                                    <td>{endpoint}</td>
                                    <td>{count}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ShowStatistics;
