import React, { useState, useEffect } from "react";

const MailUsWidget = () => {
    const [mailEntries, setMailEntries] = useState([]);

    // Fetch existing mail entries from backend
    useEffect(() => {
        fetch("http://localhost:8000/api/footer/footerMailUs")
            .then((res) => res.json())
            .then((data) => setMailEntries(data))
            .catch((err) => console.error("Error fetching Mail Us section:", err));
    }, []);

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Mail Us</h3>
            <ul>
                {mailEntries.map((item, index) => (
                    <li key={index}>
                        {item.label && <span className="font-semibold text-wrap">{item.label}: </span>}
                        <a href={`mailto:${item.email}`} className="text-blue-50 hover:underline">
                            {item.email}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MailUsWidget;
