import React from "react";

interface NavigationProps {
    activeTab: "sessions" | "notes";
    onTabChange: (tab: "sessions" | "notes") => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
    const openOptions = () => {
        chrome.runtime.openOptionsPage();
    };

    return (
        <nav className="navigation">
            <div className="tabs">
                <button
                    className={`tab-btn ${activeTab === "sessions" ? "active" : ""}`}
                    onClick={() => onTabChange("sessions")}
                >
                    Sessions
                </button>
                <button
                    className={`tab-btn ${activeTab === "notes" ? "active" : ""}`}
                    onClick={() => onTabChange("notes")}
                >
                    Notes
                </button>
            </div>
            <button
                className="btn btn-sm"
                onClick={openOptions}
                data-testid="open-options-btn"
            >
                Options
            </button>
        </nav>
    );
};

export default Navigation;
