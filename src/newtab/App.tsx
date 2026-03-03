import React, { useState, useEffect } from "react";
import NotesWidget from "./components/NotesWidget";
import SessionsWidget from "./components/SessionsWidget";
import "./newtab.css";

const App: React.FC = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="container newtab-container">
            <header className="newtab-header">
                <h1 className="clock">{time}</h1>
                <p className="greeting">Stay Productive.</p>
            </header>

            <main className="dashboard">
                <NotesWidget />
                <SessionsWidget />
            </main>
        </div>
    );
};

export default App;
