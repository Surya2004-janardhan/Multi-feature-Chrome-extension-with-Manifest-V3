import React from "react";

const App: React.FC = () => {
    return (
        <div style={{ textAlign: "center", marginTop: 100 }}>
            <h1 data-testid="blocked-message">Page Blocked</h1>
            <p>This website has been blocked by Productivity Suite.</p>
        </div>
    );
};

export default App;
