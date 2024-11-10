import { ApplicationPluginConfig } from '../../../plugins/common/dist/index';
/**
* WARNING: Running this file will DELETE all data in your database
* and generate and insert new, random data into your database.
*
* BE CAREFUL running this file in production env. It's possible to delete all production data.
* SeedData checks if environment is in production or not by checking src/environments/environment.ts file configs.
* If environment.production config is set to true, then the seeding process will only generate default roles and 2 default users.
* */
export declare function seedAll(devConfig: Partial<ApplicationPluginConfig>): Promise<void>;
