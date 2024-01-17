import "./App.css";
import Bookings from "./components/bookings/Bookings";
import HomePage from "./components/home-page/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/bookings",
    element: <Bookings/>
  },
  {
    path: "/login",
    element: <Login/>
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
