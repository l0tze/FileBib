import { FileBibEntry } from './file-bib-entry';
import { TempFile } from './temp-file';

export class FileBib<E extends FileBibEntry = FileBibEntry, T extends TempFile = TempFile> {
    #upload;
    #download;
    constructor(
        upload: (file: Buffer | ReadableStream) => Promise<string>,
        download: (path: string, content: 'buffer' | 'stream') => Promise<Buffer | ReadableStream>
    ) {
        this.#upload = upload;
        this.#download = download;
    }
    /**
     * save file in disk(FoalDisk) return file db entry
     * @param file
     * @param name
     * @returns FileBibEntry DB Entry
     */
    async upload(file: Buffer | ReadableStream, name?: string): Promise<E> {
        const path = await this.#upload(file);

        return new FileBibEntry(path, name) as E;
    }

    /**
     * download file from disk as buffer or stream (default = stream)
     * @param file
     * @param content
     * @returns buffer | stream
     */
    async download(file: E | T, content: 'buffer' | 'stream' = 'stream'): Promise<Buffer | ReadableStream> {
        if (file instanceof TempFile) {
            if (!file.view()) {
                throw new Error('TempFile is not valid anymore');
            }
            return this.#download(file.bibEntry.path, content);
        }
        return this.#download(file.path, content);
    }

    /**
     * create a temp file url
     * @param file
     * @param options
     * @returns TempFile
     * @example
     * const tempFile = await fileBib.createTempFile(file, { validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), remainingViews: 5 });
     */
    createTempFile(file: E, options?: { validUntil?: Date; remainingViews?: number }): T {
        return new TempFile(file, options) as T;
    }
}
