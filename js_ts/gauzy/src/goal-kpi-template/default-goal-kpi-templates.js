"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_GOAL_KPI_TEMPLATES = void 0;
exports.DEFAULT_GOAL_KPI_TEMPLATES = [
    {
        name: 'Average response time',
        description: '',
        type: 'Numerical',
        unit: 'ms',
        operator: '<=',
        currentValue: 1000,
        targetValue: 500
    },
    {
        name: '# of Priority bugs in production',
        description: '',
        type: 'Numerical',
        unit: 'bugs',
        operator: '<=',
        currentValue: 15,
        targetValue: 2
    }
];
//# sourceMappingURL=default-goal-kpi-templates.js.map