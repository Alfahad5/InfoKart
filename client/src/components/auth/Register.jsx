import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";  // Use Link instead of <a>

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();  // Prevents the page from reloading
        setError("");
        setSuccess("");
        try {
            await axios.post("http://localhost:8000/api/auth/register", formData);
            setSuccess("Registration successful! You can now login.");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                {/* Use form instead of div */}
                <form onSubmit={handleRegister}>
                    <input
                        type="text" name="name" placeholder="Name"
                        className="w-full p-2 mb-3 border rounded-md"
                        value={formData.name} onChange={handleChange} required
                    />
                    <input
                        type="email" name="email" placeholder="Email"
                        className="w-full p-2 mb-3 border rounded-md"
                        value={formData.email} onChange={handleChange} required
                    />
                    <input
                        type="password" name="password" placeholder="Password"
                        className="w-full p-2 mb-3 border rounded-md"
                        value={formData.password} onChange={handleChange} required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md">
                        Register
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
