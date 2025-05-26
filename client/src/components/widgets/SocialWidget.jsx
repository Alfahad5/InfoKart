import React, { useState, useEffect } from "react";

const SocialWidget = () => {
    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/footer/footerSocial")
            .then((res) => res.json())
            .then((data) => setSocialLinks(data))
            .catch((err) => console.error("Error fetching Social section:", err));
    }, []);

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <div className="flex flex-col gap-4">
                {socialLinks.map((item, index) => (
                    <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center">
                            <img src={item.image} alt={item.label} className="w-8 h-8 mr-2" />
                            <span className="text-blue-50">{item.label}</span>
                        </div>

                    </a>
                ))}
            </div>
        </div>
    );
};

export default SocialWidget;
