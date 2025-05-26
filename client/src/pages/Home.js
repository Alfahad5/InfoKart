import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import Banner from "../components/home/Banner";

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

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productRes, categoryRes] = await Promise.all([
                    axios.get("http://localhost:8000/api/products"),
                    axios.get("http://localhost:8000/api/category"),
                ]);

                setProducts(productRes.data);
                setCategories(categoryRes.data);

                // Find one product for each category
                const selectedProducts = categoryRes.data.map(category => {
                    return productRes.data.find(product => product.category?._id === category._id);
                }).filter(product => product !== undefined); // Remove undefined entries

                setCategoryProducts(selectedProducts);
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Slick slider settings for categories with products
    const categorySettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: categoryProducts.length < 5 ? categoryProducts.length : 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: categoryProducts.length < 4 ? categoryProducts.length : 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: categoryProducts.length < 3 ? categoryProducts.length : 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                },
            },
        ],
    };

    // Slick slider settings for products
    const productSettings = {
        dots: true,
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
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <>
            <Navbar />
            <div className="px-10 py-5">
                <Banner />
            </div>

            <div className="p-4">
                <h1 className="text-2xl font-bold text-center">Welcome to Ecommerce Shop</h1>

                {loading ? (
                    <p className="text-center mt-6 text-gray-600">Loading...</p>
                ) : error ? (
                    <p className="text-center mt-6 text-red-500">{error}</p>
                ) : (
                    <>
                        {/* Category Slider with One Post from Each Category */}
                        <div className="mt-6">
                            <h2 className="text-xl font-bold text-center mb-4">Shop by Category</h2>
                            <div className="relative">
                                {categoryProducts.length > 0 ? (
                                    <Slider {...categorySettings}>
                                        {categoryProducts.map((product) => (
                                            <div
                                                key={product._id}
                                                className="p-2"
                                                onClick={() => navigate(`/category/${product.category._id}/products`)}
                                            >
                                                <div className="bg-white p-4 rounded shadow-md text-center cursor-pointer hover:bg-gray-100">
                                                    <h3 className="text-lg font-semibold">{product.category.name}</h3>
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-32 object-cover mt-2 mb-2 rounded"
                                                    />
                                                    <p className="text-sm text-gray-600">{product.name}</p>
                                                    <p className="text-lg font-bold mt-2">₹{product.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                ) : (
                                    <p className="text-center">No categories available.</p>
                                )}
                            </div>
                        </div>

                        {/* Product Slider */}
                        <div className="mt-6">
                            <h2 className="text-xl font-bold text-center">Products</h2>
                            <div className="relative mt-4">
                                {products.length > 0 ? (
                                    <Slider {...productSettings}>
                                        {products.map((product) => (
                                            <div
                                                key={product._id}
                                                className="p-2"
                                                onClick={() => navigate(`/product/${product._id}`)}
                                            >
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
                    </>
                )}
            </div>
        </>
    );
};

export default Home;
