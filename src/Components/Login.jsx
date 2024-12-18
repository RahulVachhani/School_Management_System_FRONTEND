
import React, { useEffect, useState } from 'react'
import api from '../../api'
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../App';
import Spinner from '../Spinner';


function Login() {
    const { getData, data } = useUser()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const sendData = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await api.post("api/login/", {
            username: username,
            password: password
        })

        localStorage.setItem("access", res.data.access)
        localStorage.setItem("refresh", res.data.refresh)

        if (localStorage.getItem('access')) {
            setLoading(false)
            navigate('/')
        }

    }

    useEffect(() => {
        if (localStorage.getItem("access")) {
            getData()
        }
    }, [])

    return (
        <>

            {/* <div className="flex-grow flex items-center justify-center p-6">
                <div className="bg-white shadow-xl rounded-lg  p-8 w-full max-w-md opacity-95">
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                        Login
                    </h2>
                    <form onSubmit={sendData} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                autoComplete="username"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200" >
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a></p>
                    </div>
                </div>
            </div> */}

            <div className="flex flex-1 items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h2>
                    <form onSubmit={sendData} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                autoComplete='username'
                                id="username"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                autoComplete='password'
                                id="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {loading ? (
                        <div className="flex justify-center mt-1">
                            <Spinner />
                        </div>
                    ) : (<button
                        type="submit"

                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                    >
                        Login
                    </button>)}
                    </form>
                    <p className="text-sm text-gray-600 text-center mt-4">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:underline">
                            Register here
                        </a>
                    </p>
                   
                </div>
            </div>

        </>
    )
}

export default Login
