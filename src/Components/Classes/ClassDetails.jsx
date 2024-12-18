import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useUser } from '../../App';
import Spinner from '../../Spinner';

function Details(props) {
    const navigate = useNavigate();
    const { role } = useUser("")
    const { id } = useParams()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        try {
            setLoading(true)
            const res = await api.get(`api/class/subjects-students/?class_id=${id}`)
            if (res && res.data) {
                console.log("data : ", res.data)
                setData(res.data)
                setLoading(false)
            }
        }
        catch (error) {
            console.log("error : ", error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="min-h-screen p-6 bg-gray-50">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Class Details
                    </h1>

                    {loading && (
                        <div className="flex justify-center mb-1">
                            <Spinner />
                        </div>
                    )}

                    {/* Students Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                            Students
                        </h2>
                        {role === "teacher" && (
                            <div className="flex gap-4 mb-4">
                                <button
                                    onClick={() => navigate(`/add-student-class/${id}`)} // Adjust the navigation to your route for adding students
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Add Student
                                </button>
                                <button
                                    onClick={() => navigate(`/remove-student/${id}`)} // Adjust the navigation to your route for removing students
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Remove Student
                                </button>
                            </div>
                        )}
                        {data && data.students.data.length > 0 ? (
                            <ul className="space-y-4">
                                {data.students.data.map((student) => (
                                    <li
                                        key={student.id}
                                        className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md"
                                    >
                                        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white font-bold text-lg rounded-full">
                                            {student.first_name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-lg font-medium text-gray-800">
                                                {student.first_name} {student.last_name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <b>Enrollment: </b>{student.enrollment_number}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No students found.</p>
                        )}
                    </div>

                    {/* Subjects Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                            Subjects
                        </h2>
                        {data && data.subjects.data.length > 0 ? (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.subjects.data.map((subject) => (
                                    <li
                                        key={subject.id}
                                        className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col justify-between"
                                    >
                                        <div>
                                            <p className="text-lg font-medium text-gray-800">
                                                {subject.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Code: {subject.code}
                                            </p>
                                        </div>
                                        {/* Buttons for Assignment Actions */}
                                        <div className="flex gap-2 mt-4">
                                            {role === "teacher" && (
                                                <button
                                                    onClick={() => navigate(`/create-assignment/${subject.id}/${id}/`)}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                                >
                                                    Create Assignment
                                                </button>
                                            )}
                                            <button
                                                onClick={() => navigate(`/class-assignment/${id}/${subject.id}/`)}
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                            >
                                                Show Assignments
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No subjects found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details