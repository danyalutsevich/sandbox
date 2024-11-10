"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_GLOBAL_PRIORITIES = void 0;
const index_1 = require("../../../plugins/common/dist/index");
const contracts_1 = require("../../../plugins/contracts");
exports.DEFAULT_GLOBAL_PRIORITIES = [
    {
        name: (0, index_1.ucFirst)(contracts_1.TaskPriorityEnum.URGENT),
        value: contracts_1.TaskPriorityEnum.URGENT,
        description: 'If something is urgent, it needs to be dealt with as soon as possible.',
        icon: 'task-priorities/urgent.svg',
        color: '#F5B8B8',
        isSystem: true,
    },
    {
        name: (0, index_1.ucFirst)(contracts_1.TaskPriorityEnum.HIGH),
        value: contracts_1.TaskPriorityEnum.HIGH,
        description: 'You can use high to indicate that something is great in amount, degree, or intensity.',
        icon: 'task-priorities/high.svg',
        color: '#B8D1F5',
        isSystem: true,
    },
    {
        name: (0, index_1.ucFirst)(contracts_1.TaskPriorityEnum.MEDIUM),
        value: contracts_1.TaskPriorityEnum.MEDIUM,
        description: 'An isolated issue (one agency, small subset of events) that prevents import, search, or export of events or cases.',
        icon: 'task-priorities/medium.svg',
        color: '#ECE8FC',
        isSystem: true,
    },
    {
        name: (0, index_1.ucFirst)(contracts_1.TaskPriorityEnum.LOW),
        value: contracts_1.TaskPriorityEnum.LOW,
        description: 'There is a significant problem but it is not, at least yet, significantly affecting your operations.',
        icon: 'task-priorities/low.svg',
        color: '#D4EFDF',
        isSystem: true,
    },
];
//# sourceMappingURL=default-global-priorities.js.map