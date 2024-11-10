/// <reference types="node" />
import { FindOptionsWhere } from 'typeorm';
import { GauzyAIService, ImageAnalysisResult } from '../../../plugins/plugins/integration-ai/dist/index';
import { IScreenshot, UploadedFile } from '../../../plugins/contracts';
import { TenantAwareCrudService } from './../../core/crud';
import { IntegrationTenantService } from './../../integration-tenant/integration-tenant.service';
import { Screenshot } from './screenshot.entity';
import { TypeOrmScreenshotRepository } from './repository/type-orm-screenshot.repository';
import { MikroOrmScreenshotRepository } from './repository/mikro-orm-screenshot.repository';
export declare class ScreenshotService extends TenantAwareCrudService<Screenshot> {
    private readonly _integrationTenantService;
    private readonly _gauzyAIService;
    constructor(typeOrmScreenshotRepository: TypeOrmScreenshotRepository, mikroOrmScreenshotRepository: MikroOrmScreenshotRepository, _integrationTenantService: IntegrationTenantService, _gauzyAIService: GauzyAIService);
    /**
     * DELETE screenshot by ID
     *
     * @param criteria
     * @param options
     * @returns
     */
    deleteScreenshot(id: IScreenshot['id'], options?: FindOptionsWhere<Screenshot>): Promise<IScreenshot>;
    /**
     * Analyze a screenshot using Gauzy AI service.
     * @param input - The input options for the screenshot.
     * @param data - The screenshot data.
     * @param file - The screenshot file.
     * @param callback - Optional callback function to handle the analysis result.
     * @returns Promise<ImageAnalysisResult>
     */
    analyzeScreenshot(input: IScreenshot, data: Buffer, file: UploadedFile, callback?: (analysis: ImageAnalysisResult['data']['analysis']) => void): Promise<ImageAnalysisResult>;
}
