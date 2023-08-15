import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import axios from 'axios';

const LogServiceDashboard = () => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [logs, setLogs] = useState([]);
    const [message, setMessage] = useState('');

    const handleGetLogs = () => {
        if (!dateFrom || !dateTo) {
            setMessage('Please select both start and end dates.');
            return;
        }

        axios.get(`http://localhost:3001/logs/${dateFrom}/${dateTo}`)
            .then(response => {
                setLogs(response.data);
                if(response.data.length === 0) {
                    setMessage('No logs found for the selected date range.');
                } else {
                    setMessage('');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setMessage('Invalid date range selected. Please try again.');
                } else {
                    setMessage('Error fetching logs. Please try again.');
                }
                console.error('Error fetching logs:', error);
            });
    };

    const handleDeleteLogs = () => {
        axios.delete('http://localhost:3001/logs')
            .then(response => {
                console.log(response.data);
                setLogs([]);
                setMessage('Logs deleted successfully.');
            })
            .catch(error => {
                console.error('Error deleting logs:', error);
                setMessage('Error deleting logs. Please try again.');
            });
    };

    const handleTransferLogs = () => {
        axios.post('http://localhost:3001/logs')
            .then(response => {
                console.log(response.data);
                setMessage("Logs transfer has started. Please wait a few moments and then fetch the logs to see the updated data.");
            })
            .catch(error => {
                console.error('Error transferring logs:', error);
                setMessage('Error transferring logs. Please try again.');
            });
    };

    return (
        <>
        <AdminDashboard />
        <div className="container mt-5">
            <h2 className="mb-3">Log Service Dashboard</h2>
            <div>
                <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    placeholder="Date from"
                />
                <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    placeholder="Date to"
                />
                <button onClick={handleGetLogs}>Get Logs</button>
                <button onClick={handleDeleteLogs}>Delete All Logs</button>
                <button onClick={handleTransferLogs}>Transfer Logs</button> {/* New Transfer Logs Button */}
            </div>
            {message && <p>{message}</p>}
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
