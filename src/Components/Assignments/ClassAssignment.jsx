import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { useParams } from 'react-router-dom'
import { useUser } from '../../App'

function ClassAssignment() {
    const {role} = useUser()
    const { cid, sid } = useParams()
    const [data, setData] = useState([])
    const [assignmentDetails, setAssignmentDetails] = useState(null)
    const [feedback, setFeedback] = useState({})

    const AllAssignment = async () => {
        try {
            const res = await api.get(`http://127.0.0.1:8000/api/class/assignement/${cid}/?subject_id=${sid}`)
            if (res.data) {
                console.log("dataCA :", res.data)
                setData(res.data)
            }
        }
        catch (error) {
            console.log('error :', error)
        }
    }

    const fetchAssignmentDetails = async (assignmentId) => {
        try {
            const res = await api.get(`api/class/assignment/submission/details/${assignmentId}/`)
            setAssignmentDetails(res.data)
            console.log('res :',res.data)
        } catch (error) {
            console.log("Error fetching assignment details:", error)
        }
    }
    const handleAssignmentClick = (assignmentId) => {
        fetchAssignmentDetails(assignmentId)
    }

    const handleFeedbackChange = (studentId, value) => {
        setFeedback({"student_id":studentId, "feedback":value})
    }
    const submitFeedback = async(aid)=>{
        try{
            console.log(feedback)
            const res = await api.post(`api/class/assignment/submission/feedback/?assignment_id=${aid}`,feedback)
            fetchAssignmentDetails(aid) 
        }
        catch(error){
            console.log('error :',error)
        }
        
    }
    useEffect(() => {
        AllAssignment()
    }, [])

    return (

        <div className="bg-gray-50 min-h-screen p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Assignment for Class {cid}</h1>
            {data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((assignment) => (
                        <div
                            key={assignment.id}
                            className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                            onClick={() => handleAssignmentClick(assignment.id)}
                        >
                            <h2 className="text-xl font-semibold text-blue-600 mb-2">{assignment.title}</h2>
                            <p className="text-gray-700 mb-4">{assignment.description}</p>
                            <div className="flex justify-between items-center mb-2">

                                <span className="text-sm text-gray-600">
                                    <strong>Due:</strong> {new Date(assignment.due_date).toLocaleDateString()}
                                </span>
                                <span className="px-3 py-2 text-xs text-white bg-green-500 rounded">
                                    {assignment.subject.name}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Subject:</strong> {assignment.subject.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Teacher:</strong> {assignment.teacher.first_name} {assignment.teacher.last_name}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center mt-8">No data available for this class.</p>
            )}




            {role === "teacher" && assignmentDetails && (
                <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{assignmentDetails.title} - Submissions</h2>



                    {/* Submitted Students */}
                    <div className="mb-4">
                        <p className="text-gray-700">
                            <strong>Submitted:</strong> {assignmentDetails.submitted_count} students
                        </p>
                        <p className="text-gray-700">
                            <strong>Remaining:</strong> {assignmentDetails.remaining_count} students
                        </p>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Submitted Students</h3>
                   
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {assignmentDetails.submitted_students.map((student) => (
                            <div key={student.student_id}>
                            <div className="p-4 border rounded-lg">
                                <p className="font-semibold text-gray-700">{student.student_name}</p>
                                <div className="flex justify-between items-center my-2">
                                    <a
                                        href={`http://127.0.0.1:8000${student.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        View Submission
                                    </a>
                                    {student.feedback && (
                                        <span className="text-sm text-green-500 font-medium">Feedback: {student.feedback}</span>
                                    )}
                               </div>
                                {/* Feedback input */}
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        placeholder="Enter feedback"
                                        onChange={(e) => handleFeedbackChange(student.student_id, e.target.value)}
                                        className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <button
                                        onClick={() => submitFeedback(assignmentDetails.id)}
                                        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>

                    {/* Remaining Students */}
                    <h3 className="text-lg font-medium text-gray-800 mt-6">Remaining Students</h3>
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                        {assignmentDetails.remaining_students.map((student) => (
                            <li key={student.student_id}>{student.student_name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        //     {assignmentDetails && (
        //         <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        //             <h2 className="text-xl font-semibold text-gray-800 mb-4">Submission Status</h2>
        //             <div className="mb-4">
        //                 <p className="text-gray-700">
        //                     <strong>Submitted:</strong> {assignmentDetails.submitted_count} students
        //                 </p>
        //                 <p className="text-gray-700">
        //                     <strong>Remaining:</strong> {assignmentDetails.remaining_count} students
        //                 </p>
        //             </div>
        //             <h3 className="font-medium text-gray-800 mb-2">Submitted Students:</h3>
        //             <ul className="space-y-2">
        //                 {assignmentDetails.submitted_students.map((student) => (
        //                     <li key={student.student_id} className="text-gray-600">{student.student_name}</li>
        //                 ))}
        //             </ul>
        //             <h3 className="font-medium text-gray-800 mt-6 mb-2">Remaining Students:</h3>
        //             <ul className="space-y-2">
        //                 {assignmentDetails.remaining_students.map((student) => (
        //                     <li key={student.student_id} className="text-gray-600">{student.student_name}</li>
        //                 ))}
        //             </ul>
        //         </div>
        //     )}
        // </div>




    )
}

export default ClassAssignment