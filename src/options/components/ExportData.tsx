import React, { useRef, useState } from "react";
import { getAllData, importAllData } from "../../shared/storage";
import { EXPORT_FILENAME } from "../../shared/constants";
import { StorageData } from "../../shared/types";

const ExportData: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState<string | null>(null);

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
        setStatus("Export successful!");
        setTimeout(() => setStatus(null), 3000);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const content = e.target?.result as string;
                const data = JSON.parse(content) as StorageData;

                // Basic validation
                if (!data.sessions && !data.notes && !data.blockedSites) {
                    throw new Error("Invalid format");
                }

                await importAllData(data);
                setStatus("Import successful! Please reload extension components to refresh.");
                setTimeout(() => setStatus(null), 5000);
            } catch (err) {
                console.error("Import failed:", err);
                setStatus("Import failed: Invalid file format.");
                setTimeout(() => setStatus(null), 5000);
            }
        };
        reader.readAsText(file);
        // Reset input
        event.target.value = "";
    };

    return (
        <div className="export-section mt-6">
            <h3>Data Portability</h3>
            <p className="text-secondary">Export your data or restore from a previously saved JSON file.</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                <button
                    className="btn btn-primary"
                    onClick={handleExport}
                    data-testid="export-data-btn"
                >
                    Export All Data
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={handleImportClick}
                    data-testid="import-data-btn"
                >
                    Import Data
                </button>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".json"
                onChange={handleFileChange}
            />

            {status && (
                <p className="mt-2" style={{ color: status.includes("failed") ? "var(--danger-color)" : "var(--primary-color)", fontSize: "0.875rem" }}>
                    {status}
                </p>
            )}
        </div>
    );
};

export default ExportData;
