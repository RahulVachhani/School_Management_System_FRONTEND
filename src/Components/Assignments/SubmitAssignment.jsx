import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { useParams } from 'react-router-dom'


function SubmitAssignment() {
    const { sid, aid } = useParams()

    const [submissionFile, setSubmissionFile] = useState("")
    const [status, setStatus] = useState("")
    const formData = new FormData()
    formData.append('submission_file', submissionFile)

    const submitAssignment = async () => {
        const res = await api.post(`api/class/assignment/submission/?student_id=${sid}&assignment_id=${aid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log("res :", res.data)
    }

    const AssignmentStatus = async () => {
        const res = await api.get(`api/class/assignment/submission/?student_id=${sid}&assignment_id=${aid}`)
        setStatus(res.data)
        console.log(res.data.assignment_status)
    }
    useEffect(() => {
        AssignmentStatus()

        return () => {
            setStatus("")
        }
    }, [])


    return (

        //         <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
        //             <h1 className="text-center text-2xl font-semibold text-gray-800">Submit Assignment</h1>

        //             <div className="space-y-4">
        //                 <div>
        //                     <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">Choose a file</label>
        //                     <input
        //                         id="file-upload"
        //                         type="file"
        //                         onChange={(e) => setSubmissionFile(e.target.files[0])}
        //                         disabled={status.assignment_status === "Submitted"}
        //                         className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        //                     />

        //                 </div>

        //                 <button
        //                     onClick={submitAssignment}
        //                     disabled={status.assignment_status === 'Submitted'}
        //                     className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white 
        // bg-indigo-600 hover:bg-indigo-700
        //                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        //                 >
        //                     Submit
        //                 </button>
        //             </div>

        //             <div className="text-center">
        //                 <h3 className="text-lg font-semibold text-gray-700">Status:</h3>
        //                 <p className={`text-lg ${status.assignment_status === 'Submitted' ? 'text-green-600' : 'text-red-600'}`}>{status.assignment_status}</p>
        //                 <p>{status.assignment_status === 'Submitted' && "You have already submited"}</p>
        //             </div>
        //             {status.feedback && (
        //                 <h1>FeedBack By Teacher : {status.feedback}</h1>
        //             )}
        //         </div>

        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
            <h1 className="text-center text-2xl font-semibold text-gray-800">Submit Assignment</h1>

            {/* File Upload Section */}
            <div className="space-y-4">
                <div>
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                        Choose a file
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={(e) => setSubmissionFile(e.target.files[0])}
                        disabled={status.assignment_status === "Submitted"}
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={submitAssignment}
                    disabled={status.assignment_status === 'Submitted'}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white 
                bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                ${status.assignment_status === 'Submitted' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Submit
                </button>
            </div>

            {/* Status Section */}
            <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">Status:</h3>
                <p
                    className={`text-lg ${status.assignment_status === 'Submitted' ? 'text-green-600' : 'text-red-600'
                        }`}
                >
                    {status.assignment_status}
                </p>
                <p>
                    {status.assignment_status === 'Submitted' && "You have already submitted your assignment."}
                </p>
            </div>

            {/* Feedback Section */}
            {status.feedback && (
                <div className="mt-6 p-4 bg-gray-50 border-l-4 border-indigo-600 rounded-md shadow">
                    <h3 className="text-lg font-semibold text-gray-800">Teacher's Feedback</h3>
                    <p className="mt-2 text-gray-700">{status.feedback}</p>
                </div>
            )}
        </div>
    )
}

export default SubmitAssignment