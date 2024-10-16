import { Migration } from '@mikro-orm/migrations';

export class Migration20240925220109 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "blog" add column "author__id" varchar(255) not null;`);
    this.addSql(`alter table "blog" add constraint "blog_author__id_foreign" foreign key ("author__id") references "user" ("_id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "blog" drop constraint "blog_author__id_foreign";`);

    this.addSql(`alter table "blog" drop column "author__id";`);
  }

}
