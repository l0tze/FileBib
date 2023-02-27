import { randomUUID } from 'crypto';
import { Readable } from 'stream';
import { FileBibEntry } from './file-bib-entry';
import { TempFile } from './temp-file';

export class FileBib {
    #upload;
    #download;
    constructor(
        upload: (file: Buffer | Readable) => Promise<{ path: string }>,
        download: (path: string, content: 'buffer' | 'stream') => Promise<{ file: Buffer | Readable }>
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
    async upload(file: Buffer | Readable, name: string, options: { name: string }): Promise<FileBibEntry> {
        const { path } = await this.#upload(file);

        return {
            path,
            uuid: randomUUID(),
            originalName: name,
            name: options.name,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };
    }

    /**
     * download file from disk as buffer or stream (default = stream)
     * @param file
     * @param content
     * @returns buffer | stream
     */
    async download(
        file: FileBibEntry | TempFile,
        content: 'buffer' | 'stream' = 'stream'
    ): Promise<{ file: Buffer | Readable }> {
        if ('view' in file) {
            if (!file.view()) {
                throw new Error('TempFile is not valid anymore');
            }
            return this.#download(file.path, content);
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
    createTempFile(
        file: FileBibEntry,
        options?: { validUntil?: Date; remainingViews?: number; name?: string }
    ): Omit<TempFile, 'isValid' | 'view'> {
        return {
            url: randomUUID(),
            path: file.path,
            name: options?.name ?? file.name ?? file.originalName,
            validUntil: options?.validUntil ?? new Date(Date.now() + 1000 * 60 * 15),
            remainingViews: options?.remainingViews ?? 1,
        };
    }
}
