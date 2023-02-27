export declare class FileBibEntry {
    id: any;
    path: string;
    uuid?: string;
    originalName?: string;
    fileName?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    constructor(path: string, originalName?: string, fileName?: string);
}
