import { getBlockedSites, getNotes, saveNotes, saveSessions } from "../shared/storage";
import { TabSession } from "../shared/types";

// 1. Website Blocker Logic
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        const hostname = new URL(changeInfo.url).hostname.replace(/^www\./, "");
        const blockedSites = await getBlockedSites();

        if (blockedSites.includes(hostname)) {
            // Redirect to blocked.html page
            chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
        }
    }
});

// 2. Context Menu Implementation
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "add-to-notes",
        title: "Add page to notes",
        contexts: ["page"]
    });
    console.log("Productivity Suite installed and Context Menu created.");
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "add-to-notes" && tab) {
        const title = tab.title || "No Title";
        const url = tab.url || "";
        const existingNotes = await getNotes();
        const newNote = `\n---\n**${title}**\n${url}\n`;
        await saveNotes(existingNotes + newNote);
    }
});

// 3. Keyboard Shortcuts Implementation
chrome.commands.onCommand.addListener(async (command) => {
    if (command === "save-session") {
        const tabs = await chrome.tabs.query({ currentWindow: true });
        const urls = tabs.map(tab => tab.url || "").filter(url => url !== "");

        const sessionName = `Auto-saved session ${new Date().toLocaleTimeString()}`;
        const newSession: TabSession = {
            name: sessionName,
            urls,
            createdAt: Date.now()
        };

        const data = await chrome.storage.local.get("sessions");
        const sessions = (data.sessions as Record<string, TabSession>) || {};
        sessions[sessionName] = newSession;
        await saveSessions(sessions);

        console.log(`Session auto-saved: ${sessionName}`);
    }
});
