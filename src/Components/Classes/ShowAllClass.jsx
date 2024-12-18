import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { useNavigate } from "react-router-dom";
import Spinner from '../../Spinner';


function ShowAllClass() {
    const navigate = useNavigate(); // Use the useNavigate hook

    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(false)
    const getAllClasses = async () => {
        try {
            setLoading(true)
            const res = await api.get("api/school/class/")
            if (res && res.data) {
                console.log("data", res.data)
                setClasses(() => res.data)
                setLoading(false)
            }

        }
        catch (error) {
            setLoading(false)
            console.log("error :", error)
        }

    }

    useEffect(() => {
        console.log('m')
        getAllClasses()
    }, [])

    return (

        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                School Classes Overview
            </h1>
            {loading && (
                <div className="flex justify-center mb-1">
                    <Spinner />
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.length > 0 &&
                    classes.map((ele) => (
                        <div
                            key={ele.id}
                            onClick={() => {
                                navigate(`/show-class-details/${ele.id}`)
                            }}
                            className="bg-white border border-gray-300 rounded-xl shadow-md p-6 flex flex-col items-center"
                        >
                            <h3 className="text-lg font-bold text-gray-800">
                                {ele.name} - Section {ele.section}
                            </h3>
                            <p className="text-gray-600 mt-2 text-sm">
                                Total Students: <span className="font-medium">45</span> {/* Mock Data */}
                            </p>

                        </div>
                    ))}
            </div>
        </div>
    )
}


export default ShowAllClass