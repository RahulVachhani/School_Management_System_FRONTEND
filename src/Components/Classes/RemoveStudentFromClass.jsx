import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../api'
import Spinner from '../../Spinner'

function RemoveStudentFromClass() {
    const { cid } = useParams()
    const [students, setStudents] = useState([])
    const [selectedStudent, setSelectedStudent] = useState("")
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const getClassStudent = async () => {
        setLoading(true)
        try {
            const res = await api.get(`api/class/subjects-students/?class_id=${cid}`)
            if (res.data) {
                setStudents(res.data.students.data)
            }
        }
        catch (error) {
            console.log('error :', error)
        }
        finally {
            setLoading(false)
        }
    }
    const RemoveFromClass = async () => {
        setLoading(true)
        
        try {
            const res = await api.post(`api/school/student/remove/class/`, {
                "student_id": selectedStudent
            })
            setSuccessMessage("Student successfully remove from the class!")
            setSelectedStudent("")
            setStudents((prev) => prev.filter((stu)=> stu.id != selectedStudent))
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        }
        catch(error){
            console.log('error :',error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getClassStudent()
    }, [])
    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10">
            {loading && <div className="flex justify-center mb-1">
                <Spinner />
            </div>}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add Student to Class</h2>

            {students.length === 0 && (
                <p className="text-gray-600">No students available to remove from the class.</p>
            )}
            {students.length > 0 && (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="student" className="block text-gray-700 font-medium mb-2">
                            Select a Student
                        </label>
                        <select
                            id="student"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                        >
                            <option value="" disabled>Select a student</option>
                            {students.map((stu) => (
                                <option value={stu.id} key={stu.id}>
                                    {stu.first_name} {stu.last_name} ({stu.enrollment_number})
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={RemoveFromClass}
                           disabled={loading || !selectedStudent}
                        className={`w-full px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        Remove From Class
                    </button>
                </div>
            )}
            {successMessage && (
                <div className="mt-4 text-green-600 text-center font-medium">
                    {successMessage}
                </div>
            )}
        </div>

    )

}

export default RemoveStudentFromClass