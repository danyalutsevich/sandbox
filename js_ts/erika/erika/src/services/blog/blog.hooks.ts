import { CrudContext, CrudHooks } from "@eicrud/core/crud";
import { Blog } from "./blog.entity";
import { BlogService } from "./blog.service";
import { FindResponseDto } from "@eicrud/shared/interfaces";

export class BlogHooks extends CrudHooks<Blog> {

    override async beforeCreateHook(this: BlogService, data: Partial<Blog>[], ctx: CrudContext): Promise<Partial<Blog>[]> {
        // before Blog creation

        return data;
    }

    override async afterCreateHook(this: BlogService, result: any[], data: Partial<Blog>[], ctx: CrudContext): Promise<Blog[]>  {
        // after Blog creation

        return result;
    }

    override async errorCreateHook(this: BlogService, data: Partial<Blog>[], ctx: CrudContext, error: any): Promise<Blog[]> {
        // error Blog creation

        return null;
    }

    override async beforeReadHook(this: BlogService, query: Partial<Blog>, ctx: CrudContext): Promise<Partial<Blog>> {
        // before Blog read

        return query;
    }

    override async afterReadHook(this: BlogService, result, query: Partial<Blog>, ctx: CrudContext): Promise<FindResponseDto<Blog>> {
        // after Blog read

        return result;
    }

    override async errorReadHook(this: BlogService, query: Partial<Blog>, ctx: CrudContext, error: any): Promise<FindResponseDto<Blog>> {
        // error Blog read

        return null;
    }

    override async beforeUpdateHook(this: BlogService, 
        updates: { query: Partial<Blog>; data: Partial<Blog> }[],
        ctx: CrudContext,
    ): Promise<{ query: Partial<Blog>; data: Partial<Blog> }[]>  {
        // before Blog update

        return updates;
    }

    override async afterUpdateHook(this: BlogService, 
        results: any[],
        updates: { query: Partial<Blog>; data: Partial<Blog> }[],
        ctx: CrudContext,
    ): Promise<any[]> {
        // after Blog update

        return results;
    }

    override async errorUpdateHook(this: BlogService, 
        updates: { query: Partial<Blog>; data: Partial<Blog> }[],
        ctx: CrudContext,
        error: any,
    ): Promise<any[]>  {
        // error Blog update

        return null;
    }

    override async beforeDeleteHook(this: BlogService, query: Partial<Blog>, ctx: CrudContext): Promise<Partial<Blog>> {
        // before Blog delete

        return query;
    }

    override async afterDeleteHook(this: BlogService, result: any, query: Partial<Blog>, ctx: CrudContext): Promise<number> {
        // after Blog delete

        return result;
    }

    override async errorDeleteHook(this: BlogService, query: Partial<Blog>, ctx: CrudContext, error: any): Promise<number> {
        // error Blog delete

        return null;
    }

    override async errorControllerHook(this: BlogService, error: any, ctx: CrudContext): Promise<any> {
        //after Blog error

    }
};

export const hooks = new BlogHooks();

