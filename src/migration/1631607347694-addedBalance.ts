import {MigrationInterface, QueryRunner} from "typeorm";

export class addedBalance1631607347694 implements MigrationInterface {
    name = 'addedBalance1631607347694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "about" TO "balance"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "balance" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "balance" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "balance" TO "about"`);
    }

}
