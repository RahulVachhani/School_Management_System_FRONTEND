import React, { useEffect, useState } from 'react';
import api from '../../../api';

function ShowStudents() {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        const res = await api.get('api/all/students/');
        if (res && res.data) {
            setStudents(res.data);
            console.log(res.data)
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-100">
            {students.map((student, index) => (
                <div 
                    key={index} 
                    className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-72">
                    <h3 className="text-lg font-semibold text-gray-800">
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
            ))}
        </div>
    );
}

export default ShowStudents;
