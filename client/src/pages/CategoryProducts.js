import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const CategoryProducts = () => {
    const { id } = useParams(); // Get category ID from URL
    const navigate = useNavigate(); // Hook for navigation
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const { handleAddToCart } = useCart(); // Cart function from context

    // Check if user is logged in using localStorage
    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/category/${id}/products`);
                if (response.data.length > 0) {
                    setCategoryName(response.data[0].category.name); // Set category name
                }
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching category products:", error);
            }
        };
        fetchProducts();
    }, [id]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-6">{categoryName}</h2>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white p-4 rounded shadow-md text-center cursor-pointer hover:shadow-lg transition"
                            onClick={() => navigate(`/product/${product._id}`)} // Navigate to single product page
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded"
                            />
                            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-lg font-bold mt-2">₹{product.price}</p>
                            {isLoggedIn && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent parent div click event from triggering
                                        handleAddToCart(product._id);
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md mt-3"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No products found in this category.</p>
            )}
        </div>
    );
};

export default CategoryProducts;
