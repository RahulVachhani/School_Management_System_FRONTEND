// import React, { useEffect, useState } from 'react';
// import api from '../../../api';

// function ShowStudents() {
//     const [students, setStudents] = useState([]);

//     const fetchStudents = async () => {
//         const res = await api.get('api/all/students/');
//         if (res && res.data) {
//             setStudents(res.data);
//             console.log(res.data)
//         }
//     };

//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     return (
//         <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-100">
//             {students.map((student, index) => (
//                 <div 
//                     key={index} 
//                     className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-72">
//                     <h3 className="text-lg font-semibold text-gray-800">
//                         {student.first_name} {student.last_name}
//                     </h3>
//                     <p className="text-gray-600 mt-2">
//                         <strong>Email:</strong> {student.email}
//                     </p>
//                     <p className="text-gray-600 mt-2">
//                         <strong>Phone:</strong> {student.phone_number}
//                     </p>
//                     <p className="text-gray-600 mt-2">
//                         <strong>Enrollment:</strong> {student.enrollment_number}
//                     </p>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default ShowStudents;


import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

function ShowStudents() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const res = await api.get("api/all/students/");
            if (res && res.data) {
                setStudents(res.data);
            }
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleEdit = (studentId) => {
        navigate(`/edit-student-profile/${studentId}`)
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                Student List
            </h1>

            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {students.map((student, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {student.first_name} {student.last_name}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    <strong>Email:</strong> {student.email}
                                </p>
                                <p className="text-gray-600 mt-2">
                                    <strong>Phone:</strong> {student.phone_number}
                                </p>
                                <p className="text-gray-600 mt-2">
                                    <strong>Enrollment:</strong> {student.enrollment_number}
                                </p>
                            </div>
                            <button
                                onClick={() => handleEdit(student.id)}
                                className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Edit Profile
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ShowStudents;
