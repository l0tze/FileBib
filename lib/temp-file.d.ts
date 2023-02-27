import { FileBibEntry } from './file-bib-entry';
export declare class TempFile {
    url: string;
    bibEntry: FileBibEntry;
    validUntil?: Date;
    remainingViews?: number;
    constructor(bibEntry: FileBibEntry, options?: {
        validUntil?: Date;
        remainingViews?: number;
    });
    isValid(): boolean;
    view(): boolean;
}
