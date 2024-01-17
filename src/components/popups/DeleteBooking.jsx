import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DeleteBooking.css'
export default function DeleteConfirmationPopup({ onDelete, onClose }) {
  return (
    <Popup
      open
      modal
      closeOnDocumentClick={false}
      className='popup-overlay'
    >
      <div className="modal">
        
        <div className="header">Delete Confirmation</div>
        <div className="content">
          Are you sure you want to delete this booking?
        </div>
        <div className="actions">
          <button className="button" onClick={onDelete}>
            Yes, delete
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Popup>
  );
}
