import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { ProductShowcase } from "./components/ProductShowcase";
import { FoodDetails } from "./components/FoodDetails";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "products", Component: ProductShowcase },
      { path: "food/:id", Component: FoodDetails },
      { path: "dashboard", Component: Dashboard },
      { path: "dashbaord", Component: Dashboard },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
    ],
  },
]);
