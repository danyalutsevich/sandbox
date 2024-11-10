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
exports.PdfmakerService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const PdfPrinter = __importStar(require("pdfmake"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const index_1 = require("../../plugins/config/dist/index");
let PdfmakerService = exports.PdfmakerService = class PdfmakerService {
    configService;
    public_path;
    _dirname;
    _basename = '/invoices/pdf/';
    fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        }
    };
    _fileName = `document-${(0, uuid_1.v4)()}`;
    setFilename(filename) {
        this._fileName = filename;
        return this;
    }
    get filename() {
        return this._fileName;
    }
    constructor(configService) {
        this.configService = configService;
        this.public_path =
            this.configService.assetOptions.assetPublicPath || __dirname;
        this._dirname = path.join(this.public_path, this._basename);
    }
    /*
     * Generate Invoice/Estimate Pdf
     */
    async generatePdf(docDefinition) {
        try {
            const printer = new PdfPrinter(this.fonts);
            const pdfDefinition = {
                watermark: docDefinition['watermark'],
                content: docDefinition['content'],
                defaultStyle: {
                    font: 'Helvetica'
                }
            };
            if (!fs.existsSync(this._dirname)) {
                fs.mkdirSync(this._dirname, { recursive: true });
            }
            let filename = `${this.filename}.pdf`;
            const filePath = path.join(this._dirname, filename);
            return await new Promise((resolve, reject) => {
                const pdfDoc = printer.createPdfKitDocument(pdfDefinition, {});
                pdfDoc.pipe(fs.createWriteStream(filePath));
                const chunks = [];
                pdfDoc.on('readable', () => {
                    let chunk;
                    while ((chunk = pdfDoc.read()) !== null) {
                        chunks.push(chunk);
                    }
                });
                pdfDoc.on('end', async () => {
                    Buffer.concat(chunks);
                    if (!Buffer?.length)
                        return reject(new Error('PDF generation failed'));
                    try {
                        //convert pdf to Buffer
                        const pdf = await new Promise((resolve, reject) => {
                            try {
                                fs.readFile(filePath, {}, (err, data) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        //unlink after read pdf into Buffer form
                                        if (fs.existsSync(filePath)) {
                                            fs.unlinkSync(filePath);
                                        }
                                        resolve(data);
                                    }
                                });
                            }
                            catch (err) {
                                reject(err);
                            }
                        });
                        resolve(pdf);
                    }
                    catch (err) {
                        reject(err);
                    }
                });
                pdfDoc.end();
            });
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.PdfmakerService = PdfmakerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [index_1.ConfigService])
], PdfmakerService);
//# sourceMappingURL=pdfmaker.service.js.map