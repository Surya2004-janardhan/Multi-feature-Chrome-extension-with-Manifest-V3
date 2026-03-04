import React, { useState, useEffect } from "react";
import { getNotes } from "../../shared/storage";

const NotesWidget: React.FC = () => {
    const [notes, setNotes] = useState("");

    useEffect(() => {
        const loadNotes = async () => {
            const savedNotes = await getNotes();
            setNotes(savedNotes);
        };
        loadNotes();

        const listener = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
            if (areaName === "local" && changes.notes) {
                setNotes(changes.notes.newValue || "");
            }
        };

        chrome.storage.onChanged.addListener(listener);
        return () => chrome.storage.onChanged.removeListener(listener);
    }, []);

    return (
        <div className="widget card" data-testid="widget-notes">
            <h3>Quick Notes</h3>
            <div className="widget-content notes-preview">
                {notes ? (
                    <pre style={{ whiteSpace: "pre-wrap" }}>{notes}</pre>
                ) : (
                    <p className="text-secondary italic">No notes found.</p>
                )}
            </div>
        </div>
    );
};

export default NotesWidget;
