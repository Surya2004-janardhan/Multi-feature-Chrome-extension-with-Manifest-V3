export interface TabSession {
    name: string;
    urls: string[];
    createdAt: number;
}

export interface StorageData {
    sessions: Record<string, TabSession>;
    notes: string;
    blockedSites: string[];
}
