import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";  // Import useNavigate hook

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize navigate hook

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        setError(""); // Clear previous errors
        try {
            const { data } = await axios.post("http://localhost:8000/api/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            console.log("token in Login.jsx is: " + data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("userId", data.userId);

            // 🔥 Trigger a storage event manually for the same tab
            window.dispatchEvent(new Event("storage"));

            // Notify CartContext that the user is logged in
            window.dispatchEvent(new Event("authChange"));

            // Use navigate for redirection
            if (data.role === "admin") {
                navigate("/AdminDashboard");  // Redirect to AdminDashboard
            } else {
                navigate("/UserDashboard");  // Redirect to home page or user dashboard
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-3 border rounded-md"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-3 border rounded-md"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                        Login
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
