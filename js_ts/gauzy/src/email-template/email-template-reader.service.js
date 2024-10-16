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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateReaderService = void 0;
const common_1 = require("@nestjs/common");
const path = __importStar(require("path"));
const utils_1 = require("./utils");
let EmailTemplateReaderService = exports.EmailTemplateReaderService = class EmailTemplateReaderService {
    /*
    * Getter & Setter for dynamic folder path
    */
    _folderPath;
    get folderPath() {
        return this._folderPath;
    }
    set folderPath(value) {
        this._folderPath = value;
    }
    constructor() { }
    onModuleInit() {
        this.folderPath = path.join(path.join(__dirname), '../', ...utils_1.EmailTemplateUtils.globalPath);
    }
    /**
     * Read email template from core folder using name
     *
     * @param name
     */
    readEmailTemplate(folder) {
        const files = [];
        if (utils_1.EmailTemplateUtils.fileExists(this.folderPath)) {
            const folderPath = path.join(this.folderPath, folder);
            // Read directory for missing templates
            utils_1.EmailTemplateUtils.readdirSync(folderPath, files);
        }
        // Convert files to email templates
        return utils_1.EmailTemplateUtils.filesToTemplates(files);
    }
};
exports.EmailTemplateReaderService = EmailTemplateReaderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailTemplateReaderService);
//# sourceMappingURL=email-template-reader.service.js.map