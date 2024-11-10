// import { Email } from './email/email.entity';
import { Blog } from './blog/blog.entity';
import { BlogService } from './blog/blog.service';
import { EmailService } from './email/email.service';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';

//Auto generated file

export const CRUDServices = [BlogService, EmailService, UserService];

export const CRUDEntities = [Blog, User];
