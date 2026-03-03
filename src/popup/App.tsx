import React, { useState } from "react";
import Navigation from "./components/Navigation";
import TabSessions from "./components/TabSessions";
import NoteTaker from "./components/NoteTaker";
import "./popup.css";

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"sessions" | "notes">("sessions");

    return (
        <div className="container popup-container">
            <header className="header">
                <h1>Productivity Suite</h1>
            </header>

            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="content">
                {activeTab === "sessions" ? <TabSessions /> : <NoteTaker />}
            </main>
        </div>
    );
};

export default App;
