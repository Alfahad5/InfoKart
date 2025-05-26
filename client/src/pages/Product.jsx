import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Product = () => {
    const { id } = useParams(); // get product id from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { handleAddToCart } = useCart();

    // Check if user is logged in using localStorage
    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p className="p-4 text-center">Loading product...</p>;
    if (!product) return <p className="p-4 text-center">Product not found.</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-cover rounded"
                    />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-2xl font-bold mb-6">₹{product.price}</p>
                    {isLoggedIn && (
                        <button
                            onClick={() => handleAddToCart(product._id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
