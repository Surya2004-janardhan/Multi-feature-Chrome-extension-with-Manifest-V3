import React, { useState, useEffect } from "react";
import { getSessions } from "../../shared/storage";
import { TabSession } from "../../shared/types";

const SessionsWidget: React.FC = () => {
    const [sessions, setSessions] = useState<Record<string, TabSession>>({});

    useEffect(() => {
        loadSessions();

        const listener = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
            if (areaName === "local" && changes.sessions) {
                setSessions(changes.sessions.newValue || {});
            }
        };

        chrome.storage.onChanged.addListener(listener);
        return () => chrome.storage.onChanged.removeListener(listener);
    }, []);

    const loadSessions = async () => {
        const data = await getSessions();
        setSessions(data);
    };

    const handleRestore = async (urls: string[]) => {
        await chrome.windows.create({ url: urls });
    };

    return (
        <div className="widget card" data-testid="widget-sessions">
            <h3>Recent Sessions</h3>
            <div className="widget-content">
                {Object.values(sessions).length === 0 ? (
                    <p className="text-secondary italic">No saved sessions.</p>
                ) : (
                    <ul className="widget-list">
                        {Object.values(sessions).slice(0, 5).map((session) => (
                            <li key={session.name} className="widget-list-item">
                                <span>{session.name}</span>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleRestore(session.urls)}
                                >
                                    Restore
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SessionsWidget;
