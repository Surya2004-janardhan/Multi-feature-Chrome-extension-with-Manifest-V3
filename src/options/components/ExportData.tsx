import React from "react";
import { getAllData } from "../../shared/storage";
import { EXPORT_FILENAME } from "../../shared/constants";

const ExportData: React.FC = () => {
    const handleExport = async () => {
        const data = await getAllData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = EXPORT_FILENAME;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="export-section mt-6">
            <h3>Data Portability</h3>
            <p className="text-secondary">Export all your sessions, notes, and settings as a JSON file.</p>
            <button
                className="btn btn-primary mt-2"
                onClick={handleExport}
                data-testid="export-data-btn"
            >
                Export All Data
            </button>
        </div>
    );
};

export default ExportData;
