import React, { useState, useEffect } from 'react';
import { useUser } from './App';
import api from '../api';

function NotificationList() {
    const [notifications, setNotifications] = useState([]);
    const {data} = useUser()
    // Fetch notifications from the API
    const fetchNotifications = async () => {
        try {
            const response = await api.get(`api/school/notification/${data.id}/`); 
            setNotifications(response.data);
        } catch (error) {
            console.log('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications(); // Fetch notifications when the component mounts
    }, []);

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
                                {notification.read ? 'Read' : 'Unread'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NotificationList;
