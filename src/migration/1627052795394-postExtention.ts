import {MigrationInterface, QueryRunner} from "typeorm";

export class postExtention1627052795394 implements MigrationInterface {
    name = 'postExtention1627052795394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "title"`);
    }

}
