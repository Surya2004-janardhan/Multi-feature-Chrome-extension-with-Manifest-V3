import React from "react";
import "../../src/styles/global.css";

const App: React.FC = () => {
    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="container" style={{ textAlign: "center", marginTop: "100px" }}>
            <h1 data-testid="blocked-message" style={{ color: "var(--danger-color)", fontSize: "3rem" }}>
                Page Blocked
            </h1>
            <p style={{ marginTop: "1rem", fontSize: "1.2rem", color: "#64748b" }}>
                This website is currently on your blocklist. Focus on your work!
            </p>
            <button
                className="btn btn-primary"
                style={{ marginTop: "2rem" }}
                onClick={goBack}
            >
                Go Back
            </button>
        </div>
    );
};

export default App;
