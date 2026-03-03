import React, { useState, useEffect } from "react";
import { getSessions, saveSessions } from "../../shared/storage";
import { TabSession } from "../../shared/types";

const TabSessions: React.FC = () => {
    const [sessions, setSessions] = useState<Record<string, TabSession>>({});
    const [newSessionName, setNewSessionName] = useState("");

    useEffect(() => {
        loadSessions();
    }, []);

    const loadSessions = async () => {
        const data = await getSessions();
        setSessions(data);
    };

    const handleSaveSession = async () => {
        if (!newSessionName.trim()) return;

        const tabs = await chrome.tabs.query({ currentWindow: true });
        const urls = tabs.map(tab => tab.url || "").filter(url => url !== "");

        const newSession: TabSession = {
            name: newSessionName,
            urls,
            createdAt: Date.now()
        };

        const updatedSessions = { ...sessions, [newSessionName]: newSession };
        await saveSessions(updatedSessions);
        setSessions(updatedSessions);
        setNewSessionName("");
    };

    const handleRestoreSession = async (name: string) => {
        const session = sessions[name];
        if (session) {
            await chrome.windows.create({ url: session.urls });
        }
    };

    const handleDeleteSession = async (name: string) => {
        const { [name]: _, ...rest } = sessions;
        await saveSessions(rest);
        setSessions(rest);
    };

    return (
        <div className="tab-sessions">
            <div className="input-group">
                <input
                    type="text"
                    className="input"
                    placeholder="Session Name"
                    value={newSessionName}
                    onChange={(e) => setNewSessionName(e.target.value)}
                />
                <button
                    className="btn btn-primary"
                    onClick={handleSaveSession}
                    data-testid="save-session-btn"
                >
                    Save
                </button>
            </div>

            <ul className="sessions-list" data-testid="sessions-list">
                {Object.values(sessions).map((session) => (
                    <li key={session.name} className="session-item">
                        <span className="session-name">
                            {session.name} ({session.urls.length} tabs)
                        </span>
                        <div className="session-actions">
                            <button
                                className="btn btn-sm"
                                onClick={() => handleRestoreSession(session.name)}
                                data-testid={`restore-session-${session.name}`}
                            >
                                Restore
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteSession(session.name)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TabSessions;
