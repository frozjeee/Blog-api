import {MigrationInterface, QueryRunner} from "typeorm";

export class addedSubPrice1636356330548 implements MigrationInterface {
    name = 'addedSubPrice1636356330548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "price" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "price"`);
    }

}
