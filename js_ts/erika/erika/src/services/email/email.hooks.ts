import { CrudContext, CrudHooks } from "@eicrud/core/crud";
import { Email } from "./email.entity";
import { EmailService } from "./email.service";
import { FindResponseDto } from "@eicrud/shared/interfaces";

export class EmailHooks extends CrudHooks<Email> {

    override async beforeCreateHook(this: EmailService, data: Partial<Email>[], ctx: CrudContext): Promise<Partial<Email>[]> {
        // before Email creation

        return data;
    }

    override async afterCreateHook(this: EmailService, result: any[], data: Partial<Email>[], ctx: CrudContext): Promise<Email[]>  {
        // after Email creation

        return result;
    }

    override async errorCreateHook(this: EmailService, data: Partial<Email>[], ctx: CrudContext, error: any): Promise<Email[]> {
        // error Email creation

        return null;
    }

    override async beforeReadHook(this: EmailService, query: Partial<Email>, ctx: CrudContext): Promise<Partial<Email>> {
        // before Email read

        return query;
    }

    override async afterReadHook(this: EmailService, result, query: Partial<Email>, ctx: CrudContext): Promise<FindResponseDto<Email>> {
        // after Email read

        return result;
    }

    override async errorReadHook(this: EmailService, query: Partial<Email>, ctx: CrudContext, error: any): Promise<FindResponseDto<Email>> {
        // error Email read

        return null;
    }

    override async beforeUpdateHook(this: EmailService, 
        updates: { query: Partial<Email>; data: Partial<Email> }[],
        ctx: CrudContext,
    ): Promise<{ query: Partial<Email>; data: Partial<Email> }[]>  {
        // before Email update

        return updates;
    }

    override async afterUpdateHook(this: EmailService, 
        results: any[],
        updates: { query: Partial<Email>; data: Partial<Email> }[],
        ctx: CrudContext,
    ): Promise<any[]> {
        // after Email update

        return results;
    }

    override async errorUpdateHook(this: EmailService, 
        updates: { query: Partial<Email>; data: Partial<Email> }[],
        ctx: CrudContext,
        error: any,
    ): Promise<any[]>  {
        // error Email update

        return null;
    }

    override async beforeDeleteHook(this: EmailService, query: Partial<Email>, ctx: CrudContext): Promise<Partial<Email>> {
        // before Email delete

        return query;
    }

    override async afterDeleteHook(this: EmailService, result: any, query: Partial<Email>, ctx: CrudContext): Promise<number> {
        // after Email delete

        return result;
    }

    override async errorDeleteHook(this: EmailService, query: Partial<Email>, ctx: CrudContext, error: any): Promise<number> {
        // error Email delete

        return null;
    }

    override async errorControllerHook(this: EmailService, error: any, ctx: CrudContext): Promise<any> {
        //after Email error

    }
};

export const hooks = new EmailHooks();

