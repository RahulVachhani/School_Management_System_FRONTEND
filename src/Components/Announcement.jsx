import React, { useState } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";

function Announcement() {
  const { cid } = useParams(); // Class ID from URL
  const [message, setMessage] = useState(""); // Announcement message
  const [successMessage, setSuccessMessage] = useState(""); // Success feedback
  const [errorMessage, setErrorMessage] = useState(""); // Error feedback
  const [loading, setLoading] = useState(false); // Loading state for button

  const sendAnnouncement = async () => {
    if (!message.trim()) {
      setErrorMessage("Message cannot be empty.");
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(`api/school/class/announcement/${cid}/`, {
        message: message.trim(),
      });

      console.log("res:", res.data);
      setSuccessMessage("Announcement sent successfully to all students!");
      setMessage("");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to send the announcement. Please try again.");
      setTimeout(() => setErrorMessage(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Create an Announcement
      </h1>
      <p className="text-gray-600 mb-6">
        Use this form to send announcements to all students in the class.
      </p>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your announcement here..."
        className="w-full h-32 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      ></textarea>
      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={sendAnnouncement}
          className={`px-6 py-2 rounded-md text-white font-bold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Announcement"}
        </button>
        <button
          onClick={() => setMessage("")}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-600"
        >
          Clear
        </button>
      </div>
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Announcement;
