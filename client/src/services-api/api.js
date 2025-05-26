const BASE_URL = "http://localhost:8000/api/cart"; // Change this based on your backend URL

export const addToCart = async (itemId) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage

    if (!userId) return alert("Please log in first!");
    if (!token) return alert("Authentication token not found. Please log in again.");

    try {
        const response = await fetch(`${BASE_URL}/add/${itemId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // ✅ Send token in Authorization header
            },
            credentials: "include", // Keep this in case cookies are needed
            body: JSON.stringify({ userId, itemId }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to add item to cart");
        return data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        alert(error.message);
    }
};



export const removeFromCart = async (itemId) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId) return alert("Please log in first!");
    if (!token) return alert("Authentication token not found. Please log in again.");

    try {
        const response = await fetch(`${BASE_URL}/remove`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // ✅ Token is sent correctly here
            },
            body: JSON.stringify({ userId, itemId }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to remove item from cart");
        return data;
    } catch (error) {
        console.error("Error removing from cart:", error);
        alert(error.message);
    }
};


export const fetchCart = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage

    if (!userId) return { items: [] };
    if (!token) return alert("Authentication token not found. Please log in again.");

    try {
        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, // ✅ Send token in Authorization header
            },
            credentials: "include",
        });

        const text = await response.text();
        console.log("Raw Response:", text);

        if (!response.ok) throw new Error("Failed to fetch cart");

        return JSON.parse(text);
    } catch (error) {
        console.error("Error fetching cart:", error);
        return { items: [] };
    }
};

export const updateCartQuantity = async (itemId, quantity) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId) return alert("Please log in first!");
    if (!token) return alert("Authentication token not found. Please log in again.");

    try {
        const response = await fetch(`${BASE_URL}/update-quantity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, itemId, quantity }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to update quantity");
        return data;
    } catch (error) {
        console.error("Error updating quantity:", error);
        alert(error.message);
    }
};

