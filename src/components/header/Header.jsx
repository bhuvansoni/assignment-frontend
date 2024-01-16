import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  function handleItemClick(page) {
    console.log("clicked page ", page);
    navigate("/" + page);
  }
  return (
    <header>
      <h2>Appointy</h2>
      <ul>
        <li onClick={() => handleItemClick("")}>Home</li>
        <li onClick={() => handleItemClick("bookings")}>Bookings</li>
      </ul>
    </header>
  );
}
