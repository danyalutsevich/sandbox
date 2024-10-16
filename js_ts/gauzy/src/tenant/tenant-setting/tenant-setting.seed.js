"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultTenantSetting = void 0;
const index_1 = require("../../../plugins/config/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const tenant_setting_entity_1 = require("./tenant-setting.entity");
/**
 *
 * @param dataSource
 * @param tenants
 * @returns
 */
const createDefaultTenantSetting = async (dataSource, tenants) => {
    try {
        const settings = [];
        for await (const tenant of tenants) {
            const setting = new tenant_setting_entity_1.TenantSetting();
            setting.name = 'fileStorageProvider';
            setting.value = (index_1.environment.fileSystem.name).toUpperCase() || contracts_1.FileStorageProviderEnum.LOCAL;
            setting.tenant = tenant;
            settings.push(setting);
        }
        return await dataSource.manager.save(settings);
    }
    catch (error) {
        console.log({ error });
    }
};
exports.createDefaultTenantSetting = createDefaultTenantSetting;
//# sourceMappingURL=tenant-setting.seed.js.map