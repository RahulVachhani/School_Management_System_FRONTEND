import React from "react";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineSetting,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useUser } from "../App";


function Navbar() {
  const { role } = useUser()
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-600 mb-6">School Management</h1>
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-4 p-3 rounded-lg transition shadow-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
            }`
          }
        >
          <AiOutlineHome className="text-xl" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `flex items-center space-x-4 p-3 rounded-lg transition shadow-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
            }`
          }
        >
          <AiOutlineUser className="text-xl" />
          <span>Login</span>
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `flex items-center space-x-4 p-3 rounded-lg transition shadow-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
            }`
          }
        >
          <AiOutlineBook className="text-xl" />
          <span>Register</span>
        </NavLink>
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `flex items-center space-x-4 p-3 rounded-lg transition shadow-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
            }`
          }
        >
          <AiOutlineSetting className="text-xl" />
          <span   >Logout</span>
        </NavLink>
        <NavLink
          to="/show-all-classes"
          className={({ isActive }) =>
            `flex items-center space-x-4 p-3 rounded-lg transition shadow-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
            }`
          }
        >
          <AiOutlineUser className="text-xl" />
          <span>Show all Classes</span>
        </NavLink>


        {role === "teacher" && (
          <>
            <NavLink
              to="/add-student"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition shadow-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                }`
              }
            >
              <AiOutlineUser className="text-xl" />
              <span>Add Student</span>
            </NavLink>
            <NavLink
              to="/add-class"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition shadow-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                }`
              }
            >
              <AiOutlineUser className="text-xl" />
              <span>Add Class</span>
            </NavLink>

            
            

            <NavLink
              to="/show-students"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition shadow-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                }`
              }
            >
              <AiOutlineBook className="text-xl" />
              <span>Show All Students</span>
            </NavLink>

            <NavLink
              to="/take-attendance"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition shadow-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                }`
              }
            >
              <AiOutlineSetting className="text-xl" />
              <span>Take Attendance</span>
            </NavLink>

          </>
        )
        }
        {role === "student" && (
          <>
            <NavLink
              to="/show-classes"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition shadow-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                }`
              }
            >
              <AiOutlineUser className="text-xl" />
              <span>Enroll Classes</span>
            </NavLink>
            <NavLink
              to="/show-assignment"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition shadow-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                }`
              }
            >
              <AiOutlineUser className="text-xl" />
              <span>Show all assignments</span>
            </NavLink>
            <NavLink
              to="/show-attendance"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition shadow-sm ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                }`
              }
            >
              <AiOutlineUser className="text-xl" />
              <span>Show Attendance</span>
            </NavLink>
          </>

        )}

      </nav>
    </>
  );
}

export default Navbar;
