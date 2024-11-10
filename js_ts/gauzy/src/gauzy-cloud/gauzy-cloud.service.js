"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GauzyCloudService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const operators_1 = require("rxjs/operators");
let GauzyCloudService = exports.GauzyCloudService = class GauzyCloudService {
    _http;
    constructor(_http) {
        this._http = _http;
    }
    /**
     * Extract user from cloud server
     * Register user from local to cloud server
     *
     * @param params
     * @returns
     */
    migrateUser(params) {
        return this._http
            .post('/api/auth/register', params)
            .pipe((0, operators_1.map)((resp) => resp));
    }
    /**
     * Extract Bearer Token from cloud server
     * Login user from local to cloud server
     *
     * @param params
     * @returns
     */
    extractToken(params) {
        return this._http
            .post('/api/auth/login', params)
            .pipe((0, operators_1.map)((resp) => resp));
    }
    /**
     * Migrate default tenant to the cloud server
     *
     * @param params
     * @param token
     * @returns
     */
    migrateTenant(params, token) {
        return this._http
            .post('/api/tenant', params, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .pipe((0, operators_1.map)((resp) => resp));
    }
    /**
     * Migrate default organization to the cloud server
     *
     * @param params
     * @param token
     * @returns
     */
    migrateOrganization(params, token) {
        return this._http
            .post('/api/organization', params, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .pipe((0, operators_1.map)((resp) => resp));
    }
    /**
     * Migrate roles to the cloud server
     *
     * @param params
     * @param token
     * @param tenant
     * @returns
     */
    migrateRoles(params, token, tenant) {
        return this._http
            .post('/api/roles/import/migrate', params, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Tenant-Id': `${tenant.id}`,
            },
        })
            .pipe((0, operators_1.map)((resp) => resp));
    }
    /**
     * Migrate role permissions to the cloud server
     *
     * @param params
     * @param token
     * @param tenant
     * @returns
     */
    migrateRolePermissions(params, token, tenant) {
        return this._http
            .post('/api/role-permissions/import/migrate', params, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Tenant-Id': `${tenant.id}`,
            },
        })
            .pipe((0, operators_1.map)((resp) => resp));
    }
};
exports.GauzyCloudService = GauzyCloudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], GauzyCloudService);
//# sourceMappingURL=gauzy-cloud.service.js.map