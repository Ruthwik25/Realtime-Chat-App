// src/utils/timeFormatter.js

export const timeFormatter = (date) => {
    const now = new Date();
    const messageDate = new Date(date.seconds * 1000); // Convert Firestore timestamp to Date object
  
    const diffInSeconds = Math.floor((now - messageDate) / 1000);
    
    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minute${Math.floor(diffInSeconds / 60) > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) > 1 ? 's' : ''} ago`;
    } else {
      return messageDate.toLocaleString(); // Default format for older dates
    }
  };
  