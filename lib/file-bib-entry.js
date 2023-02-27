"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileBibEntry = void 0;
const crypto_1 = require("crypto");
class FileBibEntry {
    constructor(path, originalName, fileName) {
        this.path = path;
        this.originalName = originalName;
        this.fileName = fileName;
        this.uuid = (0, crypto_1.randomUUID)();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
    }
}
exports.FileBibEntry = FileBibEntry;
//# sourceMappingURL=file-bib-entry.js.map