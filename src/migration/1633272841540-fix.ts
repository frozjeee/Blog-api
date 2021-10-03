import {MigrationInterface, QueryRunner} from "typeorm";

export class fix1633272841540 implements MigrationInterface {
    name = 'fix1633272841540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "UQ_1077d47e0112cad3c16bbcea6cd" UNIQUE ("categoryId")`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_1077d47e0112cad3c16bbcea6cd" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_1077d47e0112cad3c16bbcea6cd"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "UQ_1077d47e0112cad3c16bbcea6cd"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "categoryId"`);
    }

}
