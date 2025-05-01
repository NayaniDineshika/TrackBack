import React from "react";
import "./Toast.css"; 

const Toast = ({ message, onClose }) =>
{
   return (
    <div className="toast" role="alert">
  <div className="toast-message">
    <div className="icon icon--lg icon--thumb">...</div>
    <p>...</p>
  </div>
  <button className="toast-close-btn" onClick={onClose}>
    <span className="icon">...</span>
  </button>
</div>
   );
}

export default Toast;