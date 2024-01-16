import "./App.css";
import Bookings from "./components/bookings/Bookings";
import Header from "./components/header/Header";
import HomePage from "./components/home-page/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/bookings",
    element: <Bookings/>
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider  router={router}/>
    </div>
  );
}

export default App;
