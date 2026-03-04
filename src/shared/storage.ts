import { TabSession, StorageData } from "./types";
import { SESSIONS_KEY, NOTES_KEY, BLOCKED_SITES_KEY } from "./constants";

/**
 * Tab Sessions (Local Storage)
 */
export async function getSessions(): Promise<Record<string, TabSession>> {
    const data = await chrome.storage.local.get(SESSIONS_KEY);
    return (data[SESSIONS_KEY] as Record<string, TabSession>) || ({} as Record<string, TabSession>);
}

export async function saveSessions(sessions: Record<string, TabSession>): Promise<void> {
    await chrome.storage.local.set({ [SESSIONS_KEY]: sessions });
}

/**
 * Notes (Local Storage)
 */
export async function getNotes(): Promise<string> {
    const data = await chrome.storage.local.get(NOTES_KEY);
    return (data[NOTES_KEY] as string) || "";
}

export async function saveNotes(notes: string): Promise<void> {
    await chrome.storage.local.set({ [NOTES_KEY]: notes });
}

/**
 * Blocked Sites (Sync Storage)
 */
export async function getBlockedSites(): Promise<string[]> {
    const data = await chrome.storage.sync.get(BLOCKED_SITES_KEY);
    return (data[BLOCKED_SITES_KEY] as string[]) || ([] as string[]);
}

export async function saveBlockedSites(sites: string[]): Promise<void> {
    await chrome.storage.sync.set({ [BLOCKED_SITES_KEY]: sites });
}

export async function addBlockedSite(hostname: string): Promise<void> {
    const sites = await getBlockedSites();
    if (!sites.includes(hostname)) {
        await saveBlockedSites([...sites, hostname]);
    }
}

export async function removeBlockedSite(hostname: string): Promise<void> {
    const sites = await getBlockedSites();
    await saveBlockedSites(sites.filter((s) => s !== hostname));
}

/**
 * Combined Data (for Export)
 */
export async function getAllData(): Promise<StorageData> {
    const [localData, syncData] = await Promise.all([
        chrome.storage.local.get([SESSIONS_KEY, NOTES_KEY]),
        chrome.storage.sync.get(BLOCKED_SITES_KEY),
    ]);

    return {
        sessions: (localData[SESSIONS_KEY] as Record<string, TabSession>) || ({} as Record<string, TabSession>),
        notes: (localData[NOTES_KEY] as string) || "",
        blockedSites: (syncData[BLOCKED_SITES_KEY] as string[]) || ([] as string[]),
    };
}

export async function importAllData(data: StorageData): Promise<void> {
    const { sessions, notes, blockedSites } = data;
    await Promise.all([
        chrome.storage.local.set({ [SESSIONS_KEY]: sessions || {}, [NOTES_KEY]: notes || "" }),
        chrome.storage.sync.set({ [BLOCKED_SITES_KEY]: blockedSites || [] }),
    ]);
}
