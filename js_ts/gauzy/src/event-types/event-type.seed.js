"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultEventTypes = exports.createRandomEventType = void 0;
const faker_1 = require("@faker-js/faker");
const internal_1 = require("./../core/entities/internal");
const createRandomEventType = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, deal  will not be created');
        return;
    }
    if (!organizationEmployeesMap) {
        console.warn('Warning: organizationEmployeesMap not found, deal  will not be created');
        return;
    }
    for await (const tenant of tenants) {
        const organizations = tenantOrganizationsMap.get(tenant);
        for (const organization of organizations) {
            const tenantEmployees = organizationEmployeesMap.get(organization);
            for (const tenantEmployee of tenantEmployees) {
                const eventTypes = [];
                for (const organization of organizations) {
                    const { id: organizationId } = organization;
                    const tags = await dataSource.manager.findBy(internal_1.Tag, {
                        organizationId
                    });
                    const event = new internal_1.EventType();
                    event.isActive = faker_1.faker.datatype.boolean();
                    event.description = faker_1.faker.person.jobDescriptor();
                    event.title = faker_1.faker.person.jobTitle();
                    event.durationUnit = 'minutes';
                    event.duration = faker_1.faker.number.int(50);
                    event.organization = organization;
                    event.employee = tenantEmployee;
                    event.tags = tags;
                    event.tenant = tenant;
                    eventTypes.push(event);
                }
                await dataSource.manager.save(eventTypes);
            }
        }
    }
};
exports.createRandomEventType = createRandomEventType;
const createDefaultEventTypes = async (dataSource, tenant, organizations) => {
    const eventTypes = [];
    organizations.forEach((organization) => {
        const eventType = new internal_1.EventType();
        eventType.title = '15 Minutes Event';
        eventType.description = 'This is a default event type.';
        eventType.duration = 15;
        eventType.durationUnit = 'Minute(s)';
        eventType.isActive = true;
        eventType.organization = organization;
        eventType.tenant = tenant;
        eventTypes.push(eventType);
        const eventTypeOne = new internal_1.EventType();
        eventTypeOne.title = '30 Minutes Event';
        eventTypeOne.description = 'This is a default event type.';
        eventTypeOne.duration = 30;
        eventTypeOne.durationUnit = 'Minute(s)';
        eventTypeOne.isActive = true;
        eventTypeOne.organization = organization;
        eventTypeOne.tenant = tenant;
        eventTypes.push(eventTypeOne);
        const eventTypeTwo = new internal_1.EventType();
        eventTypeTwo.title = '60 Minutes Event';
        eventTypeTwo.description = 'This is a default event type.';
        eventTypeTwo.duration = 60;
        eventTypeTwo.durationUnit = 'Minute(s)';
        eventTypeTwo.isActive = true;
        eventTypeTwo.organization = organization;
        eventTypeTwo.tenant = tenant;
        eventTypes.push(eventTypeTwo);
    });
    return await insertEventTypes(dataSource, eventTypes);
};
exports.createDefaultEventTypes = createDefaultEventTypes;
const insertEventTypes = async (dataSource, eventTypes) => {
    return await dataSource.manager.save(eventTypes);
};
//# sourceMappingURL=event-type.seed.js.map