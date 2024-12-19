import React, { useContext } from "react";
import { AiOutlineBell } from "react-icons/ai";
import api from "../../api";
import { useUser } from "../App";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../NotificationContext";

function Topbar() {
  const { unReadMessageCount, fetchNotifications, readNotification } = useNotifications();

  const { data, role } = useUser()
  const navigate = useNavigate()
  return (
    <div className="w-full flex items-center justify-between bg-white shadow px-6 py-3">
      {/* School Name */}
      <h1 className="text-lg font-bold text-blue-600"></h1>

      {/* User Profile Section */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button onClick={async () => {
          await readNotification(); // Mark all notifications as read
          await fetchNotifications(); navigate(`/notification`)
        }} className="relative p-2 rounded-full hover:bg-gray-100">
          <AiOutlineBell className="text-xl text-gray-600" />
          {unReadMessageCount != 0 && (<span className="absolute top-0 right-0 h-5 w-4 bg-red-500 rounded-full text-white">{unReadMessageCount}</span>)}
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2" >

          <img
            onClick={() => {
              navigate('/group-chat')
            }}
            src="https://via.placeholder.com/40"
            alt="User"
            className="h-10 w-10 rounded-full border"
          />
          <div>
            <h2 className="text-sm font-medium">{data.first_name}</h2>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
