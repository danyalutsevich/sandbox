import { ModuleRef } from "@nestjs/core";
import { Blog } from "./blog.entity";
import { Injectable } from "@nestjs/common";
import { getSecurity } from "./blog.security";
import { CrudService, Inheritance, CrudContext } from "@eicrud/core/crud";
import { serviceCmds } from "./cmds";
import { hooks } from "./blog.hooks";

@Injectable()
export class BlogService extends CrudService<Blog> {
    constructor(protected moduleRef: ModuleRef) {
        const serviceName = CrudService.getName(Blog);
        super(moduleRef, Blog, getSecurity(serviceName), { hooks });
    }
    
    // GENERATED START - do not remove

}