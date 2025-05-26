import { createContext, useContext, useState, useEffect } from "react";
import { fetchCart, addToCart, removeFromCart } from "../services-api/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [userToken, setUserToken] = useState(localStorage.getItem("token") || null);

    console.log("Token in CartContext is " + localStorage.getItem("token"));

    const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

    useEffect(() => {
        const handleAuthChange = () => {
            console.log("Auth change detected");
            const newToken = localStorage.getItem("token");
            const newUserId = localStorage.getItem("userId");

            setUserToken(newToken);
            setUserId(newUserId);
        };

        window.addEventListener("authChange", handleAuthChange);

        return () => window.removeEventListener("authChange", handleAuthChange);
    }, []);

    useEffect(() => {
        if (userToken && userId) {
            fetchCart(userToken).then(setCart); // Pass token properly
        } else {
            setCart([]); // Clear cart when user logs out
        }
    }, [userToken, userId]); // Re-fetch cart when userToken changes

    const handleAddToCart = async (itemId) => {
        if (!userId || !userToken) {
            alert("Please log in first.");
            return;
        }

        try {
            const updatedCart = await addToCart(itemId);
            if (updatedCart) setCart(updatedCart.items || []);  // ✅ Ensure valid state update
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const handleRemoveFromCart = async (itemId) => {
        try {
            const updatedCart = await removeFromCart(itemId);
            if (updatedCart) setCart(updatedCart.items || []);  // ✅ Ensure valid state update
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
