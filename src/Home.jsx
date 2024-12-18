import React, { useEffect } from 'react'
import { useUser } from "./App";

function Home() {
  const {getData,data} = useUser()
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className=" bg-gray-50 flex items-center justify-center  ">
            <div className="max-w-7xl w-full  text-center">
                <div className="bg-white shadow-xl rounded-lg p-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome to the School Management System (SMS)
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Manage classes, assignments, attendance, and more—all in one place.
                    </p>
                    <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Hello, {data.first_name} {data.last_name}!
                        </h2>
                        <p className="text-lg text-gray-600 mt-2">
                            We’re glad to have you as part of our system. You can start managing your tasks from here.
                        </p>
                    </div>
                </div>

                
            </div>
        </div>
  )
}

export default Home