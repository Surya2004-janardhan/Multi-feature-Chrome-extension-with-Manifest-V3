import React from "react";
import BlockList from "./components/BlockList";
import ExportData from "./components/ExportData";
import "./options.css";

const App: React.FC = () => {
    return (
        <div className="container options-container">
            <header className="header">
                <h1>Productivity Suite — Settings</h1>
            </header>

            <main className="options-content">
                <BlockList />
                <ExportData />
            </main>
        </div>
    );
};

export default App;
