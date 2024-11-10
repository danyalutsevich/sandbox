"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_GLOBAL_SIZES = void 0;
const index_1 = require("../../../plugins/common/dist/index");
const contracts_1 = require("../../../plugins/contracts");
exports.DEFAULT_GLOBAL_SIZES = [
    {
        name: (0, index_1.ucFirst)(contracts_1.TaskSizeEnum.X_LARGE),
        value: contracts_1.TaskSizeEnum.X_LARGE,
        description: 'Larger size then medium Size',
        icon: 'task-sizes/x-large.svg',
        color: '#F5B8B8',
        isSystem: true,
    },
    {
        name: (0, index_1.ucFirst)(contracts_1.TaskSizeEnum.LARGE),
        value: contracts_1.TaskSizeEnum.LARGE,
        description: 'Bigger size than average.',
        icon: 'task-sizes/large.svg',
        color: '#F3D8B0',
        isSystem: true,
    },
    {
        name: (0, index_1.ucFirst)(contracts_1.TaskSizeEnum.MEDIUM),
        value: contracts_1.TaskSizeEnum.MEDIUM,
        description: 'Neither large nor small.',
        icon: 'task-sizes/medium.svg',
        color: '#F5F1CB',
        isSystem: true,
    },
    {
        name: (0, index_1.ucFirst)(contracts_1.TaskSizeEnum.SMALL),
        value: contracts_1.TaskSizeEnum.SMALL,
        description: 'Little size or slight dimensions.',
        icon: 'task-sizes/small.svg',
        color: '#B8D1F5',
        isSystem: true,
    },
    {
        name: (0, index_1.ucFirst)(contracts_1.TaskSizeEnum.TINY),
        value: contracts_1.TaskSizeEnum.TINY,
        description: 'Below average in size.',
        icon: 'task-sizes/tiny.svg',
        color: '#ECE8FC',
        isSystem: true,
    },
];
//# sourceMappingURL=default-global-sizes.js.map