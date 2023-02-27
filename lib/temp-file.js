"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempFile = void 0;
const crypto_1 = require("crypto");
class TempFile {
    constructor(bibEntry, options) {
        this.url = (0, crypto_1.randomUUID)();
        this.bibEntry = bibEntry;
        this.validUntil = options?.validUntil;
        this.remainingViews = options?.remainingViews;
    }
    isValid() {
        if (this.validUntil && this.validUntil < new Date()) {
            return false;
        }
        if (this.remainingViews && this.remainingViews <= 0) {
            return false;
        }
        return true;
    }
    view() {
        if (this.isValid()) {
            return false;
        }
        if (this.remainingViews) {
            this.remainingViews--;
        }
        return true;
    }
}
exports.TempFile = TempFile;
//# sourceMappingURL=temp-file.js.map