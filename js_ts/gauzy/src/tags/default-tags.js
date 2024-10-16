"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_TAGS = exports.DEFAULT_ORGANIZATION_TAGS = exports.DEFAULT_GLOBAL_TAGS = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
exports.DEFAULT_GLOBAL_TAGS = [
    'VIP',
    'Urgent',
    'Crazy',
    'Broken',
    'TODO',
    'In Process',
    'Verified',
    'Third Party API',
    'Killer',
    'Idiot',
    'Super',
    'WIP'
];
exports.DEFAULT_ORGANIZATION_TAGS = [
    'Program',
    'Mobile',
    'Frontend',
    'Backend',
    'Database',
    'Authentication',
    'Security',
    'Dashboard',
    'API',
    'Design',
    'Testing',
    'Local',
    'QC',
    'Production',
    'Development',
    'Crap'
];
exports.DEFAULT_TAGS = [
    {
        name: index_1.TagEnum.MOBILE,
        icon: 'task-labels/mobile.svg',
        color: '#4e4ae8',
        textColor: '#67a946',
        description: null,
        isSystem: true
    },
    {
        name: index_1.TagEnum.FRONTEND,
        icon: 'task-labels/frontend.svg',
        color: '#41ab6b',
        textColor: '#42576c',
        description: null,
        isSystem: true
    },
    {
        name: index_1.TagEnum.BACKEND,
        icon: 'task-labels/backend.svg',
        color: '#e84a5d',
        textColor: '#c5da3e',
        description: null,
        isSystem: true
    },
    {
        name: index_1.TagEnum.WEB,
        icon: 'task-labels/web.svg',
        color: '#4192ab',
        textColor: '#5c64cf',
        description: null,
        isSystem: true
    },
    {
        name: index_1.TagEnum.UI_UX,
        icon: 'task-labels/ui-ux.svg',
        color: '#9641ab',
        textColor: '#276ea9',
        description: null,
        isSystem: true
    },
    {
        name: index_1.TagEnum.FULL_STACK,
        icon: 'task-labels/fullstack.svg',
        color: '#ab9a41',
        textColor: '#404fac',
        description: null,
        isSystem: true
    },
    {
        name: index_1.TagEnum.TABLET,
        icon: 'task-labels/tablet.svg',
        color: '#5cab41',
        textColor: '#f15894',
        description: null,
        isSystem: true
    },
    {
        name: index_1.TagEnum.BUG,
        icon: 'task-labels/bug.svg',
        color: '#e78f5e',
        textColor: '#9c00de',
        description: null,
        isSystem: true
    }
];
//# sourceMappingURL=default-tags.js.map