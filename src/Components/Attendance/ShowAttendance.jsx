import React, { useState } from 'react'
import api from '../../../api'
import { useUser } from '../../App';
import Spinner from '../../Spinner';

function ShowAttendance() {
    const { data } = useUser()
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(false)

    const ShowAttendance = async () => {
        setLoading(true)
        const res = await api.get(`api/school/class/show/attendance/?student_id=${data.id}`)
        if (res.data) {
            console.log('data :', res.data)
            setLoading(false)
            setRecords(res.data)
           

        }

    }

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Attendance Records</h1>

                {/* Button to Show Attendance */}
                <div className="text-center">
                    <button
                        onClick={ShowAttendance}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
                    >
                        View My Attendance
                    </button>
                </div>

                {loading && (
                    <div className="flex justify-center mb-1">
                        <Spinner />
                    </div>
                )}


                {/* Attendance Records */}
                {records.length > 0 && (
                    <div className="mt-8">
                        {records.map((record) => (
                            <div key={record.id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-lg font-semibold text-gray-800">
                                        {record.student.first_name} {record.student.last_name}
                                    </div>
                                    <div className="text-sm text-gray-500">{record.date}</div>
                                </div>
                                <div className="text-gray-600">
                                    <div><strong>Class:</strong> {record.class_name.name} {record.class_name.section}</div>
                                    <div><strong>Status:</strong> <span className={`font-bold ${record.status === 'present' ? 'text-green-600' : 'text-red-600'}`}>{record.status}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No Records Found */}
                {/* {!loading && !error && records.length === 0 && (
                <div className="mt-6 text-center text-gray-600">
                    <span>No attendance records found.</span>
                </div>
            )} */}
            </div>
        </div>
    )
}

export default ShowAttendance