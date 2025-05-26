import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

const MailUsWidgetPage = () => {
    const [mailUsEntries, setMailUsEntries] = useState([]);
    const [newLabel, setNewLabel] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editedLabel, setEditedLabel] = useState("");
    const [editedEmail, setEditedEmail] = useState("");

    // Fetch existing mail entries from backend
    useEffect(() => {
        fetch("http://localhost:8000/api/footer/footerMailUs")
            .then((res) => res.json())
            .then((data) => setMailUsEntries(data))
            .catch((err) => console.error("Error fetching Mail Us section:", err));
    }, []);

    // Handle adding a new entry
    const handleAddEntry = async () => {
        if (!newEmail) {
            alert("Email is required.");
            return;
        }

        const newEntry = { label: newLabel || null, email: newEmail };

        try {
            const response = await fetch("http://localhost:8000/api/footer/footerMailUs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEntry),
            });

            if (response.ok) {
                const savedEntry = await response.json();
                setMailUsEntries([...mailUsEntries, savedEntry]);
                setNewLabel("");
                setNewEmail("");
            } else {
                console.error("Failed to add entry");
            }
        } catch (error) {
            console.error("Error adding entry:", error);
        }
    };

    // Handle editing an entry
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedLabel(mailUsEntries[index].label || "");
        setEditedEmail(mailUsEntries[index].email);
    };

    // Handle updating an entry
    const handleUpdateEntry = async (index) => {
        if (!editedEmail) {
            alert("Email is required.");
            return;
        }

        const updatedEntries = [...mailUsEntries];
        updatedEntries[index] = { ...updatedEntries[index], label: editedLabel || null, email: editedEmail };

        try {
            const response = await fetch(`http://localhost:8000/api/footer/footerMailUs/${mailUsEntries[index]._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedEntries[index]),
            });

            if (response.ok) {
                setMailUsEntries(updatedEntries);
                setEditIndex(null);
            } else {
                console.error("Failed to update entry");
            }
        } catch (error) {
            console.error("Error updating entry:", error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full p-6 p-full2">
                <h3 className="text-lg font-bold mb-4">Manage Mail Us Section</h3>

                {/* Form to add new entries */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h4 className="text-md font-semibold mb-2">Add New Entry</h4>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter Label (optional)"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            className="border rounded p-2 w-1/3"
                        />
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="border rounded p-2 w-1/3"
                        />
                        <button
                            onClick={handleAddEntry}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Display existing entries */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="text-md font-semibold mb-2">Current Entries</h4>
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">Label</th>
                                <th className="border p-2 text-left">Email</th>
                                <th className="border p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mailUsEntries.map((item, index) => (
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
                                                    type="email"
                                                    value={editedEmail}
                                                    onChange={(e) => setEditedEmail(e.target.value)}
                                                    className="border rounded p-1 w-full"
                                                />
                                            </td>
                                            <td className="border p-2 text-center">
                                                <button
                                                    onClick={() => handleUpdateEntry(index)}
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
                                            <td className="border p-2">{item.label || "N/A"}</td>
                                            <td className="border p-2">{item.email}</td>
                                            <td className="border p-2 text-center">
                                                <button
                                                    onClick={() => handleEdit(index)}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                >
                                                    Edit
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

export default MailUsWidgetPage;
