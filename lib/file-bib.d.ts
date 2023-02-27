/// <reference types="node" />
/// <reference types="node" />
import { Readable } from 'stream';
import { FileBibEntry } from './file-bib-entry';
import { TempFile } from './temp-file';
export declare class FileBib {
    #private;
    constructor(upload: (file: Buffer | Readable) => Promise<{
        path: string;
    }>, download: (path: string, content: 'buffer' | 'stream') => Promise<{
        file: Buffer | Readable;
    }>);
    /**
     * save file in disk(FoalDisk) return file db entry
     * @param file
     * @param name
     * @returns FileBibEntry DB Entry
     */
    upload(file: Buffer | Readable, name: string, options: {
        name: string;
    }): Promise<FileBibEntry>;
    /**
     * download file from disk as buffer or stream (default = stream)
     * @param file
     * @param content
     * @returns buffer | stream
     */
    download(file: FileBibEntry | TempFile, content?: 'buffer' | 'stream'): Promise<{
        file: Buffer | Readable;
    }>;
    /**
     * create a temp file url
     * @param file
     * @param options
     * @returns TempFile
     * @example
     * const tempFile = await fileBib.createTempFile(file, { validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), remainingViews: 5 });
     */
    createTempFile(file: FileBibEntry, options?: {
        validUntil?: Date;
        remainingViews?: number;
        name?: string;
    }): Omit<TempFile, 'isValid' | 'view'>;
}
