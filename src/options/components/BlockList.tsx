import React, { useState, useEffect } from "react";
import { getBlockedSites, addBlockedSite, removeBlockedSite } from "../../shared/storage";

const BlockList: React.FC = () => {
    const [blockedSites, setBlockedSites] = useState<string[]>([]);
    const [newHostname, setNewHostname] = useState("");

    useEffect(() => {
        loadBlockedSites();
    }, []);

    const loadBlockedSites = async () => {
        const sites = await getBlockedSites();
        setBlockedSites(sites);
    };

    const handleAdd = async () => {
        if (!newHostname.trim()) return;

        // Simple validation (removing protocol if present)
        let hostname = newHostname.trim().toLowerCase();
        hostname = hostname.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0];

        await addBlockedSite(hostname);
        await loadBlockedSites();
        setNewHostname("");
    };

    const handleRemove = async (hostname: string) => {
        await removeBlockedSite(hostname);
        await loadBlockedSites();
    };

    return (
        <div className="block-list-section">
            <h3>Website Blocker</h3>
            <div className="input-group mt-2">
                <input
                    type="text"
                    className="input"
                    placeholder="Enter hostname (e.g. facebook.com)"
                    value={newHostname}
                    onChange={(e) => setNewHostname(e.target.value)}
                    data-testid="block-hostname-input"
                />
                <button
                    className="btn btn-primary"
                    onClick={handleAdd}
                    data-testid="add-block-btn"
                >
                    Block
                </button>
            </div>

            <ul className="blocked-sites-list mt-4" data-testid="blocked-sites-list">
                {blockedSites.length === 0 ? (
                    <li className="list-empty">No sites blocked yet.</li>
                ) : (
                    blockedSites.map((site) => (
                        <li key={site} className="blocked-site-item">
                            <span>{site}</span>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleRemove(site)}
                            >
                                Remove
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default BlockList;
