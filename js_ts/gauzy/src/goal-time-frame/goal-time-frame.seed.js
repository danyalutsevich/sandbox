"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultTimeFrames = void 0;
const goal_time_frame_entity_1 = require("./goal-time-frame.entity");
const moment_1 = __importDefault(require("moment"));
const createDefaultTimeFrames = async (dataSource, tenant, organizations) => {
    const defaultTimeFrames = [];
    for (const organization of organizations) {
        // Annual time frame current year
        defaultTimeFrames.push({
            name: `Annual-${(0, moment_1.default)().year()}`,
            status: 'Active',
            startDate: (0, moment_1.default)().startOf('year').toDate(),
            endDate: (0, moment_1.default)().endOf('year').toDate(),
            tenant: tenant,
            organization: organization
        });
        // will add all 4 Quarters of current year
        for (let i = 1; i <= 4; i++) {
            const start = (0, moment_1.default)().quarter(i).startOf('quarter').toDate();
            const end = (0, moment_1.default)().quarter(i).endOf('quarter').toDate();
            defaultTimeFrames.push({
                name: `Q${i}-${(0, moment_1.default)().year()}`,
                status: 'Active',
                startDate: start,
                endDate: end,
                tenant: tenant,
                organization: organization
            });
        }
    }
    await insertDefaultTimeFrames(dataSource, defaultTimeFrames);
    return defaultTimeFrames;
};
exports.createDefaultTimeFrames = createDefaultTimeFrames;
const insertDefaultTimeFrames = async (dataSource, defaultTimeFrames) => {
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(goal_time_frame_entity_1.GoalTimeFrame)
        .values(defaultTimeFrames)
        .execute();
};
//# sourceMappingURL=goal-time-frame.seed.js.map