import { Migration } from '@mikro-orm/migrations';

export class Migration20241023195958 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "blog" drop constraint "blog_author__id_foreign";`);

    this.addSql(`alter table "blog" alter column "author__id" type varchar(255) using ("author__id"::varchar(255));`);
    this.addSql(`alter table "blog" alter column "author__id" drop not null;`);
    this.addSql(`alter table "blog" add constraint "blog_author__id_foreign" foreign key ("author__id") references "user" ("_id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "blog" drop constraint "blog_author__id_foreign";`);

    this.addSql(`alter table "blog" alter column "author__id" type varchar(255) using ("author__id"::varchar(255));`);
    this.addSql(`alter table "blog" alter column "author__id" set not null;`);
    this.addSql(`alter table "blog" add constraint "blog_author__id_foreign" foreign key ("author__id") references "user" ("_id") on update cascade;`);
  }

}
