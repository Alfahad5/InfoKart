import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
    const [widgetDropdown, setWidgetDropdown] = useState(false);

    return (
        <aside className="w-64 bg-blue-500 text-white sticky left-0 bottom-0 p-4">
            <nav>
                <ul>
                    <li className="mb-4">
                        <Link to="/AdminDashboard" className="block p-2 hover:bg-blue-700 rounded">
                            📊 Dashboard
                        </Link>
                    </li>
                    <li>
                        <button
                            className="block p-2 w-full text-left hover:bg-blue-700 rounded"
                            onClick={() => setWidgetDropdown(!widgetDropdown)}
                        >
                            ⚙️ Widget Settings{/*  ▼ */}
                        </button>
                        {widgetDropdown && (
                            <ul className="ml-4 mt-2 space-y-2">
                                <li>
                                    <Link to="/widgets/HeaderWidget" className="block p-2 hover:bg-blue-600 rounded">
                                        🏠 Header
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to="/widget/footer" className="block p-2 hover:bg-blue-600 rounded">
                                        🔽 Footer
                                    </Link>
                                </li> */}
                                <li>
                                    <Link to="../../widgets/AboutWidget" className="block p-2 hover:bg-blue-600 rounded">
                                        ℹ️ About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="../../widgets/HelpPolicyWidget" className="block p-2 hover:bg-blue-600 rounded">
                                        🆘 Help & 📜 Policy
                                    </Link>
                                </li>

                                <li>
                                    <Link to="../../widgets/SocialWidget" className="block p-2 hover:bg-blue-600 rounded">
                                        📢 Socials
                                    </Link>
                                </li>
                                <li>
                                    <Link to="../../widgets/MailUs" className="block p-2 hover:bg-blue-600 rounded">
                                        📧 Mail Us
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
