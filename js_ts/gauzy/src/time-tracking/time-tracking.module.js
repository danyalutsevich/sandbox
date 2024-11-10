"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TimeTrackingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTrackingModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const activity_module_1 = require("./activity/activity.module");
const screenshot_module_1 = require("./screenshot/screenshot.module");
const statistic_1 = require("./statistic");
const time_log_module_1 = require("./time-log/time-log.module");
const timer_module_1 = require("./timer/timer.module");
const timesheet_module_1 = require("./timesheet/timesheet.module");
const time_slot_module_1 = require("./time-slot/time-slot.module");
let TimeTrackingModule = exports.TimeTrackingModule = TimeTrackingModule_1 = class TimeTrackingModule {
};
exports.TimeTrackingModule = TimeTrackingModule = TimeTrackingModule_1 = __decorate([
    (0, common_1.Module)({
        controllers: [],
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/timesheet',
                    module: TimeTrackingModule_1,
                    children: [
                        { path: '/timer', module: timer_module_1.TimerModule },
                        { path: '/activity', module: activity_module_1.ActivityModule },
                        { path: '/time-log', module: time_log_module_1.TimeLogModule },
                        { path: '/time-slot', module: time_slot_module_1.TimeSlotModule },
                        { path: '/screenshot', module: screenshot_module_1.ScreenshotModule },
                        { path: '/statistics', module: statistic_1.StatisticModule },
                        { path: '/', module: timesheet_module_1.TimesheetModule }
                    ]
                }
            ]),
            timer_module_1.TimerModule,
            activity_module_1.ActivityModule,
            time_log_module_1.TimeLogModule,
            time_slot_module_1.TimeSlotModule,
            screenshot_module_1.ScreenshotModule,
            statistic_1.StatisticModule,
            timesheet_module_1.TimesheetModule
        ],
        providers: [],
        exports: []
    })
], TimeTrackingModule);
//# sourceMappingURL=time-tracking.module.js.map