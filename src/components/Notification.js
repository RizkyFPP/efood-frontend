// Notification.js

import React, { useEffect } from "react";

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-500 text-white p-4 rounded-md shadow-md">
      <p>{message}</p>
      <button
        className="absolute top-0 right-0 mr-2 mt-1 text-white hover:text-gray-200 focus:outline-none"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
