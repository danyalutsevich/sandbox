import { ApplicationPluginConfig } from '../../../plugins/common/dist/index';
import { Screenshot } from '../../core/entities/internal';
export declare const createRandomScreenshot: (config: Partial<ApplicationPluginConfig>, tenantId: string, organizationId: string, startedAt: Date, stoppedAt: Date) => Promise<Screenshot[]>;
