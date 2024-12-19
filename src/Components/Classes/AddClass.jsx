// import React, { useState } from 'react'
// import api from '../../../api'

// function AddClass() {
//     const [className, setClassName] = useState("") 
//     const [classSection, setClassSection] = useState("")


//     const createClass = async () => {
//         try {
//             const res = await api.post('api/school/class/', {
//                 name: className,
//                 section: classSection
//             })
//             if (res.data) {
//                 console.log('class created', res.data.name)
//                 setClassName("")
//                 setClassSection("")
//             }
//         }
//         catch(error){
//             alert(`error ${error}`)
//         }

//     }
//     return (
    
//         <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
//             <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">Add New Class</h1>

//             <div className="space-y-4">
//                 <div>
//                     <label htmlFor="className" className="block text-sm font-medium text-gray-700">Class Name</label>
//                     <input
//                         id="className"
//                         type="text"
//                         value={className}
//                         onChange={(e) => setClassName(e.target.value)}
//                         placeholder="Enter class name"
//                         className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="classSection" className="block text-sm font-medium text-gray-700">Class Section</label>
//                     <input
//                         id="classSection"
//                         type="text"
//                         value={classSection}
//                         onChange={(e) => setClassSection(e.target.value)}
//                         placeholder="Enter class section"
//                         className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                 </div>

               
//                 <button
//                     onClick={createClass}
                    
//                     className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-400 `}
//                 >
//                    Add Class
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default AddClass


import React, { useState } from 'react';
import api from '../../../api';

function AddClass() {
  const [className, setClassName] = useState(""); 
  const [classSection, setClassSection] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const createClass = async () => {
    if (!className.trim() || !classSection.trim()) {
      setErrorMessage("Both fields are required.");
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('api/school/class/', {
        name: className.trim(),
        section: classSection.trim()
      });

      if (res.data) {
        console.log('class created:', res.data.name);
        setSuccessMessage("Class created successfully!");
        setClassName("");
        setClassSection("");
        setTimeout(() => setSuccessMessage(""), 4000);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to create class. Please try again.");
      setTimeout(() => setErrorMessage(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-bold text-blue-600 mb-6">
        Add New Class
      </h1>

      <div className="space-y-6">
        {/* Class Name Input */}
        <div>
          <label htmlFor="className" className="block text-sm font-medium text-gray-700">
            Class Name
          </label>
          <input
            id="className"
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Enter class name"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm sm:text-sm"
          />
        </div>

        {/* Class Section Input */}
        <div>
          <label htmlFor="classSection" className="block text-sm font-medium text-gray-700">
            Class Section
          </label>
          <input
            id="classSection"
            type="text"
            value={classSection}
            onChange={(e) => setClassSection(e.target.value)}
            placeholder="Enter class section"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm sm:text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between space-x-4">
          <button
            onClick={createClass}
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Add Class"}
          </button>
        </div>

        {/* Success and Error Messages */}
        {successMessage && (
          <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddClass;
