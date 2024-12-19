import React, { useState } from 'react'
import api from '../../../api';


function AddStudent() {
    const [successMessage, setSuccessMessage] = useState("") // State for success message
    // Form state
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        enrollment_number: "",
        phone_number: "",
        address: "",
        date_of_birth: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addStudent = async () => {
        const res = await api.post('api/all/students/', {
            ...formData
        })
        setSuccessMessage('Successfully created student')
        setTimeout(()=>{
            setSuccessMessage("")
        },4000)
        console.log("res :", res)
    }

    return (
        <div className="p-6 bg-blue-50">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Student</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Enrollment Number</label>
                    <input
                        type="text"
                        name="enrollment_number"
                        value={formData.enrollment_number}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">password</label>
                    <input
                        type="password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full -600 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500rounded"
                    />
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="col-span-1 md:col-span-2">
                    <button
                        onClick={addStudent}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Add Student
                    </button>
                </div>
            </div>
            {successMessage && (
                <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
                    {successMessage}
                </div>
            )}
        </div>
    )
}

export default AddStudent