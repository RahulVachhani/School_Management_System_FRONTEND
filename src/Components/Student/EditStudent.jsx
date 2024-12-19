// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import api from '../../../api'

// function EditStudent() {
//     const { sid } = useParams()
//     const [details, setDetails] = useState({})
//     const studentDetails = async () => {
//         try {
//             const res = await api.get(`api/single/student/${sid}/`)
//             setDetails(res.data)
//             console.log('res :',res.data)
//         }
//         catch (error) {
//             console.log('error :', error)
//         }
//     }
//     useEffect(()=>{
//         studentDetails()
//     },[])

//     return (
//         <div>
//             <form>
//                <input type="text" value={details.first_name} onChange={(e)=> setDetails({...details,first_name:e.target.value})} />
//                <input type="text" value={details.last_name} onChange={(e)=> setDetails({...details,last_name:e.target.value})} />
//                <input type="text" value={details.enrollment_number ? details.enrollment_number : "null"} onChange={(e)=> setDetails({...details,enrollment_number:e.target.value})} />
//                <input type="date" value={details.date_of_birth} onChange={(e)=> setDetails({...details,date_of_birth:e.target.value})} />
//                <input type="text" value={details.address ? details.address : "null"} onChange={(e)=> setDetails({...details,address:e.target.value})} />
//                <input type="text" value={details.phone_number ? details.phone_number : "null"} onChange={(e)=> setDetails({...details,phone_number:e.target.value})} />
//             </form>
//         </div>
//     )
// }

// export default EditStudent

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";

function EditStudent() {
  const { sid } = useParams();
  const [details, setDetails] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const studentDetails = async () => {
    try {
      const res = await api.get(`api/single/student/${sid}/`);
      setDetails(res.data);
    } catch (error) {
      console.log("Error fetching student details:", error);
    }
  };

  const updateStudent = async () => {
    try {
      const res = await api.patch(`api/single/student/${sid}/`, details);
      setSuccessMessage("Student details updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.log("Error updating student details:", error);
    }
  };

  useEffect(() => {
    studentDetails();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-3">
        Edit Student Details
      </h1>
      <div className="mb-3 h-5">
      {successMessage && (
        <p className="p-2 mb-3 bg-green-100 border-l-4 border-green-500 text-green-700">
            {successMessage}
            </p>
        )}
        </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateStudent();
        }}
        className="space-y-4"
      >
        <div >
          <label
            htmlFor="first_name"
            className="block text-sm mt-6 font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            value={details.first_name || ""}
            onChange={(e) =>
              setDetails({ ...details, first_name: e.target.value })
            }
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            value={details.last_name || ""}
            onChange={(e) =>
              setDetails({ ...details, last_name: e.target.value })
            }
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="enrollment_number"
            className="block text-sm font-medium text-gray-700"
          >
            Enrollment Number
          </label>
          <input
            id="enrollment_number"
            type="text"
            value={details.enrollment_number || ""}
            onChange={(e) =>
              setDetails({ ...details, enrollment_number: e.target.value })
            }
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={details.email || ""}
            onChange={(e) =>
              setDetails({ ...details, email: e.target.value })
            }
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="date_of_birth"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            id="date_of_birth"
            type="date"
            value={details.date_of_birth || ""}
            onChange={(e) =>
              setDetails({ ...details, date_of_birth: e.target.value })
            }
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            value={details.address || ""}
            onChange={(e) => setDetails({ ...details, address: e.target.value })}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phone_number"
            type="text"
            value={details.phone_number || ""}
            onChange={(e) =>
              setDetails({ ...details, phone_number: e.target.value })
            }
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
