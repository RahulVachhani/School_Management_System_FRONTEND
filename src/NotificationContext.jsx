import React, { useState, useEffect, createContext, useContext } from 'react';
import { useUser } from './App';
import api from '../api';

const NotificationContext = createContext();
export const useNotifications = () => useContext(NotificationContext);


function NotificationProvide({children}) {

    const [notifications, setNotifications] = useState([]);
    const [unReadMessageCount, setUnReadMessageCount] = useState(0)
    const { data } = useUser()

    const fetchNotifications = async () => {
        try {
            const response = await api.get(`api/school/notification/${data.id}/`);
            setNotifications(response.data.notification);
            setUnReadMessageCount(response.data.unReadCount);
        } catch (error) {
            console.log('Error fetching notifications:', error);
        }
    };

    const readNotification = async()=>{
        console.log('read')
        try{
            const res = await api.post(`api/school/notification/${data.id}/`)
            console.log('done')
        }
        catch(error){
            console.log('error in notification :',error)
        }
    }

    useEffect(() => {
        if (data?.id) fetchNotifications();
    }, [data?.id]);
    return (
        <NotificationContext.Provider
            value={{notifications,unReadMessageCount,readNotification,fetchNotifications}}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvide