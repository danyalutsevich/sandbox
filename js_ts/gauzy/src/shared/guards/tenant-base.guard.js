"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantBaseGuard = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const contracts_1 = require("../../../plugins/contracts");
const context_1 = require("./../../core/context");
let TenantBaseGuard = exports.TenantBaseGuard = class TenantBaseGuard {
    /**
     *
     * @param context
     * @returns
     */
    async canActivate(context) {
        console.log('TenantBaseGuard canActivate called');
        const currentTenantId = context_1.RequestContext.currentTenantId();
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const { query, headers, rawHeaders } = request;
        let isAuthorized = false;
        if (!currentTenantId) {
            console.log('Guard TenantBase: Unauthorized access blocked. TenantId:', currentTenantId);
            return isAuthorized;
        }
        // Get tenant-id from request headers
        const headerTenantId = headers['tenant-id'];
        if (headerTenantId && (rawHeaders.includes('tenant-id') || rawHeaders.includes('Tenant-Id'))) {
            isAuthorized = currentTenantId === headerTenantId;
        }
        else {
            //If request to get/delete data using another tenantId then reject request.
            const httpMethods = [contracts_1.RequestMethodEnum.GET, contracts_1.RequestMethodEnum.DELETE];
            if (httpMethods.includes(method)) {
                if ('tenantId' in query) {
                    const queryTenantId = query['tenantId'];
                    isAuthorized = currentTenantId === queryTenantId;
                }
                else if (query.hasOwnProperty('data')) {
                    const data = query.data;
                    const isJson = (0, class_validator_1.isJSON)(data);
                    if (isJson) {
                        try {
                            const parse = JSON.parse(data);
                            //Match provided tenantId with logged in tenantId
                            if ('findInput' in parse && 'tenantId' in parse['findInput']) {
                                const queryTenantId = parse['findInput']['tenantId'];
                                isAuthorized = currentTenantId === queryTenantId;
                            }
                            else {
                                //If tenantId not found in query params
                                return false;
                            }
                        }
                        catch (e) {
                            console.log('Json Parser Error:', e);
                            return isAuthorized;
                        }
                    }
                }
                else {
                    // If tenantId not found in query params
                    isAuthorized = false;
                }
            }
            // If request to save/update data using another tenantId then reject request.
            const payloadMethods = [contracts_1.RequestMethodEnum.POST, contracts_1.RequestMethodEnum.PUT, contracts_1.RequestMethodEnum.PATCH];
            if (payloadMethods.includes(method)) {
                const body = request.body;
                let bodyTenantId;
                if ('tenantId' in body) {
                    bodyTenantId = body['tenantId'];
                }
                else if ('tenant' in body) {
                    bodyTenantId = body['tenant']['id'];
                }
                isAuthorized = currentTenantId === bodyTenantId;
            }
        }
        if (!isAuthorized) {
            console.log('Guard TenantBase: Unauthorized access blocked. TenantId:', headerTenantId);
        }
        else {
            console.log('Guard TenantBase: Access Allowed. TenantId:', headerTenantId);
        }
        return isAuthorized;
    }
};
exports.TenantBaseGuard = TenantBaseGuard = __decorate([
    (0, common_1.Injectable)()
], TenantBaseGuard);
//# sourceMappingURL=tenant-base.guard.js.map