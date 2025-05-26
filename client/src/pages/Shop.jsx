import { useEffect, useState } from "react";
import { fetchCart, removeFromCart, updateCartQuantity } from "../services-api/api";

const Shop = () => {
    const [cartItems, setCartItems] = useState([]);

    // Fetch user's cart
    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const data = await fetchCart();
            setCartItems(data.items || []);
        } catch (error) {
            console.error("Error loading cart:", error);
        }
    };

    // Remove item from cart
    const handleRemoveFromCart = async (itemId) => {
        try {
            await removeFromCart(itemId);
            loadCart(); // Refresh cart after removal
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    // Increase or decrease quantity
    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) {
            await handleRemoveFromCart(itemId); // Remove if quantity drops below 1
            return;
        }
        try {
            await updateCartQuantity(itemId, newQuantity);
            loadCart(); // Refresh cart after update
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    // Buy (Clear Cart)
    const handleBuy = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (!userId || !token) return alert("Please log in first!");

            const response = await fetch(`http://localhost:8000/api/cart/clear/${userId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to buy items");

            alert("Purchase successful!");
            setCartItems([]); // Empty the cart
        } catch (error) {
            console.error("Error purchasing items:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map(({ itemId, quantity }) => (
                        <div
                            key={itemId._id}
                            className="flex items-center border p-4 rounded shadow-sm"
                        >
                            <img
                                src={itemId.image}
                                alt={itemId.name}
                                className="w-32 h-32 object-cover rounded"
                            />
                            <div className="flex-1 ml-4">
                                <h3 className="text-lg font-semibold">{itemId.name}</h3>
                                <p className="text-sm text-gray-600">{itemId.description}</p>
                                <div className="mt-2">
                                    <span className="text-lg font-bold">₹{itemId.price}</span>
                                </div>
                                <div className="mt-2 flex items-center">
                                    <button
                                        onClick={() =>
                                            handleUpdateQuantity(itemId._id, quantity - 1)
                                        }
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-l"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 border-t border-b">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleUpdateQuantity(itemId._id, quantity + 1)
                                        }
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-r"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="ml-4">
                                <button
                                    onClick={() => handleRemoveFromCart(itemId._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="text-right mt-4">
                        <button
                            onClick={handleBuy}
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;
