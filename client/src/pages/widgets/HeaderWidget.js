import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";

const HeaderWidget = () => {
    const [logoUrl, setLogoUrl] = useState("");
    const [spanText, setSpanText] = useState("");
    const [buttons, setButtons] = useState([]);
    const [newButtonLabel, setNewButtonLabel] = useState("");
    const [newButtonLink, setNewButtonLink] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editedLabel, setEditedLabel] = useState("");
    const [editedLink, setEditedLink] = useState("");

    // Fetch widget data on component mount
    useEffect(() => {
        axios.get("http://localhost:8000/api/headerWidget").then((res) => {
            setLogoUrl(res.data.logoUrl);
            setSpanText(res.data.spanText);
            setButtons(res.data.buttons || []);
        }).catch(err => console.error("Error fetching header widget:", err));
    }, []);

    // Save updated widget to backend
    const handleSave = async () => {
        const updatedWidget = { logoUrl, spanText, buttons };

        try {
            await axios.put("http://localhost:8000/api/headerWidget", updatedWidget);
            localStorage.setItem("widgetLogoUrl", logoUrl);
            localStorage.setItem("widgetHeaderTitle", spanText);
            localStorage.setItem("widgetButtons", JSON.stringify(buttons));

            alert("Header widget updated!");
            window.dispatchEvent(new Event("widgetConfigChange"));
        } catch (error) {
            console.error("Error updating widget:", error);
        }
    };

    // Add a new button
    const handleAddButton = () => {
        if (!newButtonLabel || !newButtonLink) {
            alert("Both Label and Route are required.");
            return;
        }

        const newButton = { label: newButtonLabel, route: newButtonLink };
        setButtons([...buttons, newButton]);
        setNewButtonLabel("");
        setNewButtonLink("");
    };

    // Edit button
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedLabel(buttons[index].label);
        setEditedLink(buttons[index].route);
    };

    // Update button details
    const handleUpdateButton = (index) => {
        if (!editedLabel || !editedLink) {
            alert("Both fields are required.");
            return;
        }

        const updatedButtons = [...buttons];
        updatedButtons[index] = { label: editedLabel, route: editedLink };
        setButtons(updatedButtons);
        setEditIndex(null);
    };

    // Remove button
    const handleRemoveButton = (index) => {
        setButtons(buttons.filter((_, i) => i !== index));
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-6 p-half bg-white shadow rounded w-full">
                <h2 className="text-lg font-semibold mb-4">Edit Header Widget</h2>

                {/* Logo Input */}
                <label className="block mb-2">Logo URL:</label>
                <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                {/* Header Title Input */}
                <label className="block mt-4 mb-2">Header Title:</label>
                <input
                    type="text"
                    value={spanText}
                    onChange={(e) => setSpanText(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                {/* Add New Button Section */}
                <div className="mt-6 bg-gray-100 p-4 rounded">
                    <h3 className="font-semibold">Add New Button</h3>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            placeholder="Enter Label"
                            value={newButtonLabel}
                            onChange={(e) => setNewButtonLabel(e.target.value)}
                            className="border p-2 w-1/2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Enter Route"
                            value={newButtonLink}
                            onChange={(e) => setNewButtonLink(e.target.value)}
                            className="border p-2 w-1/2 rounded"
                        />
                        <button
                            onClick={handleAddButton}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Display Existing Buttons */}
                <div className="mt-6">
                    <h3 className="font-semibold">Current Buttons</h3>
                    <table className="w-full border-collapse border border-gray-200 mt-2">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Label</th>
                                <th className="border p-2">Route</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buttons.map((button, index) => (
                                <tr key={index} className="border">
                                    {editIndex === index ? (
                                        <>
                                            <td className="border p-2">
                                                <input
                                                    type="text"
                                                    value={editedLabel}
                                                    onChange={(e) => setEditedLabel(e.target.value)}
                                                    className="border p-1 w-full rounded"
                                                />
                                            </td>
                                            <td className="border p-2">
                                                <input
                                                    type="text"
                                                    value={editedLink}
                                                    onChange={(e) => setEditedLink(e.target.value)}
                                                    className="border p-1 w-full rounded"
                                                />
                                            </td>
                                            <td className="border p-2 text-center">
                                                <button
                                                    onClick={() => handleUpdateButton(index)}
                                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                                >
                                                    Save
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="border p-2">{button.label}</td>
                                            <td className="border p-2">{button.route}</td>
                                            <td className="border p-2 text-center">
                                                <button
                                                    onClick={() => handleEdit(index)}
                                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveButton(index)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
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

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded mt-4"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default HeaderWidget;
