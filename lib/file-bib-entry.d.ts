export interface FileBibEntry {
    path: string;
    uuid: string;
    originalName: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
