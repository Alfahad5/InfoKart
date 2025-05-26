import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import Sidebar from "../components/sidebar/Sidebar";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ name: "", price: "", image: "", description: "", category: "" });
    const [editProductId, setEditProductId] = useState(null);
    const [newCategory, setNewCategory] = useState(""); // New category input

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/products");
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/category");
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Handle form input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle adding/updating product
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let categoryId = formData.category;

            if (newCategory) {
                // If the user entered a new category, create it first
                const { data: category } = await axios.post("http://localhost:8000/api/category", { name: newCategory });
                categoryId = category._id;
            }

            const productData = { ...formData, category: categoryId };

            if (editProductId) {
                await axios.put(`http://localhost:8000/api/products/${editProductId}`, productData);
            } else {
                await axios.post("http://localhost:8000/api/products/add", productData);
            }

            fetchProducts();
            fetchCategories();
            handleCancelEdit();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    // Handle deleting a product
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Handle editing a product
    const handleEditProduct = (product) => {
        setFormData({
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            category: product.category?._id || "", // Ensure category ID is set
        });
        setEditProductId(product._id);
        setNewCategory(""); // Reset new category field
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setFormData({ name: "", price: "", image: "", description: "", category: "" });
        setEditProductId(null);
        setNewCategory("");
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-6 w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>

                {/* Add / Update Product Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                    <h2 className="text-xl font-semibold text-center mb-4">
                        {editProductId ? "Update Product" : "Add Product"}
                    </h2>

                    <input type="text" name="name" placeholder="Product Name" className="w-full p-2 mb-3 border rounded-md" value={formData.name} onChange={handleChange} required />
                    <input type="number" name="price" placeholder="Price" className="w-full p-2 mb-3 border rounded-md" value={formData.price} onChange={handleChange} required />
                    <input type="text" name="image" placeholder="Image URL" className="w-full p-2 mb-3 border rounded-md" value={formData.image} onChange={handleChange} required />
                    <textarea name="description" placeholder="Description" className="w-full p-2 mb-3 border rounded-md" value={formData.description} onChange={handleChange} required />

                    {/* Category Selection */}
                    <select name="category" className="w-full p-2 mb-3 border rounded-md" value={formData.category} onChange={handleChange} >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>

                    {/* New Category Input */}
                    <input
                        type="text"
                        placeholder="Or Enter New Category"
                        className="w-full p-2 mb-3 border rounded-md"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />

                    <div className="flex gap-2">
                        <button type="submit" className={`flex-1 ${editProductId ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"} text-white py-2 rounded-md`}>
                            {editProductId ? "Update Product" : "Add Product"}
                        </button>
                        {editProductId && (
                            <button type="button" onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center gap-1">
                                <FaTimes /> Cancel
                            </button>
                        )}
                    </div>
                </form>

                {/* Products Table */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-center mb-4">Products</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-left">Image</th>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Price</th>
                                    <th className="px-4 py-2 text-left">Category</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                    <th className="px-4 py-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} className="border-b hover:bg-gray-100">
                                        <td className="px-4 py-2"><img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" /></td>
                                        <td className="px-4 py-2">{product.name}</td>
                                        <td className="px-4 py-2 font-semibold">₹{product.price}</td>
                                        <td className="px-4 py-2">{product.category?.name || "N/A"}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{product.description}</td>
                                        <td className="px-4 py-2 flex items-center justify-center gap-3">
                                            <button onClick={() => handleEditProduct(product)} className="text-blue-500 hover:text-blue-700 text-lg"><FaEdit /></button>
                                            <button onClick={() => handleDeleteProduct(product._id)} className="text-red-500 hover:text-red-700 text-lg"><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
