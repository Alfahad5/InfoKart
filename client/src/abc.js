import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

// Custom arrow components
const NextArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div
            className="absolute z-10 right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-200"
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <span className="text-xl text-gray-700">&gt;</span>
        </div>
    );
};

const PrevArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div
            className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-200"
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <span className="text-xl text-gray-700">&lt;</span>
        </div>
    );
};

const Abc = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/products").then(({ data }) => setProducts(data));
    }, []);

    // Slick slider settings
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
                    arrows: false, // Hide arrows on very small screens
                },
            },
        ],
    };
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center">Welcome to MORE Page</h1>
            <div className="mt-6">
                <h2 className="text-xl font-bold text-center">Products</h2>
                <div className="relative mt-4">
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

export default Abc;
