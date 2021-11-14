import {MigrationInterface, QueryRunner} from "typeorm";

export class commentsAdded1636627080216 implements MigrationInterface {
    name = 'commentsAdded1636627080216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "isReply" boolean NOT NULL DEFAULT '0', "text" character varying NOT NULL, "postIdId" integer, "authorId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment_replies_comment" ("commentId_1" integer NOT NULL, "commentId_2" integer NOT NULL, CONSTRAINT "PK_37e7b0416456fd070666297603a" PRIMARY KEY ("commentId_1", "commentId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb55249d9cf698938fe8dfffd1" ON "comment_replies_comment" ("commentId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_619fa4cfb56790d92c6d139864" ON "comment_replies_comment" ("commentId_2") `);
        await queryRunner.query(`ALTER TABLE "post" ADD "likes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "post" ADD "dislikes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "post" ADD "views" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_81ae6ed2bc49693a128b6fbc3d1" FOREIGN KEY ("postIdId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD CONSTRAINT "FK_fb55249d9cf698938fe8dfffd1f" FOREIGN KEY ("commentId_1") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD CONSTRAINT "FK_619fa4cfb56790d92c6d1398641" FOREIGN KEY ("commentId_2") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP CONSTRAINT "FK_619fa4cfb56790d92c6d1398641"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP CONSTRAINT "FK_fb55249d9cf698938fe8dfffd1f"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_81ae6ed2bc49693a128b6fbc3d1"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "views"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "dislikes"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "likes"`);
        await queryRunner.query(`DROP INDEX "IDX_619fa4cfb56790d92c6d139864"`);
        await queryRunner.query(`DROP INDEX "IDX_fb55249d9cf698938fe8dfffd1"`);
        await queryRunner.query(`DROP TABLE "comment_replies_comment"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
