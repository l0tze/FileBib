/// <reference types="node" />
import { FileBibEntry } from './file-bib-entry';
import { TempFile } from './temp-file';
export declare class FileBib<E extends FileBibEntry = FileBibEntry, T extends TempFile = TempFile> {
    #private;
    constructor(upload: (file: Buffer | ReadableStream) => Promise<string>, download: (path: string, content: 'buffer' | 'stream') => Promise<Buffer | ReadableStream>);
    /**
     * save file in disk(FoalDisk) return file db entry
     * @param file
     * @param name
     * @returns FileBibEntry DB Entry
     */
    upload(file: Buffer | ReadableStream, name?: string): Promise<E>;
    /**
     * download file from disk as buffer or stream (default = stream)
     * @param file
     * @param content
     * @returns buffer | stream
     */
    download(file: E | T, content?: 'buffer' | 'stream'): Promise<Buffer | ReadableStream>;
    /**
     * create a temp file url
     * @param file
     * @param options
     * @returns TempFile
     * @example
     * const tempFile = await fileBib.createTempFile(file, { validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), remainingViews: 5 });
     */
    createTempFile(file: E, options?: {
        validUntil?: Date;
        remainingViews?: number;
    }): T;
}
