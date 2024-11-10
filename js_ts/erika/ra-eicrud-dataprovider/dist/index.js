"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const underscore_1 = __importDefault(require("underscore"));
exports.default = (sp) => ({
    getList: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        console.log("getList", { resource, params });
        const res = yield sp[resource].find(Object.assign({}, params.filter), {
            limit: (_a = params.pagination) === null || _a === void 0 ? void 0 : _a.perPage,
            offset: ((((_b = params === null || params === void 0 ? void 0 : params.pagination) === null || _b === void 0 ? void 0 : _b.page) || 0) - 1) *
                (((_c = params === null || params === void 0 ? void 0 : params.pagination) === null || _c === void 0 ? void 0 : _c.perPage) || 0),
        });
        return {
            data: res.data,
            total: res.total,
        };
    }),
    getOne: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield sp[resource].findOne({
            id: params.id,
        });
        console.log("getOne", { resource, params, res });
        return {
            data: res,
        };
    }),
    getMany: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield sp[resource].find({
            id: { $in: params.ids },
        });
        console.log("getMany", { resource, params, res });
        return {
            data: res.data,
        };
    }),
    getManyReference: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield sp[resource].find(Object.assign({}, params.filter));
        console.log("getManyReference", { resource, params, res });
        return {
            data: res.data,
            total: res.total,
        };
    }),
    update: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedFileds = underscore_1.default.pick(params.data, (value, key) => !underscore_1.default.isEqual(value, params.previousData[key]));
        const res = yield sp[resource].patch({ id: params.id }, Object.assign({}, updatedFileds));
        console.log("update", { resource, params, res, updatedFileds });
        return {
            data: res,
        };
    }),
    updateMany: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield sp[resource].patch({ id: { $in: params.ids } }, Object.assign({}, params.data));
        console.log("updateMany", { resource, params, res });
        return {
            data: res.data,
        };
    }),
    create: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield sp[resource].create(Object.assign({}, params.data));
        console.log("create", { resource, params, res });
        return {
            data: res,
        };
    }),
    delete: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield sp[resource].deleteOne({
            id: params.id,
        });
        console.log("delete", { resource, params, res });
        return {
            data: res,
        };
    }),
    deleteMany: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield sp[resource].delete({
            id: { $in: params.ids },
        });
        console.log("deleteMany", { resource, params, res });
        return {
            data: [res],
        };
    }),
});
// getList: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: GetListParams & QueryFunctionContext
// ) => Promise<GetListResult<RecordType>>;
//
// getOne: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: GetOneParams<RecordType> & QueryFunctionContext
// ) => Promise<GetOneResult<RecordType>>;
//
// getMany: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: GetManyParams<RecordType> & QueryFunctionContext
// ) => Promise<GetManyResult<RecordType>>;
//
// getManyReference: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: GetManyReferenceParams & QueryFunctionContext
// ) => Promise<GetManyReferenceResult<RecordType>>;
//
// update: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: UpdateParams
// ) => Promise<UpdateResult<RecordType>>;
//
// updateMany: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: UpdateManyParams
// ) => Promise<UpdateManyResult<RecordType>>;
//
// create: <
//   RecordType extends Omit<RaRecord, 'id'> = any,
//   ResultRecordType extends RaRecord = RecordType & { id: Identifier },
// >(
//   resource: ResourceType,
//   params: CreateParams
// ) => Promise<CreateResult<ResultRecordType>>;
//
// delete: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: DeleteParams<RecordType>
// ) => Promise<DeleteResult<RecordType>>;
//
// deleteMany: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: DeleteManyParams<RecordType>
// ) => Promise<DeleteManyResult<RecordType>>;
//
// [key: string]: any;
// supportAbortSignal?: boolean;
//
//# sourceMappingURL=index.js.map