import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

// Custom arrow components
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} text-3xl text-gray-600 hover:text-gray-800`}
            style={{ ...style, display: "block", right: "10px" }}
            onClick={onClick}
        >
            &gt;
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} text-3xl text-gray-600 hover:text-gray-800`}
            style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
            onClick={onClick}
        >
            &lt;
        </div>
    );
};

const UserDashboard = () => {
    const [products, setProducts] = useState([]);
    const { handleAddToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/products");
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Carousel settings with custom arrows
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: products.length < 3 ? products.length : 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: products.length < 2 ? products.length : 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: true,
                    nextArrow: <NextArrow />,
                    prevArrow: <PrevArrow />,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false, // Hide arrows on very small screens if desired
                },
            },
        ],
    };

    const navigate = useNavigate();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center">User Dashboard</h1>
            <div className="mt-6">
                <h2 className="text-xl font-bold text-center">Products</h2>
                <div className="mt-4">
                    {products.length > 0 ? (
                        <Slider {...settings}>
                            {products.map((product) => (
                                <div key={product._id} className="p-2" onClick={() => navigate(`/product/${product._id}`)}>
                                    <div className="bg-white p-4 rounded shadow-md">
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-48 object-cover mt-2 mb-2"
                                        />
                                        <p className="text-sm text-gray-600">{product.description}</p>
                                        <p className="text-lg font-bold mt-2">₹{product.price}</p>
                                        <button
                                            onClick={() => handleAddToCart(product._id)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p className="text-center">No products available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
