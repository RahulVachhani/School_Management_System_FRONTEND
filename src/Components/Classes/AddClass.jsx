import React, { useState } from 'react'
import api from '../../../api'

function AddClass() {
    const [className, setClassName] = useState("") 
    const [classSection, setClassSection] = useState("")


    const createClass = async () => {
        try {
            const res = await api.post('api/school/class/', {
                name: className,
                section: classSection
            })
            if (res.data) {
                console.log('class created', res.data.name)
                setClassName("")
                setClassSection("")
            }
        }
        catch(error){
            alert(`error ${error}`)
        }

    }
    return (
        // <div>
        //    <input type="text" value={className}  onChange={(e) => setClassName(e.target.value)} placeholder='Enter class name'/>
        //    <br />
        //    <input type="text" value={classSection}  onChange={(e) => setClassSection(e.target.value)} placeholder='Enter class section'/>
        //    <br />

        //    <button onClick={createClass}>Add Class</button>

        // </div>
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">Add New Class</h1>

            <div className="space-y-4">
                <div>
                    <label htmlFor="className" className="block text-sm font-medium text-gray-700">Class Name</label>
                    <input
                        id="className"
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="Enter class name"
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="classSection" className="block text-sm font-medium text-gray-700">Class Section</label>
                    <input
                        id="classSection"
                        type="text"
                        value={classSection}
                        onChange={(e) => setClassSection(e.target.value)}
                        placeholder="Enter class section"
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

               
                <button
                    onClick={createClass}
                    
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-400 `}
                >
                   Add Class
                </button>
            </div>
        </div>
    )
}

export default AddClass