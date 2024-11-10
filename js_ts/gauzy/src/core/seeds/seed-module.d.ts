import { ApplicationPluginConfig } from '../../../plugins/common/dist/index';
/**
* Usage:
* yarn seed:module All
* yarn seed:module Default
* yarn seed:module Jobs
* yarn seed:module Reports
* yarn seed:module Ever
*
*/
export declare function seedModule(devConfig: Partial<ApplicationPluginConfig>): Promise<void>;
