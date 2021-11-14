import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedComment1636697023744 implements MigrationInterface {
    name = 'fixedComment1636697023744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "isReply" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "isReply" SET DEFAULT false`);
    }

}
