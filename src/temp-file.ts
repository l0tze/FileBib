import { randomUUID } from 'crypto';
import { FileBibEntry } from './file-bib-entry';

export class TempFile {
    url: string;
    bibEntry: FileBibEntry;

    validUntil?: Date;
    remainingViews?: number;

    constructor(bibEntry: FileBibEntry, options?: { validUntil?: Date; remainingViews?: number }) {
        this.url = randomUUID();
        this.bibEntry = bibEntry;
        this.validUntil = options?.validUntil;
        this.remainingViews = options?.remainingViews;
    }

    isValid(): boolean {
        if (this.validUntil && this.validUntil < new Date()) {
            return false;
        }
        if (this.remainingViews && this.remainingViews <= 0) {
            return false;
        }
        return true;
    }

    view(): boolean {
        if (this.isValid()) {
            return false;
        }
        if (this.remainingViews) {
            this.remainingViews--;
        }
        return true;
    }
}
