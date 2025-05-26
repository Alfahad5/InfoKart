import React from "react";
import { navData } from "../constants/data";

const Navbar = () => {
    return (
        <div className="flex mx-full mb-5 justify-between">
            {navData.map((data, index) => (
                <div key={index} className="flex flex-col items-center px-3 py-6 text-sm font-semibold text-center">
                    <img src={data.url} alt={data.text} className="w-12 h-12" />
                    <p>{data.text}</p>
                </div>
            ))}
        </div>
    );
};

export default Navbar;
