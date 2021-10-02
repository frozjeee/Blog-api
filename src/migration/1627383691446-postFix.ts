import {MigrationInterface, QueryRunner} from "typeorm";

export class postFix1627383691446 implements MigrationInterface {
    name = 'postFix1627383691446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "password" character varying NOT NULL`);
    }

}
