import React, { useEffect, useState } from 'react'
import api from '../../../api'

function TakeAttendance() {
    const [classes, setClasses] = useState([])
    const [students, setStudent] = useState([])
    const [selectedClass, setSelectedClass] = useState("")
    const [attendance, setAttendance] = useState({})
    const [successMessage, setSuccessMessage] = useState("")

    const getAllClasses = async () => {
        try {
            const res = await api.get("api/school/class/")
            if (res && res.data) {

                setClasses(() => res.data)
            }
        }
        catch (error) {
            console.log("error :", error)
        }
    }

    const getStudents = async () => {

        try {
            console.log('class :', classes)
            console.log('cid :', selectedClass)
            const res = await api.get(`api/class/subjects-students/?class_id=${selectedClass}`)
            if (res && res.data) {
                console.log("data : ", res.data.students.data)
                setStudent(res.data.students.data)

                const initialAttendance = {}
                res.data.students.data.forEach(student => {
                    initialAttendance[student.id] = "present"

                })
                setAttendance(initialAttendance)
            }
        }
        catch (error) {
            console.log("error : ", error)
        }
    }

    const submitAttendance = async () => {
        console.log("Attendance Data:", attendance)
        const payload = {
            class_id: selectedClass,
            attendance: Object.entries(attendance).map(([student_id, status]) => ({
                student_id: parseInt(student_id),
                status: status
            })),
        };
        console.log("payload", payload)

        const res = await api.post('api/school/class/attendance/', payload)
        console.log('res :', res.data)
        setSuccessMessage("Attendance taken successfully")
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);


    }

    const handleAttendanceChange = (studentId) => {
        setAttendance((prev) => ({
            ...prev,
            [studentId]: prev[studentId] === "present" ? "absent" : "present"
        }))
    }



    useEffect(() => {
        getAllClasses()
    }, [])

    useEffect(() => {
        if (selectedClass) {
            getStudents()
        }
    }, [selectedClass])

    return (
        <>
        
            <div className="bg-gray-100 min-h-screen p-8">
                {/* Header */}
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-blue-600">Take Attendance</h1>

                    {/* Class Dropdown */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Select Class</label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <option value="">Select a Class</option>
                            {classes.map((ele) => (
                                <option key={ele.id} value={ele.id}>
                                    {ele.name} {ele.section}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Student Table */}
                    {students.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Student List</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full bg-gray-50 border-collapse rounded-lg">
                                    <thead>
                                        <tr className="bg-blue-500 text-white">
                                            <th className="p-3 text-left">#</th>
                                            <th className="p-3 text-left">Name</th>
                                            <th className="p-3 text-left">Enrollment Number</th>
                                            <th className="p-3 text-center">Present</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, index) => (
                                            <tr key={student.id} className="hover:bg-gray-100 border-b">
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3">{student.first_name} {student.last_name}</td>
                                                <td className="p-3">{student.enrollment_number}</td>
                                                <td className="p-3 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={attendance[student.id] === "present" ? true : false}
                                                        onChange={() => handleAttendanceChange(student.id)}
                                                        className="h-5 w-5 text-blue-500 focus:ring-blue-400"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={submitAttendance}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
                                >
                                    Submit Attendance
                                </button>
                            </div>
                        </div>
                    )}
                    {successMessage && (

                        <div className="mt-4 text-green-600 text-center font-medium">
                            {successMessage}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TakeAttendance