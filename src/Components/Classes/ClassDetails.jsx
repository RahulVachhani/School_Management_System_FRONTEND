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
                                    className="inline-flex  rounded-lg items-center px-4 py-2 text-sm font-medium text-green-900 bg-white border border-gray-400  hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-700 focus:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-green-500 dark:focus:text-white">
                                    Add Student
                                </button>
                                <button
                                    onClick={() => navigate(`/remove-student/${id}`)} // Adjust the navigation to your route for removing students
                                    className="inline-flex  rounded-lg items-center px-4 py-2 text-sm font-medium text-red-900 bg-white border border-gray-400  hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-red-500 dark:focus:text-white">
                                    Remove Student
                                </button>
                                <button 
                                onClick={() => navigate(`/grade-download/${id}`)} 
                                type="button" 
                                className="inline-flex  rounded-lg items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-400  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
    <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
      <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
    </svg>
    Downloads
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
                                                    className="inline-flex  rounded-lg items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-400  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                                    Create Assignment
                                                </button>
                                            )}
                                            <button
                                                onClick={() => navigate(`/class-assignment/${id}/${subject.id}/`)}
                                                className="inline-flex  rounded-lg items-center px-4 py-2 text-sm font-medium text-green-900 bg-white border border-gray-400  hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-700 focus:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-green-500 dark:focus:text-white">
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