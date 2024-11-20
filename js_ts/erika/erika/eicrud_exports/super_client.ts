import { UserClient } from './user/user.client';
import { EmailClient } from './email/email.client';
import { BlogClient } from './blog/blog.client';
import { SuperClientConfig } from "@eicrud/client";

export class SuperClient {

    constructor(config: SuperClientConfig) {

        // GENERATED START 1
        this.user = new UserClient(config);
        this.email = new EmailClient(config);
        this.blog = new BlogClient(config);
    }

    // GENERATED START 2
    user: UserClient;
    email: EmailClient;
    blog: BlogClient;
}