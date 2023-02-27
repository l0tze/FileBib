import { randomUUID } from 'crypto';

export class FileBibEntry {
    id: any;
    path: string;
    uuid?: string; // can be set and shared if file should be publicly available
    originalName?: string;
    fileName?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(path: string, originalName?: string, fileName?: string) {
        this.path = path;
        this.originalName = originalName;
        this.fileName = fileName;
        this.uuid = randomUUID();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
    }
}
