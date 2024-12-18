
// import React, { useState } from 'react';
// import api from '../../api'

// function Register() {
//   const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
//   const [firstname, setFirstname] = useState("")
//   const [lastname, setLastname] = useState("")
//   const [password, setPassword] = useState("")
//   const [is_teacher ,setIs_teacher] = useState(false)



//   const sendData = async (e) => {
//     e.preventDefault()

//     try {

//       let payload = {
//         username: username,
//         password: password,
//         email: email,
//         first_name: firstname,
//         last_name: lastname,
//       };

//       if (is_teacher) {
//         payload.is_teacher = true;
//       } else {
//         payload.is_student = true;
//       }

//       const res = await api.post('api/register/', payload);

//       const data = res
//       console.log("data : ", data, data.data, data.data.message)
//     }
//     catch (e) {
//       console.log('error', e, e.message)
//     }

//   }


//   return (
//     <>
//     <form onSubmit={sendData} >
//       <h1>{is_teacher ? "Teacher" : "Student"} : Login </h1>
//       <input  type="text"  autoComplete="username" value={username} placeholder='Enter username' onChange={(e) => setUsername(e.target.value)} required />
//       <br />
//       <input type="email" value={email} placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} required />
//       <br />
//       <input type="text"  autoComplete="username" value={firstname} placeholder='Enter first name' onChange={(e) => setFirstname(e.target.value)} required />
//       <br />
//       <input type="text" autoComplete="username" value={lastname} placeholder='Enter last name' onChange={(e) => setLastname(e.target.value)} required />
//       <br />
//       <input type="password" autoComplete="current-password" value={password} placeholder='Enter password ' onChange={(e) => setPassword(e.target.value)} required/>
//       <br />
//       <input type="submit" />
//       {is_teacher ? <button type="button" onClick={() => setIs_teacher(false)}>student login</button> : <button  type="button" onClick={() => setIs_teacher(true)}>Teacher login</button>}

//       </form>

//     </>
//   )
// }

// export default Register



import React, { useState } from 'react';
import api from '../../api';
import { Link, useNavigate } from "react-router-dom";
import Spinner from '../Spinner';


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [is_teacher, setIs_teacher] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      let payload = {
        username: username,
        password: password,
        email: email,
        first_name: firstname,
        last_name: lastname,
      };

      if (is_teacher) {
        payload.is_teacher = true;
      } else {
        payload.is_student = true;
      }

      const res = await api.post('api/register/', payload);
      console.log("Response:", res.data);
      setLoading(false)
      navigate("/login")
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg  p-8 w-full max-w-md opacity-95">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {is_teacher ? "Teacher" : "Student"} Registration
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              autoComplete="username"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              autoComplete="username"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
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
          {loading ?  (
          <div className="flex justify-center mb-1">
            <Spinner />
          </div>
        ) : (<button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>)}
        </form>
        <div className="mt-4 text-center flex">
          <p className="w-6/12  text-sm text-gray-600 mt-3 ">Already have account ? <Link to="/login" className="text-blue-600 hover:underline"> Login</Link></p>
          <div className="mb-11  w-6/12 text-right">
            <button
              type="button"
              onClick={() => setIs_teacher(!is_teacher)}
              className=" bg-blue-600 text-white py-2 p-1 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {is_teacher ? "Student" : "Teacher"} Registration
            </button>
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;

