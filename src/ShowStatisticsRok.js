import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AdminDashboard from './AdminDashboard';  // Import AdminDashboard komponente

function Statistics() {
    const [lastCalledEndpoint, setLastCalledEndpoint] = useState({});
    const [frequentlyCalledService, setFrequentlyCalledService] = useState('');
    const [individualCalls, setIndividualCalls] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const lastEndpointResponse = await axios.get('https://statistics-app-cc50d2934119.herokuapp.com/last-called-endpoint');
                setLastCalledEndpoint(lastEndpointResponse.data);

                const frequentServiceResponse = await axios.get('https://statistics-app-cc50d2934119.herokuapp.com/frequently-called-service');
                setFrequentlyCalledService(frequentServiceResponse.data.Frequently_Called_Service);

                const individualCallsResponse = await axios.get('https://statistics-app-cc50d2934119.herokuapp.com/number-of-indviduals-calls');
                setIndividualCalls(individualCallsResponse.data.countOf_individuals_calls);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <AdminDashboard /> 

            <div className="container mt-5">
                <h2 className="mb-3">Statistics</h2>

                <div className="card">
                    <h4 className="title">Last Called Endpoint</h4>
                    <p><strong>Service:</strong> {lastCalledEndpoint.service}</p>
                    <p><strong>Endpoint:</strong> {lastCalledEndpoint.Last_Called_Endpoint}</p>
                </div>

                <div className="card">
                    <h4 className="title">Frequently Called Service</h4>
                    <p>{frequentlyCalledService}</p>
                </div>

                <div className="card">
                    <h4 className="title">Number of Individual Calls</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Endpoint</th>
                                <th>Calls Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(individualCalls).map(([service, endpoints]) =>
                                Object.entries(endpoints).map(([endpoint, count]) => (
                                    <tr key={`${service}-${endpoint}`}>
                                        <td>{service}</td>
                                        <td>{endpoint}</td>
                                        <td>{count}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Statistics;
