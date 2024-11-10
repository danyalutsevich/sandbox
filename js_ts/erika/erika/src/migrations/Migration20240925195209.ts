import { Migration } from '@mikro-orm/migrations';

export class Migration20240925195209 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "blog" ("_id" varchar(255) not null, "title" varchar(255) not null, "content" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "blog_pkey" primary key ("_id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "blog" cascade;`);
  }

}
