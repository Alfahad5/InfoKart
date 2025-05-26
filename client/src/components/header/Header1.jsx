import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header1 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [headerTitle, setHeaderTitle] = useState(localStorage.getItem("widgetHeaderTitle") || "MyApp");
  const [searchPlaceholder, setSearchPlaceholder] = useState(localStorage.getItem("widgetSearchPlaceholder") || "Search...");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [buttons, setButtons] = useState(JSON.parse(localStorage.getItem("widgetButtons") || "[]"));

  const [logoUrl, setLogoUrl] = useState(localStorage.getItem("widgetLogoUrl") || "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png");

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem("token"));

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    const fetchWidgetConfig = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/headerWidget");
        setLogoUrl(data.logoUrl);
        setHeaderTitle(data.spanText || "MyApp");
        setButtons(data.buttons || []);

        localStorage.setItem("widgetLogoUrl", data.logoUrl);
        localStorage.setItem("widgetHeaderTitle", data.spanText || "MyApp");
        localStorage.setItem("widgetButtons", JSON.stringify(data.buttons || []));
      } catch (error) {
        console.error("Error fetching header widget:", error);
      }
    };

    fetchWidgetConfig();

    // Listen for header updates from HeaderWidget.js
    const handleWidgetConfigChange = () => {
      setLogoUrl(localStorage.getItem("widgetLogoUrl") || "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png");
      setHeaderTitle(localStorage.getItem("widgetHeaderTitle") || "Explore");
      setButtons(JSON.parse(localStorage.getItem("widgetButtons") || "[]"));
    };

    window.addEventListener("widgetConfigChange", handleWidgetConfigChange);
    return () => window.removeEventListener("widgetConfigChange", handleWidgetConfigChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

  // 🔍 Handle search input change
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const { data } = await axios.get(`http://localhost:8000/api/products/search?query=${query}`);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <header className="bg-blue-600 h-[55px] flex items-center px-6 shadow-md">
      {/* Logo Section */}
      <div className="flex-col ml-64 items-center space-x-2">
        <img src={logoUrl} alt="logo" className="w-[75px]" />
        <span className="text-white text-xs italic">
          {headerTitle} <span className="text-yellow-400">Plus</span>
        </span>
      </div>

      {/* Search Box */}
      <div className="relative flex-1 mx-6">
        <div className="flex items-center bg-white rounded-md px-3 py-1">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
            className="flex-1 outline-none px-2 text-sm"
          />
          <span className="text-blue-600">🔍</span>
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute top-10 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {searchResults.map((product) => (
              <div
                key={product._id}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons Section */}
      <div className="flex items-center space-x-6">
        {isLoggedIn ? (
          <>
            <Link to="/shop" className="text-white text-sm font-medium">
              🛒 <span>Cart</span>
            </Link>
            <button onClick={handleLogout} className="bg-white text-blue-600 text-sm font-semibold px-4 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 text-sm font-semibold px-4 py-1 rounded"
          >
            Login
          </button>
        )}

        {/* Dynamic Buttons */}
        <div className="flex items-center space-x-4">
          {buttons.map((button, index) => (
            <Link key={index} to={button.route} className="text-white text-sm font-medium">
              {button.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center text-white space-x-1">
          <span>Become a Seller</span>
        </div>
      </div>
    </header>
  );
};

export default Header1;
