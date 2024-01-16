import React from "react";
import LayoutComponent from "../commons/LayoutComponent";
import { tempData } from "./tempData";
import "./Bookings.css";

export default function Bookings() {
  function handleEdit(id) {
    // Add your edit logic here
    console.log(`Editing booking with ID: ${id}`);
  }

  function handleDelete(id) {
    // Add your delete logic here
    console.log(`Deleting booking with ID: ${id}`);
  }

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
                    <td class='actions'>
                      <button onClick={() => handleEdit(booking.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(booking.id)}>
                        Delete
                      </button>
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
