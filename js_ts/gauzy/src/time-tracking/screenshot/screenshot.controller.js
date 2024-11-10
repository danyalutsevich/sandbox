"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenshotController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const path = __importStar(require("path"));
const moment_1 = __importDefault(require("moment"));
const fs = __importStar(require("fs"));
const uuid_1 = require("uuid");
const Jimp = __importStar(require("jimp"));
const contracts_1 = require("../../../plugins/contracts");
const screenshot_entity_1 = require("./screenshot.entity");
const screenshot_service_1 = require("./screenshot.service");
const context_1 = require("./../../core/context");
const file_storage_1 = require("../../core/file-storage");
const utils_1 = require("../../core/utils");
const interceptors_1 = require("./../../core/interceptors");
const decorators_1 = require("./../../shared/decorators");
const guards_1 = require("./../../shared/guards");
const pipes_1 = require("./../../shared/pipes");
const dto_1 = require("./../../shared/dto");
let ScreenshotController = exports.ScreenshotController = class ScreenshotController {
    _screenshotService;
    constructor(_screenshotService) {
        this._screenshotService = _screenshotService;
    }
    /**
     *
     * @param entity
     * @param file
     * @returns
     */
    async create(input, file) {
        if (!file.key) {
            console.warn('Screenshot file key is empty');
            return;
        }
        console.log('Screenshot Http Request Input: ', { input });
        // Extract user information from the request context
        const user = context_1.RequestContext.currentUser();
        try {
            // Extract necessary properties from the request body
            const { organizationId } = input;
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            // Initialize file storage provider and process thumbnail
            const provider = new file_storage_1.FileStorage().getProvider();
            // Retrieve file content from the file storage provider
            const fileContent = await provider.getFile(file.key);
            // Create temporary files for input and output of thumbnail processing
            const inputFile = await (0, utils_1.tempFile)('screenshot-thumb');
            const outputFile = await (0, utils_1.tempFile)('screenshot-thumb');
            // Write the file content to the input temporary file
            await fs.promises.writeFile(inputFile, fileContent);
            // Resize the image using Jimp library
            const image = await Jimp.read(inputFile);
            // we are using Jimp.AUTO for height instead of hardcode (e.g. 150px)
            image.resize(250, Jimp.AUTO);
            // Write the resized image to the output temporary file
            await image.writeAsync(outputFile);
            // Read the resized image data from the output temporary file
            const data = await fs.promises.readFile(outputFile);
            try {
                // Remove the temporary input and output files
                await fs.promises.unlink(inputFile);
                await fs.promises.unlink(outputFile);
            }
            catch (error) {
                console.error('Error while unlinking temp files:', error);
            }
            // Define thumbnail file name and directory
            const thumbName = `thumb-${file.filename}`;
            const thumbDir = path.dirname(file.key);
            // Replace double backslashes with single forward slashes
            const fullPath = path.join(thumbDir, thumbName).replace(/\\/g, '/');
            // Upload the thumbnail data to the file storage provider
            const thumb = await provider.putFile(data, fullPath);
            console.log(`Screenshot thumb created for employee (${user.name})`, thumb);
            // Populate entity properties for the screenshot
            const entity = new screenshot_entity_1.Screenshot({
                organizationId: organizationId,
                tenantId: tenantId,
                userId: context_1.RequestContext.currentUserId(),
                file: file.key,
                thumb: thumb.key,
                storageProvider: provider.name.toUpperCase(),
                timeSlotId: (0, class_validator_1.isUUID)(input.timeSlotId) ? input.timeSlotId : null,
                recordedAt: input.recordedAt ? input.recordedAt : new Date()
            });
            console.log(`Screenshot entity for employee (${user.name})`, { entity });
            // Create the screenshot entity in the database
            const screenshot = await this._screenshotService.create(entity);
            console.log(`Screenshot created for employee (${user.name})`, screenshot);
            // Analyze image using Gauzy AI service
            this._screenshotService.analyzeScreenshot(screenshot, data, file, async (result) => {
                try {
                    if (result) {
                        const [analysis] = result;
                        console.log(`Screenshot analyze response: %s`, analysis);
                        const isWorkRelated = analysis.work;
                        const description = analysis.description || '';
                        const apps = analysis.apps || [];
                        await this._screenshotService.update(screenshot.id, {
                            isWorkRelated,
                            description,
                            apps
                        });
                    }
                }
                catch (error) {
                    console.error(`Error while analyzing screenshot for employee (${user.name})`, error);
                }
            });
            return await this._screenshotService.findOneByIdString(screenshot.id);
        }
        catch (error) {
            console.error(`Error while creating screenshot for employee (${user.name})`, error);
        }
    }
    /**
     *
     * @param screenshotId
     * @param options
     * @returns
     */
    async delete(screenshotId, options) {
        return await this._screenshotService.deleteScreenshot(screenshotId, options);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create start/stop screenshot.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The screenshot has been successfully captured.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(
    // Use LazyFileInterceptor for handling file uploads with custom storage settings
    (0, interceptors_1.LazyFileInterceptor)('file', {
        // Define storage settings for uploaded files
        storage: () => {
            // Define the base directory for storing screenshots
            const baseDirectory = path.join('screenshots', (0, moment_1.default)().format('YYYY/MM/DD'));
            // Generate unique sub directories based on the current tenant and employee IDs
            const subDirectory = path.join(context_1.RequestContext.currentTenantId() || (0, uuid_1.v4)(), context_1.RequestContext.currentEmployeeId() || (0, uuid_1.v4)());
            return new file_storage_1.FileStorage().storage({
                dest: () => path.join(baseDirectory, subDirectory),
                prefix: 'screenshots'
            });
        }
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, file_storage_1.UploadedFileStorage)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [screenshot_entity_1.Screenshot, Object]),
    __metadata("design:returntype", Promise)
], ScreenshotController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete record'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The record has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.DELETE_SCREENSHOTS),
    (0, common_1.Delete)(':id'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeleteQueryDTO]),
    __metadata("design:returntype", Promise)
], ScreenshotController.prototype, "delete", null);
exports.ScreenshotController = ScreenshotController = __decorate([
    (0, swagger_1.ApiTags)('Screenshot'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.TIME_TRACKER),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [screenshot_service_1.ScreenshotService])
], ScreenshotController);
//# sourceMappingURL=screenshot.controller.js.map