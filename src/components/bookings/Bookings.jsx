import React, { useState } from "react";
import LayoutComponent from "../commons/LayoutComponent";
import { tempData } from "./tempData";
import "./Bookings.css";
import DeleteConfirmationPopup from '../popups/DeleteBooking'
import EditBooking from "../popups/EditBooking";
export default function Bookings() {


  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);

  const handleDelete = (ic) => {
    // Implement your delete logic here
    console.log("Deleting booking...");
    // Close the popup after deletion
    setDeletePopupOpen(false);
  };

  const handleDeletePopupOpen = (id) => {
    setDeletePopupOpen(true);
  };

  const handleDeletePopupClose = () => {
    setDeletePopupOpen(false);
  };

  const handleEditDelete = (ic) => {
    // Implement your delete logic here
    console.log("Deleting booking...");
    // Close the popup after deletion
    setEditPopupOpen(false);
  };

  const handleEditPopupOpen = (id) => {
    setEditPopupOpen(true);
  };

  const handleEditPopupClose = () => {
    setEditPopupOpen(false);
  };

  return (
    <LayoutComponent>
      {
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Created By</th>
                <th>Email</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(tempData).map((date) =>
                tempData[date].map((booking, index) => (
                  <tr key={booking.id}>
                    {index === 0 ? (
                      <td rowSpan={tempData[date].length}>{date}</td>
                    ) : null}
                    <td>{booking.title}</td>
                    <td>{booking.created_by}</td>
                    <td>{booking.email}</td>
                    <td>{booking.startDate}</td>
                    <td>{booking.endDate}</td>
                    <td className="actions">
                      <button onClick={() => handleEditPopupOpen(booking.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeletePopupOpen(booking.id)}>
                        Delete
                      </button>
                      {isDeletePopupOpen && (
                        <DeleteConfirmationPopup
                          onDelete={handleDelete}
                          onClose={handleDeletePopupClose}
                          data={booking}
                        />
                      )}
                      {isEditPopupOpen && (
                        <EditBooking
                          onDelete={handleEditDelete}
                          booking={booking}
                          onClose={handleEditPopupClose}
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        // <div className="main-container">
        //   <ul className="main-content">
        //     {Object.keys(tempData).map((date) => (
        //       <li key={date}>
        //         <h2 className="heading">{date}</h2>
        //         {/* {tempData[date].map((booking) => (
        //           <div key={booking.id} className="booking-item">
        //             <p>{booking.title}</p>
        //             <p>{booking.created_by}</p>
        //             <p>{booking.email}</p>
        //             <p>{booking.startDate}</p>
        //             <p>{booking.endDate}</p>
        //           </div>
        //         ))} */}
        //       </li>
        //     ))}
        //   </ul>
        // </div>
      }
    </LayoutComponent>
  );
}
