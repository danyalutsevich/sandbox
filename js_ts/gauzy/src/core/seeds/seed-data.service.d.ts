import { ModuleRef } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { ConfigService } from '../../../plugins/config/dist/index';
import { IEmployee, IOrganization, IOrganizationProject, IRole, ITenant, IUser } from '../../../plugins/contracts';
export declare enum SeederTypeEnum {
    ALL = "all",
    EVER = "ever",
    DEFAULT = "default"
}
export declare class SeedDataService {
    private readonly moduleRef;
    private readonly configService;
    dataSource: DataSource;
    log: (message?: any, ...optionalParams: any[]) => void;
    defaultOrganization: IOrganization;
    tenant: ITenant;
    seedType: SeederTypeEnum;
    organizations: IOrganization[];
    defaultProjects: IOrganizationProject[] | void;
    roles: IRole[];
    superAdminUsers: IUser[];
    defaultCandidateUsers: IUser[];
    defaultEmployees: IEmployee[];
    /** */
    randomTenants: ITenant[];
    randomTenantOrganizationsMap: Map<ITenant, IOrganization[]>;
    randomOrganizationEmployeesMap: Map<IOrganization, IEmployee[]>;
    constructor(moduleRef: ModuleRef, configService: ConfigService);
    /**
     * This config is applied only for `yarn seed:*` type calls because
     * that is when connection is created by this service itself.
     */
    overrideDbConfig: {
        logging: string;
        logger: string;
    };
    /**
     * Seed All Data
     */
    runAllSeed(): Promise<void>;
    /**
     * Seed Default Data
     */
    runDefaultSeed(fromAPI: boolean): Promise<void>;
    /**
     * Seed Default Ever Data
     */
    runEverSeed(): Promise<void>;
    /**
     * Seed Default Report Data
     */
    runReportsSeed(): Promise<void>;
    /**
     * Seed Default & Random Data
     */
    executeDemoSeed(): Promise<void>;
    /**
     * Populate database with report related data
     */
    private seedReportsData;
    /**
     * Seed Default Job Data
     */
    runJobsSeed(): Promise<void>;
    /**
     * Populate Database with Basic Default Data
     */
    private seedBasicDefaultData;
    /**
     * Populate default data for default tenant
     */
    private seedDefaultData;
    /**
     * Populate database with random generated data
     */
    private seedRandomData;
    /**
     * Cleans all the previous generate screenshots, reports etc
     */
    private cleanUpPreviousRuns;
    /**
     * Create connection from database
     */
    private createConnection;
    /**
     * Close connection from database
     */
    private closeConnection;
    /**
     * Reset the database, truncate all tables (remove all data)
     */
    private resetDatabase;
    /**
     * Retrieve entities metadata
     */
    private getEntities;
    /**
     * Cleans all the entities
     * Removes all data from database
     */
    private cleanAll;
    /**
     * Bootstrap Plugins Seed Methods
     *
     * @param lifecycleMethod
     * @param closure
     */
    private bootstrapPluginSeedMethods;
    /**
     * Use this wrapper function for all seed functions which are not essential.
     * Essentials seeds are ONLY those which are required to start the UI/login
     */
    tryExecute<T>(name: string, p: Promise<T>): Promise<T> | Promise<void>;
    private handleError;
}
