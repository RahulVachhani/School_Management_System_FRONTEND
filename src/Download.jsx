import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const GradeDownload = ({ classId }) => {
    const {cid} = useParams()
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadFile = async (url) => {
        setIsDownloading(true); // Indicate that download is in progress
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to download file');
            }

            const blob = await response.blob();
            const fileUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = url.includes('csv') ? `${cid} Class grades.csv` : `${cid} Class grades.xlsx`; // Automatically set file name based on URL
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        } finally {
            setIsDownloading(false); // Reset the download indicator
        }
    };

    const handleDownloadCsv = () => {
        const url = `http://127.0.0.1:8000/api/grades/csv/${cid}/`;
        downloadFile(url);
    };

    const handleDownloadExcel = () => {
        const url = `http://127.0.0.1:8000/api/grades/excel/${cid}/`;
        downloadFile(url);
    };

    return (
        <div className="flex space-x-4">
            <button
                onClick={handleDownloadCsv}
                disabled={isDownloading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {isDownloading ? 'Downloading...' : 'Download CSV'}
            </button>
            <button
                onClick={handleDownloadExcel}
                disabled={isDownloading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
                {isDownloading ? 'Downloading...' : 'Download Excel'}
            </button>
        </div>
    );
};

export default GradeDownload;
