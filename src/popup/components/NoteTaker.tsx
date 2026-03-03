import React, { useState, useEffect } from "react";
import { getNotes, saveNotes } from "../../shared/storage";

const NoteTaker: React.FC = () => {
    const [notes, setNotes] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const loadNotes = async () => {
            const savedNotes = await getNotes();
            setNotes(savedNotes);
        };
        loadNotes();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        await saveNotes(notes);
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="note-taker">
            <textarea
                className="input notes-textarea"
                data-testid="notes-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Type your notes here..."
                rows={10}
            />
            <button
                className="btn btn-primary mt-2"
                onClick={handleSave}
                data-testid="save-notes-btn"
                disabled={isSaving}
            >
                {isSaving ? "Saving..." : "Save Notes"}
            </button>
        </div>
    );
};

export default NoteTaker;
