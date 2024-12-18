import React, { useEffect, useState } from 'react';
import api from '../../../api';

function GroupChat() {
    const [messages, setMessages] = useState({ data: [], currentUser: '' });
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = async () => {
        const res = await api.get('api/school/chatroom/');
        console.log('data :', res.data)
        setMessages(res.data);
    };

    const sendMessage = async () => {
        await api.post('api/school/chatroom/', { "message": newMessage });
        setNewMessage('');
        fetchMessages(); // Refresh messages
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
     

        <div className="p-4 bg-gray-100 min-h-screen flex flex-col">
            <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Group Chat Room</h1>

            {/* Chat Container */}
            <div className="flex-1 bg-white shadow-md rounded-lg p-4 mb-4 overflow-y-auto max-h-96 space-y-2">
                {messages.data.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender.username === messages.currentUser
                                ? 'justify-end' // Align right for current user
                                : 'justify-start' // Align left for others
                            }`}
                    >
                        <div
                            className={`max-w-xs p-2 rounded-lg shadow ${msg.sender.username === messages.currentUser
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
                                }`}
                        >
                            <p className="text-sm font-medium mb-1">
                                {msg.sender.username !== messages.currentUser && msg.sender.username}
                            </p>
                            <p className="text-sm">{msg.message}</p>
                            <p className="text-xs text-right mt-1 opacity-70">
                                {new Date(msg.created_at).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Section */}
            <div className="flex items-center bg-white rounded-full shadow-md p-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-4 py-2 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Type your message..."
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </div>
        </div>

    );
}

export default GroupChat;
