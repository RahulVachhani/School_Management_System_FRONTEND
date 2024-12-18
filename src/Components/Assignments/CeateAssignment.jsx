import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { useParams } from 'react-router-dom'
import { useUser } from '../../App'
import Spinner from '../../Spinner'

function CreateAssignment() {
    const { sid, cid } = useParams()
    const { data } = useUser()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)



    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('due_date', deadline)
        formData.append('subject_id', sid)
        formData.append('class_model_id', cid)
        formData.append('teacher_id', data.id)
        // formData.append('file', file)

        try {
            const res = await api.post('/api/assignments/create/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            console.log('res :', res.data)
            setLoading(false)
        } catch (err) {
            console.log('Error creating assignment:', err)
            setLoading(false)
        }
    }

    useEffect(() => {


    })

    return (
        //     <form onSubmit={handleSubmit}>
        //         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        //         <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        //         <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        //         {/* <input type="file" onChange={handleFileChange} /> */}
        //         <button type="submit">Create Assignment</button>
        //     </form>

        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Assignment</h2>

            {/* Title */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter assignment title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="description"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a brief description"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                ></textarea>
            </div>

            {/* Deadline */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="deadline">
                    Deadline
                </label>
                <input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* File Upload */}
            {/* Uncomment if needed */}
            {/* 
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2" htmlFor="file">
      Attach File
    </label>
    <input
      type="file"
      id="file"
      onChange={handleFileChange}
      className="w-full file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  </div> 
  */}

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Create Assignment
                </button>
            </div>
            {loading && (
          <div className="flex justify-center mb-1">
            <Spinner />
          </div>
        )}
        </form>

    )
}

export default CreateAssignment
