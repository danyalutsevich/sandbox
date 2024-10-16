"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadedFileStorage = void 0;
const common_1 = require("@nestjs/common");
const file_storage_1 = require("./file-storage");
/**
 * Custom decorator to map uploaded files based on the specified storage provider.
 * @param data - The storage provider enum.
 * @returns Promise<UploadedFile>
 */
exports.UploadedFileStorage = (0, common_1.createParamDecorator)(async (data, ctx) => {
    try {
        const request = ctx.switchToHttp().getRequest();
        const provider = new file_storage_1.FileStorage().getProvider(data);
        return await provider.mapUploadedFile(request.file);
    }
    catch (error) {
        // Log the error using a logger instead of console.log
        console.error('Error while mapping uploaded file', error);
        // Throw a more specific exception or create a custom exception class
        throw new common_1.BadRequestException('Error while mapping uploaded file', error);
    }
});
//# sourceMappingURL=uploaded-file-storage.js.map