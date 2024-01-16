import React from "react";
import "./Header.css";

export default function Header() {
  function handleItemClick(page) {
    console.log("clicked page ", page);
  }
  return (
    <header>
      <h2>Appointy</h2>
      <ul>
        <li onClick={() => handleItemClick('Home')}>Home</li>
        <li onClick={() => handleItemClick('Bookings')}>Bookings</li>
      </ul>
    </header>
  );
}
