// import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./page/home";

const RouterMain = () => {
    // const [products, setProducts] = useState([]);
    const router = createBrowserRouter([
        {
          path: "/",
          element: (
            <>
              <Navbar />
              <Home />
              <Footer/>
            </>
          ),
        },
      ]);

      return (
        <RouterProvider router={router} />
      );    
}

export default RouterMain;