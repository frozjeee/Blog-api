import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedCommentAuthor1636977347545 implements MigrationInterface {
    name = 'fixedCommentAuthor1636977347545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "isReply" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "isReply" SET DEFAULT false`);
    }

}
