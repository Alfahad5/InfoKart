import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

const AboutWidgetPage = () => {
    const [aboutLinks, setAboutLinks] = useState([]);
    const [newLabel, setNewLabel] = useState("");
    const [newRoute, setNewRoute] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editedLabel, setEditedLabel] = useState("");
    const [editedRoute, setEditedRoute] = useState("");

    // Fetch existing links from backend
    useEffect(() => {
        fetch("http://localhost:8000/api/footer/footerAbout")
            .then((res) => res.json())
            .then((data) => setAboutLinks(data))
            .catch((err) => console.error("Error fetching About section:", err));
    }, []);

    // Handle adding a new link
    const handleAddLink = async () => {
        if (!newLabel || !newRoute) {
            alert("Both fields are required.");
            return;
        }

        const newLink = { label: newLabel, route: newRoute };

        try {
            const response = await fetch("http://localhost:8000/api/footer/footerAbout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newLink),
            });

            if (response.ok) {
                setAboutLinks([...aboutLinks, newLink]);
                setNewLabel("");
                setNewRoute("");
            } else {
                console.error("Failed to add link");
            }
        } catch (error) {
            console.error("Error adding link:", error);
        }
    };

    // Handle editing a link
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedLabel(aboutLinks[index].label);
        setEditedRoute(aboutLinks[index].route);
    };

    // Handle updating a link
    const handleUpdateLink = async (index) => {
        if (!editedLabel || !editedRoute) {
            alert("Both fields are required.");
            return;
        }

        const updatedLinks = [...aboutLinks];
        updatedLinks[index] = { ...updatedLinks[index], label: editedLabel, route: editedRoute };

        try {
            const response = await fetch(`http://localhost:8000/api/footer/footerAbout/${aboutLinks[index]._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedLinks[index]),
            });

            if (response.ok) {
                setAboutLinks(updatedLinks);
                setEditIndex(null);
            } else {
                console.error("Failed to update link");
            }
        } catch (error) {
            console.error("Error updating link:", error);
        }
    };

    // Handle deleting a link
    const handleDeleteLink = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this link?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8000/api/footer/footerAbout/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setAboutLinks(aboutLinks.filter(link => link._id !== id));
            } else {
                console.error("Failed to delete link");
            }
        } catch (error) {
            console.error("Error deleting link:", error);
        }
    };


    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full p-6 p-full">
                <h3 className="text-lg font-bold mb-4">Manage About Section</h3>

                {/* Form to add new links */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h4 className="text-md font-semibold mb-2">Add New Link</h4>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter Label"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            className="border rounded p-2 w-1/3"
                        />
                        <input
                            type="text"
                            placeholder="Enter Route (e.g., /about-us)"
                            value={newRoute}
                            onChange={(e) => setNewRoute(e.target.value)}
                            className="border rounded p-2 w-1/3"
                        />
                        <button
                            onClick={handleAddLink}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Display existing links */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="text-md font-semibold mb-2">Current Links</h4>
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">Label</th>
                                <th className="border p-2 text-left">Route</th>
                                <th className="border p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aboutLinks.map((item, index) => (
                                <tr key={index} className="border">
                                    {editIndex === index ? (
                                        <>
                                            <td className="border p-2">
                                                <input
                                                    type="text"
                                                    value={editedLabel}
                                                    onChange={(e) => setEditedLabel(e.target.value)}
                                                    className="border rounded p-1 w-full"
                                                />
                                            </td>
                                            <td className="border p-2">
                                                <input
                                                    type="text"
                                                    value={editedRoute}
                                                    onChange={(e) => setEditedRoute(e.target.value)}
                                                    className="border rounded p-1 w-full"
                                                />
                                            </td>
                                            <td className="border p-2 text-center">
                                                <button
                                                    onClick={() => handleUpdateLink(index)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditIndex(null)}
                                                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="border p-2">{item.label}</td>
                                            <td className="border p-2">{item.route}</td>
                                            <td className="border p-2 text-center">
                                                <button
                                                    onClick={() => handleEdit(index)}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteLink(item._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default AboutWidgetPage;
