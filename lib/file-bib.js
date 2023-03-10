"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FileBib_upload, _FileBib_download;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileBib = void 0;
const crypto_1 = require("crypto");
class FileBib {
    constructor(upload, download) {
        _FileBib_upload.set(this, void 0);
        _FileBib_download.set(this, void 0);
        __classPrivateFieldSet(this, _FileBib_upload, upload, "f");
        __classPrivateFieldSet(this, _FileBib_download, download, "f");
    }
    /**
     * save file in disk(FoalDisk) return file db entry
     * @param file
     * @param name
     * @returns FileBibEntry DB Entry
     */
    async upload(file, name, options) {
        const { path } = await __classPrivateFieldGet(this, _FileBib_upload, "f").call(this, file);
        return {
            path,
            uuid: (0, crypto_1.randomUUID)(),
            originalName: name,
            name: options?.name,
        };
    }
    /**
     * download file from disk as buffer or stream (default = stream)
     * @param file
     * @param content
     * @returns buffer | stream
     */
    async download(file, content = 'stream') {
        if ('view' in file) {
            if (!file.view()) {
                throw new Error('TempFile is not valid anymore');
            }
            return __classPrivateFieldGet(this, _FileBib_download, "f").call(this, file.path, content);
        }
        return __classPrivateFieldGet(this, _FileBib_download, "f").call(this, file.path, content);
    }
    /**
     * create a temp file url
     * @param file
     * @param options
     * @returns TempFile
     * @example
     * const tempFile = await fileBib.createTempFile(file, { validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), remainingViews: 5 });
     */
    createTempFile(file, options) {
        return {
            url: (0, crypto_1.randomUUID)(),
            path: file.path,
            name: options?.name ?? file.name ?? file.originalName,
            validUntil: options?.validUntil ?? new Date(Date.now() + 1000 * 60 * 15),
            remainingViews: options?.remainingViews ?? 1,
        };
    }
}
exports.FileBib = FileBib;
_FileBib_upload = new WeakMap(), _FileBib_download = new WeakMap();
//# sourceMappingURL=file-bib.js.map