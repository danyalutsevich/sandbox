import { EntityManager, MikroORM } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { BasicMemoryCache, CrudConfigService } from "@eicrud/core/config";
import { EmailService } from "./services/email/email.service";
import { UserService } from "./services/user/user.service";
import { PostgreDbAdapter } from '@eicrud/postgresql'
import { roles } from "./roles";

@Injectable()
export class MyConfigService extends CrudConfigService {

    constructor(
        public userService: UserService,
        public entityManager: EntityManager,
        public emailService: EmailService,
        protected orm: MikroORM
    ) {
        super({
            userService,
            entityManager,
            emailService,
            jwtSecret: process.env.JWT_SECRET,
            cacheManager: new BasicMemoryCache(),
            orm,
            id_field: 'id',
            dbAdapter: new PostgreDbAdapter(),
        });

        this.addRoles(roles);
    }

}
