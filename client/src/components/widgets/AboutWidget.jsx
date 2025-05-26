import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AboutWidget = () => {
    const [aboutLinks, setAboutLinks] = useState([]);

    // Fetch existing links from backend
    useEffect(() => {
        fetch("http://localhost:8000/api/footer/footerAbout")
            .then((res) => res.json())
            .then((data) => setAboutLinks(data))
            .catch((err) => console.error("Error fetching About section:", err));
    }, []);

    return (
        <div >
            <h3 className="text-lg font-bold mb-2">About</h3>
            <ul>
                {aboutLinks.map((item, index) => (
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

export default AboutWidget;
