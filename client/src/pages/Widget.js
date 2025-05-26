import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";

const Widget = () => {
    const [searchPlaceholder, setSearchPlaceholder] = useState("");
    const [footerAbout, setFooterAbout] = useState("");
    const [help, setHelp] = useState("");
    const [social, setSocial] = useState("");
    const [logoUrl, setLogoUrl] = useState("");
    const [policy, setPolicy] = useState("");
    const [mailUs, setMailUs] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8000/api/footer")
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setSearchPlaceholder(data.searchPlaceholder || ""); // Corrected
                    setFooterAbout(data.about || "");
                    setLogoUrl(data.logoUrl || ""); // Corrected
                    setHelp(data.help || "");
                    setPolicy(data.policy || "");
                    setSocial(data.social || "");
                    setMailUs(data.mailUs || "");
                }
            })
            .catch(error => console.error("Error fetching footer data:", error));
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const footerData = {
            about: footerAbout,
            help: help,  // Corrected
            social: social,  // Corrected
            policy: policy,
            mailUs: mailUs
        };


        try {
            const response = await fetch("http://localhost:8000/api/footer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(footerData),
            });

            if (response.ok) {
                // Dispatch event to notify Footer component
                window.dispatchEvent(new Event("footerUpdated"));
                alert("Footer updated successfully!");
            } else {
                alert("Error updating footer");
            }
        } catch (error) {
            console.error("Error updating footer:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="p-4 flex-1">
                <h2 className="text-2xl mb-4">Widget Configuration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Search Placeholder:</label>
                        <input
                            type="text"
                            value={searchPlaceholder}
                            onChange={(e) => setSearchPlaceholder(e.target.value)}
                            className="border p-2 rounded-md w-full"
                            placeholder="Enter search placeholder text"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Header Logo URL:</label>
                        <input
                            type="text"
                            value={logoUrl}
                            onChange={(e) => setLogoUrl(e.target.value)}
                            className="border p-2 rounded-md w-full"
                            placeholder="Enter logo image URL"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Footer About Content:</label>
                        <textarea
                            value={footerAbout}
                            onChange={(e) => setFooterAbout(e.target.value)}
                            className="border p-2 rounded-md w-full"
                            placeholder="Enter footer about content"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Footer Help:</label>
                        <textarea
                            value={help}
                            onChange={(e) => setHelp(e.target.value)}
                            className="border p-2 rounded-md w-full"
                            placeholder="Enter footer Help:"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Footer Policy:</label>
                        <textarea
                            value={policy}
                            onChange={(e) => setPolicy(e.target.value)}
                            className="border p-2 rounded-md w-full"
                            placeholder="Enter policy details"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Footer Socials:</label>
                        <textarea
                            value={social}
                            onChange={(e) => setSocial(e.target.value)}
                            className="border p-2 rounded-md w-full"
                            placeholder="Enter footer Socials: "
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Mail Us:</label>
                        <input
                            type="text"
                            value={mailUs}
                            onChange={(e) => setMailUs(e.target.value)}
                            className="border p-2 rounded-md w-full"
                            placeholder="Enter mail us content"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Widget"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Widget;
