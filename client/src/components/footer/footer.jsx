import React from "react";
import FooterAboutWidget from "../widgets/AboutWidget";
import FooterHelpPolicyWidget from "../widgets/HelpPolicyWidget";
import FooterSocialWidget from "../widgets/SocialWidget";
import FooterMailUsWidget from "../widgets/MailUsWidget";


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 border-t border-gray-700">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Widget */}
                    <FooterAboutWidget />

                    {/* Help & Policy Widget */}
                    <FooterHelpPolicyWidget />

                    {/* Social Widget */}
                    <FooterSocialWidget />

                    {/* Mail Us Widget */}
                    <FooterMailUsWidget />
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
                    © 2025 Infokart.com. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
