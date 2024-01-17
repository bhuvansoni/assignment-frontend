import React from "react";
import "./Header.css";
import { useAuth } from "../commons/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const {accessToken,  clearUserData} = useAuth();
  const navigate = useNavigate();
  function handleItemClick(page) {
    navigate("/" + page);
  }

  

  function logout(){
    clearUserData();
    handleItemClick("")
  }
  
  return (
    <header>
      <h2>Appointy</h2>
      <ul>
        <li onClick={() => handleItemClick("")}>Home</li>
        <li onClick={() => handleItemClick("bookings")}>Bookings</li>
        {accessToken === null ? (
          <li onClick={() => handleItemClick("login")}>Login</li>
        ) : (
          <li onClick={() => logout()}>Logout</li>
        )}
      </ul>
    </header>
  );
}
