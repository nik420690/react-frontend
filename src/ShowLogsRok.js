import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import axios from 'axios';
import './App.css';

const LogServiceDashboard = () => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [logs, setLogs] = useState([]);
    const [message, setMessage] = useState('');

    const handleGetLogs = () => {
        if (!dateFrom || !dateTo) {
            setMessage('Select start and end dates.');
            return;
        }

        axios.get(`http://localhost:3066/logs/${dateFrom}/${dateTo}`)
            .then(response => {
                setLogs(response.data);
                if(response.data.length === 0) {
                    setMessage('No logs for selected date range.');
                } else {
                    setMessage('');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setMessage('Invalid date range selected.');
                } else {
                    setMessage('Error fetching logs.');
                }
                console.error('Error fetching logs:', error);
            });
    };

    const handleDeleteLogs = () => {
        axios.delete('http://localhost:3066/logs')
            .then(response => {
                console.log(response.data);
                setLogs([]);
                setMessage('Logs deleted.');
            })
            .catch(error => {
                console.error('Error deleting logs:', error);
                setMessage('Error deleting logs.');
            });
    };

    const handleTransferLogs = () => {
        axios.post('http://localhost:3066/logs')
            .then(response => {
                console.log(response.data);
                setMessage("Logs transfered.");
            })
            .catch(error => {
                console.error('Error transferring logs:', error);
                setMessage('Error transferring logs.');
            });
    };

    return (
        <>
        <AdminDashboard />
        <div className="container mt-5">
            <h2 className="mb-4">Log Service</h2>
            <div className="date-input-group mb-3">
                <input
                    type="date"
                    className="form-control"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    placeholder="Date from"
                />
                <input
                    type="date"
                    className="form-control"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    placeholder="Date to"
                />
            </div>
            <div className="button-group mb-3">
                <button className="btn btn-primary" onClick={handleGetLogs}>Get Logs</button>
                <button className="btn btn-danger" onClick={handleDeleteLogs}>Delete All Logs</button>
                <button className="btn btn-info" onClick={handleTransferLogs}>Transfer Logs</button>
            </div>
            {message && <p className="alert alert-info">{message}</p>}
            {logs.length > 0 && (
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>Log</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index}>
                                <td>{log.log}</td>
                                <td>{new Date(log.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </>
    );
};

export default LogServiceDashboard;