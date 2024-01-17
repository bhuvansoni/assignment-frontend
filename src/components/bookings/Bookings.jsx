import React, { useEffect, useState } from "react";
import LayoutComponent from "../commons/LayoutComponent";
import "./Bookings.css";
import DeleteConfirmationPopup from "../popups/DeleteBooking";
import EditBooking from "../popups/EditBooking";
import { createCategory, deleteBooking, getBookings, getBookingsAdmin } from "../../utils/api";
import { useAuth } from "../commons/AuthProvider";
import NoBooking from "../commons/NoBooking";
import Loader from "../commons/Loader";
import { Slide, ToastContainer, toast } from "react-toastify";

import FormInput from "../commons/FormInput";

export default function Bookings() {
  const { accessToken, userId } = useAuth();
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editBookingId, setEditBookingId] = useState(null);
  const [deleteBookingId, setDeleteBookingId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");

  function formatDateToHHMM(inputDate) {
    const parsedDate = new Date(inputDate);
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${formattedHours}:${formattedMinutes}`;
  }

  function onEditPopupClose() {
    setLoading(true);
    if (accessToken) {
      getBookingsAdmin(accessToken).then((response) => {
        const formattedBookings = Object.keys(response).reduce((acc, date) => {
          const formattedBookingsForDate = response[date].map((booking) => ({
            ...booking,
            formattedStartTime: formatDateToHHMM(
              parseCustomDateString(booking.startDate)
            ),
            formattedEndTime: formatDateToHHMM(
              parseCustomDateString(booking.endDate)
            ),
          }));

          acc[date] = formattedBookingsForDate;
          return acc;
        }, {});
        setLoading(false);
        setBookings(formattedBookings);
      });
    } else if (userId) {
      getBookings(userId).then((response) => {
        const formattedBookings = Object.keys(response).reduce((acc, date) => {
          const formattedBookingsForDate = response[date].map((booking) => ({
            ...booking,
            formattedStartTime: formatDateToHHMM(booking.startDate),
            formattedEndTime: formatDateToHHMM(booking.endDate),
          }));

          acc[date] = formattedBookingsForDate;
          return acc;
        }, {});
        setBookings(formattedBookings);
        setLoading(false);
      });
    }
  }

  function parseCustomDateString(customDateString) {
    const parts = customDateString.split(/[\/\s:]/);
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
    const year = parseInt(parts[2], 10);
    const hours = parseInt(parts[3], 10);
    const minutes = parseInt(parts[4], 10);

    return new Date(year, month, day, hours, minutes);
  }
  function formatDateTimeLocal(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  useEffect(() => {
    setLoading(true);
    if (accessToken) {
      getBookingsAdmin(accessToken).then((response) => {
        const formattedBookings = Object.keys(response).reduce((acc, date) => {
          const formattedBookingsForDate = response[date].map((booking) => ({
            ...booking,
            startDate: formatDateTimeLocal(
              parseCustomDateString(booking.startDate)
            ),
            endDate: formatDateTimeLocal(
              parseCustomDateString(booking.endDate)
            ),
            formattedStartTime: formatDateToHHMM(
              parseCustomDateString(booking.startDate)
            ),
            formattedEndTime: formatDateToHHMM(
              parseCustomDateString(booking.endDate)
            ),
          }));

          acc[date] = formattedBookingsForDate;
          return acc;
        }, {});
        setLoading(false);

        setBookings(formattedBookings);
      });
    } else if (userId) {
      getBookings(userId).then((response) => {
        const formattedBookings = Object.keys(response).reduce((acc, date) => {
          const formattedBookingsForDate = response[date].map((booking) => ({
            ...booking,
            startDate: formatDateTimeLocal(
              parseCustomDateString(booking.startDate)
            ),
            endDate: formatDateTimeLocal(
              parseCustomDateString(booking.endDate)
            ),
            formattedStartTime: formatDateToHHMM(
              parseCustomDateString(booking.startDate)
            ),
            formattedEndTime: formatDateToHHMM(
              parseCustomDateString(booking.endDate)
            ),
          }));

          acc[date] = formattedBookingsForDate;
          return acc;
        }, {});
        setBookings(formattedBookings);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [userId]);

  const handleDelete = (id) => {
    setLoading(true);
    deleteBooking(accessToken, id).then((response) => {
      if (accessToken) {
        getBookingsAdmin(accessToken).then((response) => {
          const formattedBookings = Object.keys(response).reduce(
            (acc, date) => {
              const formattedBookingsForDate = response[date].map(
                (booking) => ({
                  ...booking,
                  formattedStartTime: formatDateToHHMM(
                    parseCustomDateString(booking.startDate)
                  ),
                  formattedEndTime: formatDateToHHMM(
                    parseCustomDateString(booking.endDate)
                  ),
                })
              );

              acc[date] = formattedBookingsForDate;
              return acc;
            },
            {}
          );

          setBookings(formattedBookings);
        });
      } else if (userId) {
        getBookings(userId).then((response) => {
          const formattedBookings = Object.keys(response).reduce(
            (acc, date) => {
              const formattedBookingsForDate = response[date].map(
                (booking) => ({
                  ...booking,
                  formattedStartTime: formatDateToHHMM(booking.startDate),
                  formattedEndTime: formatDateToHHMM(booking.endDate),
                })
              );

              acc[date] = formattedBookingsForDate;
              return acc;
            },
            {}
          );
          setBookings(formattedBookings);
        });
      }
      setLoading(false);
    });
    setDeleteBookingId(null);
  };

  const handleDeletePopupOpen = (id) => {
    setDeleteBookingId(id);
  };

  const handleDeletePopupClose = () => {
    setDeleteBookingId(null);
  };

  const handleEditPopupOpen = (id) => {
    setEditBookingId(id);
  };

  const handleEditPopupClose = () => {
    setEditBookingId(null);
    onEditPopupClose();
  };
  const handleAddCategory = () => {
    // Perform any validation if needed
    if (newCategory.trim() === "") {
      // Display an error message or handle it as per your requirements
      return;
    }

    createCategory(accessToken, newCategory).then((response) => {
      toast.success("Category Created!", {
        position: "bottom-center",
        autoClose: 15,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    })
    // Your logic to add the category
    // Call the API or update the state accordingly

    // After adding the category, you may want to clear the input field
    setNewCategory("");
  };

  console.log(bookings);
  return (
    <LayoutComponent>
      {
        loading ? (
          <Loader />
        ) : bookings.length === 0 ? (
          <NoBooking />
        ) : (
          <div>
            {accessToken ? (
              <div className="add-category">
                <input
                  className="input-add-category"
                  type="text"
                  placeholder="New Category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button
                  className="button-add-category"
                  onClick={handleAddCategory}
                >
                  Add Category
                </button>
              </div>
            ) : undefined}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Created By</th>
                    <th>Email</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    {accessToken ? <th>Action</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(bookings).map((date) =>
                    bookings[date].map((booking, index) => (
                      <tr key={booking.id}>
                        {index === 0 ? (
                          <td rowSpan={bookings[date].length}>{date}</td>
                        ) : null}
                        <td>{booking.title}</td>
                        <td>{booking.category_name}</td>
                        <td>{booking.created_by}</td>
                        <td>{booking.email}</td>
                        <td>{booking.formattedStartTime}</td>
                        <td>{booking.formattedEndTime}</td>
                        {accessToken ? (
                          <td className="actions">
                            <button
                              onClick={() => handleEditPopupOpen(booking.id)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePopupOpen(booking.id)}
                            >
                              Delete
                            </button>
                            {deleteBookingId === booking.id && (
                              <DeleteConfirmationPopup
                                onDelete={() => handleDelete(booking.id)}
                                onClose={handleDeletePopupClose}
                                data={booking}
                              />
                            )}

                            {editBookingId === booking.id && (
                              <EditBooking
                                booking={booking}
                                onClose={handleEditPopupClose}
                              />
                            )}
                          </td>
                        ) : undefined}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <ToastContainer/> 
          </div>
        )

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
