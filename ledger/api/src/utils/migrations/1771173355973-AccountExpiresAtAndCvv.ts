import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountExpiresAtAndCvv1771173355973 implements MigrationInterface {
  name = 'AccountExpiresAtAndCvv1771173355973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "expiresAt" character varying(5)`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "cvv" character varying(3)`,
    );

    await queryRunner.query(
      `UPDATE "accounts" SET "expiresAt" = '02/30', "cvv" = '000' WHERE "expiresAt" IS NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "accounts" ALTER COLUMN "expiresAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ALTER COLUMN "cvv" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "cvv"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "expiresAt"`);
  }
}
