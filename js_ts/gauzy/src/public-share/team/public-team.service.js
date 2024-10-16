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
exports.PublicTeamService = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("../../../plugins/common/dist/index");
const statistic_1 = require("./../../time-tracking/statistic");
const timer_service_1 = require("./../../time-tracking/timer/timer.service");
const repository_1 = require("../../organization-team/repository");
let PublicTeamService = exports.PublicTeamService = class PublicTeamService {
    typeOrmOrganizationTeamRepository;
    statisticService;
    timerService;
    constructor(typeOrmOrganizationTeamRepository, statisticService, timerService) {
        this.typeOrmOrganizationTeamRepository = typeOrmOrganizationTeamRepository;
        this.statisticService = statisticService;
        this.timerService = timerService;
    }
    /**
     * Find a public organization team by profile link with the specified options.
     *
     * @param params - Conditions for finding the team
     * @param options - Additional query options like date range or related entities
     * @returns The found organization team
     */
    async findOneByProfileLink(params, options) {
        const findOptions = {
            select: {
                organization: {
                    id: true,
                    name: true,
                    brandColor: true
                },
                members: {
                    id: true,
                    organizationTeamId: true,
                    employeeId: true,
                    employee: {
                        id: true,
                        userId: true,
                        isActive: true,
                        isOnline: true,
                        user: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            imageUrl: true,
                            isActive: true
                        }
                    }
                }
            },
            where: {
                public: true,
                ...params,
            },
            ...(options.relations ? { relations: options.relations } : {}),
        };
        try {
            const team = await this.typeOrmOrganizationTeamRepository.findOneOrFail(findOptions);
            if (team.members?.length) {
                team.members = await this.syncMembers(team, team.members, options);
            }
            return team;
        }
        catch (error) {
            throw new common_1.NotFoundException('Organization team not found');
        }
    }
    /**
     * Syncs team members' data with worked tasks and timer status.
     *
     * @param organizationTeam - The team to which members belong
     * @param members - Members of the team
     * @param options - Additional options like date range and task source
     * @returns A promise resolving to an array of updated team members
     */
    async syncMembers(organizationTeam, members, options) {
        const { startDate, endDate, withLastWorkedTask, source, } = options;
        const employeeIds = members.map((member) => member.employeeId);
        try {
            const { id: organizationTeamId, organizationId, tenantId } = organizationTeam;
            // Retrieve timer statistics with optional task relation
            const statistics = await this.timerService.getTimerWorkedStatus({
                source,
                employeeIds,
                organizationId,
                tenantId,
                organizationTeamId,
                ...((0, index_1.parseToBoolean)(withLastWorkedTask) ? { relations: ['task'] } : {}),
            });
            // Map the timer statistics by employee ID for easier lookup
            const timerStatusMap = new Map();
            statistics.forEach((statistic) => {
                if (statistic.lastLog?.employeeId) {
                    timerStatusMap.set(statistic.lastLog.employeeId, statistic);
                }
            });
            // Create a promise array to fetch tasks and map results
            const memberPromises = members.map(async (member) => {
                const { employeeId } = member;
                // Retrieve the corresponding timer status from the map
                const timerWorkedStatus = timerStatusMap.get(employeeId);
                // Fetch tasks for the specific employee
                const [totalWorkedTasks, totalTodayTasks] = await Promise.all([
                    this.statisticService.getTasks({
                        organizationId,
                        tenantId,
                        organizationTeamId,
                        employeeIds: [employeeId],
                    }),
                    this.statisticService.getTasks({
                        organizationId,
                        tenantId,
                        organizationTeamId,
                        employeeIds: [employeeId],
                        startDate,
                        endDate,
                    }),
                ]);
                // Return the updated member with additional information
                return {
                    ...member,
                    lastWorkedTask: (0, index_1.parseToBoolean)(withLastWorkedTask) ? timerWorkedStatus?.lastLog?.task : null,
                    timerStatus: timerWorkedStatus?.timerStatus,
                    totalWorkedTasks,
                    totalTodayTasks,
                };
            });
            // Execute all promises and return the result
            return await Promise.all(memberPromises);
        }
        catch (error) {
            console.error('Error while retrieving team members worked tasks', error);
        }
    }
};
exports.PublicTeamService = PublicTeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmOrganizationTeamRepository,
        statistic_1.StatisticService,
        timer_service_1.TimerService])
], PublicTeamService);
//# sourceMappingURL=public-team.service.js.map