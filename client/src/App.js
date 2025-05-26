import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import Header1 from './components/header/Header1';
import { CartProvider } from './context/CartContext';
import Footer from './components/footer/footer';
import ProtectedRoute from './components/ProtectedRoute';

// Static Routes
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Widget from "./pages/Widget";
import Product from "./pages/Product";
import SocialWidgetPage from './pages/widgets/SocialWidget';
import MailUsWidgetPage from './pages/widgets/MailUs';
import HeaderWidget from './pages/widgets/HeaderWidget';
import NotFound from './components/NotFound';
import CategoryProducts from './pages/CategoryProducts';

function App() {
  const [widgetRoutes, setWidgetRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/footer/widgetRoutes");
        setWidgetRoutes(response.data);
      } catch (error) {
        console.error("Error fetching widget routes:", error);
      }
    };
    fetchRoutes();
  }, []);


  const widgetComponentMap = {
    "/widgets/AboutWidget": React.lazy(() => import("./pages/widgets/AboutWidget")),
    "/widgets/HelpPolicyWidget": React.lazy(() => import("./pages/widgets/HelpPolicyWidget")),
    "/widgets/MailUs": React.lazy(() => import("./pages/widgets/MailUs")),
    "/abc": React.lazy(() => import("./abc")),
  };

  return (
    <Router>
      <CartProvider>
        <Header1 />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/category/:id/products" element={<CategoryProducts />} />

          {/* Protected Routes */}
          <Route
            path="/AdminDashboard"
            element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />}
          />
          <Route path="/widget" element={<ProtectedRoute element={<Widget />} allowedRoles={["admin"]} />} />

          <Route path="/widgets/SocialWidget" element={<SocialWidgetPage />} />
          <Route path="/widgets/MailUs" element={<MailUsWidgetPage />} />
          <Route path="/widgets/HeaderWidget" element={<HeaderWidget />} />

          <Route
            path="/UserDashboard"
            element={<ProtectedRoute element={<UserDashboard />} allowedRoles={["user"]} />}
          />

          {/* Dynamically Generated Routes */}
          {widgetRoutes.map(({ route }) => {
            const Component = widgetComponentMap[route];

            if (!Component) {
              console.warn(`Component not found for route: ${route}`);
              return null; // Skip rendering if component isn't found
            }

            return (
              <Route
                key={route}
                path={route}
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <Component />
                  </React.Suspense>
                }
              />
            );
          })}


          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />


        </Routes>

        <Footer />
      </CartProvider >
    </Router >
  );
}

export default App;
