import React, { useState, useEffect,useContext } from 'react';
import { useUser } from './App';
import api from '../api';
import { useNotifications } from './NotificationContext';



function NotificationList() {

    const { notifications } = useNotifications();

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
            {notifications.length === 0 ? (
                <p className="text-gray-500">No new notifications</p>
            ) : (
                <ul className="space-y-4">
                    {notifications.map((notification) => (
                        <li
                            key={notification.id}
                            className={`p-4 border rounded-lg ${
                                notification.read ? 'bg-gray-100' : 'bg-blue-50'
                            }`}
                        >
                            <p className="text-gray-800">{notification.message}</p>
                            <span className="text-sm text-gray-500">
                                {notification.read ? 'Readed' : 'Unread'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}

export default NotificationList;
