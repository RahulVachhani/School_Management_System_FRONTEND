import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { useUser } from "../../App";
import { useNavigate } from "react-router-dom";
import Spinner from '../../Spinner';

function ShowEnrollClass() {
    const navigate = useNavigate(); // Use the useNavigate hook
    const { data,getData } = useUser()
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(false)

    const getAllEnrollClass = async () => {
        try {
            setLoading(true)
            const res = await api.get(`api/student/classes-subjects/?student_id=${data.id}`)
            if (res && res.data) {
                console.log("data :", res.data)
                setClasses(res.data.classes)
                setLoading(false)
            }
        }
        catch (error) {
            console.log('error :', error)
            console.log('data _id : ',data.id)
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
        getAllEnrollClass()
        
    },[])

    return (
        <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-100">
              {loading && (
                <div className="flex justify-center mb-1">
                    <Spinner />
                </div>
            )}
            
                <div 
                    key={classes.id} 
                    onClick={() => {
                        navigate(`/show-class-details/${classes.id}`)
                    }}
                    className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-72">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {classes.name} {classes.section}
                    </h3>
                    
                </div>
            
        </div>
    )
}

export default ShowEnrollClass