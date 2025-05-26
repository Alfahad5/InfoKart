import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HelpPolicyWidget = () => {
    const [helpLinks, setHelpLinks] = useState([]);

    // Fetch existing links from backend
    useEffect(() => {
        fetch("http://localhost:8000/api/footer/footerHelpPolicy")
            .then((res) => res.json())
            .then((data) => setHelpLinks(data))
            .catch((err) => console.error("Error fetching Help & Policy section:", err));
    }, []);

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Help & Policy</h3>
            <ul>
                {helpLinks.map((item, index) => (
                    <li key={index}>
                        <Link to={item.route} className="text-blue-50 hover:underline">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HelpPolicyWidget;
