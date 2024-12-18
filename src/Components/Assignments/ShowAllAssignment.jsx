import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { useUser } from '../../App'
import { useNavigate } from "react-router-dom";
import Spinner from '../../Spinner';


function ShowAllAssignment() {
  const navigate = useNavigate();
  const { data } = useUser()
  const [assignments, setAssignment] = useState([])
  const [loading, setLoading] = useState(false)

  const getAllAssignments = async () => {
    try {
      setLoading(true)
      const res = await api.get(`api/class/assignment/?student_id=${data.id}`)
      if (res && res.data) {
        console.log(res.data)
        setAssignment(res.data.assignments)
        setLoading(false)
      }
    }
    catch (error) {
      console.log("error : ", error)
      setLoading(false)
    }
  }


  useEffect(() => {
    getAllAssignments()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Your Assignments
      </h1>
      {loading && (
        <div className="flex justify-center mb-1">
          <Spinner />
        </div>
      )}
      {assignments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((ele) => (
            <div
              key={ele.id}
              className="bg-white rounded-lg shadow-lg border p-4 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {ele.title}
              </h2>
              <p className="text-gray-600 mb-4">{ele.description}{ele.id}</p>
              <p className="text-sm text-gray-500">
                <strong>Due Date:</strong>{" "}
                <span className="font-medium">
                  {new Date(ele.due_date).toLocaleDateString()}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                <strong>Subject:</strong> {ele.subject.name} (
                {ele.subject.code})
              </p>
              <p className="text-sm text-gray-500">
                <strong>Teacher:</strong> {ele.teacher.first_name}{" "}
                {ele.teacher.last_name}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Class:</strong> {ele.class_model.name} - Section{" "}
                {ele.class_model.section}
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={() => {
                navigate(`/submit-assignment/${data.id}/${ele.id}`)
              }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No assignments found. Please check back later.
        </p>
      )}
    </div>
  )
}

export default ShowAllAssignment