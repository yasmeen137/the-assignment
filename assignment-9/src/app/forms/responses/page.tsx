"use client";

import React, { useState, ChangeEvent } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

interface Response {
    formId: string;
    responseCount: number;
}

function ResponseCountPage() {
    const [formIds, setFormIds] = useState<string[]>([]);
    const [responses, setResponses] = useState<Response[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchResponses = async () => {
        setLoading(true);
        setResponses([]);
        setError(null);

        try {
            const fetchedResponses = await Promise.all(
                formIds.map(async (formId: string) => {
                    const response = await fetch(`http://localhost:8000/api/form/${formId}/response_count`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    return { formId, responseCount: data.response_count };
                })
            );
            setResponses(fetchedResponses);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputFormIds = e.target.value.split(',').map(id => id.trim());
        setFormIds(inputFormIds);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-200 text-gray-900">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-4xl font-semibold mb-6 text-center text-purple-700">Response Counts</h1>
                <input 
                    type="text" 
                    placeholder="Enter the form ID" 
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={handleInputChange}
                />
                <button 
                    onClick={handleFetchResponses} 
                    className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                    Fetch Responses
                </button>
                {loading && (
                    <div className="flex justify-center items-center space-x-2 mt-4">
                        <FaSpinner className="animate-spin text-4xl text-purple-500" />
                        <p className="text-xl text-gray-700">Loading...</p>
                    </div>
                )}
                {error && (
                    <div className="flex justify-center items-center space-x-2 mt-4">
                        <FaExclamationTriangle className="text-4xl text-red-500" />
                        <p className="text-xl text-red-700">{error}</p>
                    </div>
                )}
                <div>
                    {responses.map(response => (
                        <div key={response.formId} className="flex justify-center items-center space-x-2 mt-4">
                            <FaCheckCircle className="text-4xl text-green-500" />
                            <p className="text-2xl text-gray-800">Form ID: {response.formId} has {response.responseCount} responses.</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ResponseCountPage;
