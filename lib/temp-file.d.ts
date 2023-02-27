export interface TempFile {
    url: string;
    path: string;
    name: string;
    bibEntryId?: unknown;
    validUntil?: Date;
    remainingViews?: number;
    isValid(): boolean;
    view(): boolean;
}
