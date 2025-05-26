import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

const SocialWidgetPage = () => {
    const [socialLinks, setSocialLinks] = useState([]);
    const [newImage, setNewImage] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newLabel, setNewLabel] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editedImage, setEditedImage] = useState("");
    const [editedUrl, setEditedUrl] = useState("");
    const [editedLabel, setEditedLabel] = useState("");

    // Fetch existing social links from backend
    useEffect(() => {
        fetch("http://localhost:8000/api/footer/footerSocial")
            .then((res) => res.json())
            .then((data) => setSocialLinks(data))
            .catch((err) => console.error("Error fetching Social section:", err));
    }, []);

    // Handle adding a new social link
    const handleAddLink = async () => {
        if (!newImage || !newUrl || !newLabel) {
            alert("All fields are required.");
            return;
        }

        const newLink = { image: newImage, url: newUrl, label: newLabel };

        try {
            const response = await fetch("http://localhost:8000/api/footer/footerSocial", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newLink),
            });

            if (response.ok) {
                setSocialLinks([...socialLinks, newLink]);
                setNewImage("");
                setNewUrl("");
                setNewLabel("");
            } else {
                console.error("Failed to add link");
            }
        } catch (error) {
            console.error("Error adding link:", error);
        }
    };

    // Handle editing a social link
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedImage(socialLinks[index].image);
        setEditedUrl(socialLinks[index].url);
        setEditedLabel(socialLinks[index].label);
    };

    // Handle updating a social link
    const handleUpdateLink = async (index) => {
        if (!editedImage || !editedUrl || !editedLabel) {
            alert("All fields are required.");
            return;
        }

        const updatedLinks = [...socialLinks];
        updatedLinks[index] = {
            ...updatedLinks[index],
            image: editedImage,
            url: editedUrl,
            label: editedLabel,
        };

        try {
            const response = await fetch(`http://localhost:8000/api/footer/footerSocial/${socialLinks[index]._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedLinks[index]),
            });

            if (response.ok) {
                setSocialLinks(updatedLinks);
                setEditIndex(null);
            } else {
                console.error("Failed to update link");
            }
        } catch (error) {
            console.error("Error updating link:", error);
        }
    };

    // Handle deleting a social link
    const handleDeleteLink = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this link?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8000/api/footer/footerSocial/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setSocialLinks(socialLinks.filter(link => link._id !== id));
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
            <div className="w-full p-6 p-half">
                <h3 className="text-lg font-bold mb-4">Manage Social Links</h3>

                {/* Form to add new social links */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h4 className="text-md font-semibold mb-2">Add New Social Link</h4>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                            className="border rounded p-2 w-1/4"
                        />
                        <input
                            type="text"
                            placeholder="Redirect URL"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            className="border rounded p-2 w-1/4"
                        />
                        <input
                            type="text"
                            placeholder="Label"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            className="border rounded p-2 w-1/4"
                        />
                        <button
                            onClick={handleAddLink}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Display existing social links */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="text-md font-semibold mb-2">Current Social Links</h4>
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">Image</th>
                                <th className="border p-2 text-left">URL</th>
                                <th className="border p-2 text-left">Label</th>
                                <th className="border p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {socialLinks.map((item, index) => (
                                <tr key={index} className="border">
                                    {editIndex === index ? (
                                        <>
                                            <td className="border p-2">
                                                <input
                                                    type="text"
                                                    value={editedImage}
                                                    onChange={(e) => setEditedImage(e.target.value)}
                                                    className="border rounded p-1 w-full"
                                                />
                                            </td>
                                            <td className="border p-2">
                                                <input
                                                    type="text"
                                                    value={editedUrl}
                                                    onChange={(e) => setEditedUrl(e.target.value)}
                                                    className="border rounded p-1 w-full"
                                                />
                                            </td>
                                            <td className="border p-2">
                                                <input
                                                    type="text"
                                                    value={editedLabel}
                                                    onChange={(e) => setEditedLabel(e.target.value)}
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
                                            <td className="border p-2">
                                                <img src={item.image} alt={item.label} className="w-10 h-10" />
                                            </td>
                                            <td className="border p-2">{item.url}</td>
                                            <td className="border p-2">{item.label}</td>
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

export default SocialWidgetPage;
