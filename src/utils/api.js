import axios from "axios";

const BASE_URL = "https://meeting-app-backend-phi.vercel.app";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    const data = response.data;
    console.log("Login Successful.", data);
    return data;
  } catch (error) {
    console.error("Login failed:", error.response.data.message);
  }
};

export const createUser = async (name, email) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/create_user`, {
      name,
      email,
    });
    console.log("User created successfully:", response.data.message);
  } catch (error) {
    console.error("User creation failed:", error.response.data.message);
  }
};

// Category API
export const createCategory = async (accessToken, categoryName) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/categories/create-category`,
      {
        category_name: categoryName,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("Category created successfully:", response.data.message);
  } catch (error) {
    console.error("Category creation failed:", error.response.data.message);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/get-categories`);
    return response.data.categories;
  } catch (error) {
    console.error("Failed to get categories:", error.response.data.message);
  }
};

// Booking API
export const getBookings = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/bookings/bookings?user_id=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.bookings;
  } catch (error) {
    console.error("Failed to get bookings:", error.response.data.message);
  }
};

export const createBooking = async (
  title,
  name,
  email,
  category_id,
  startTime,
  endTime
) => {
  try {
    const data = {
      title,
      category_id,
      startTime,
      endTime,
      name,
      email,
    };
    console.log(data, "this is the post data");
    const response = await axios.post(`${BASE_URL}/bookings/bookings`, data);
    console.log("Booking created successfully:", response);
    return response.data.user_id
  } catch (error) {
    console.error("Booking creation failed:", error);
  }
};

export const deleteBooking = async (accessToken, bookingId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/bookings/${bookingId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("Booking deleted successfully:", response.data.message);
  } catch (error) {
    console.error("Booking deletion failed:", error.response.data.message);
  }
};


export const getBookingsAdmin = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/bookings/get-bookings-admin`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.bookings;
  } catch (error) {
    console.error('Error fetching admin bookings:', error);
    throw error;
  }
};

export const handleUpdateBooking = async (bookingIdToUpdate, updatedBookingData, accessToken) => {
  try {
    const response = await axios.put(`${BASE_URL}/bookings/${bookingIdToUpdate}`, updatedBookingData, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Replace with your actual access token
      },
    });

    console.log("Booking updated successfully:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error updating booking:", error.response ? error.response.data.message : error.message);
  }
};