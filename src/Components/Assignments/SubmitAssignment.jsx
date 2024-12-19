import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { useParams } from 'react-router-dom'


function SubmitAssignment() {
    const { sid, aid, ver } = useParams()

    const [submissionFile, setSubmissionFile] = useState("")
    const [status, setStatus] = useState("")
    const [succesMessage, setSuccessMessage] = useState('')
    const formData = new FormData()
    formData.append('submission_file', submissionFile)

    const submitAssignment = async () => {
        try {
            const res = await api.post(`api/class/assignment/submission/?student_id=${sid}&assignment_id=${aid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setSuccessMessage('Succesfully Submitted')
            console.log("res :", res.data)
            AssignmentStatus()
        }
        catch (error) {
            console.log('error')
        }
        
        
    }

    const AssignmentStatus = async () => {
        console.log('v:', ver)
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

        <>

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
                            disabled={ver == 'old' || status.assignment_status === "submitted" || status.assignment_status === 'graded'}
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={submitAssignment}
                        disabled={ver == 'old' || status.assignment_status === 'submitted' || status.assignment_status === 'graded'}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white 
                bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                ${status.assignment_status === 'submitted' || status.assignment_status === 'graded' || ver == 'old' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Submit
                    </button>
                </div>

                {/* Status Section */}
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700">Status:</h3>
                    <p
                        className={`text-lg ${status.assignment_status === 'submitted' || status.assignment_status === 'graded' ? 'text-green-600' : 'text-red-600'
                            }`}
                    >
                        {status.assignment_status}
                    </p>
                    <p>
                       {succesMessage != "" ? succesMessage : (status.assignment_status === 'submitted' || status.assignment_status === 'graded') && "You have already submitted your assignment."}
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
        </>
    )
}

export default SubmitAssignment