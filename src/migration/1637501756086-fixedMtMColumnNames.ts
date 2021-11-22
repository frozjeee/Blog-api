import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedMtMColumnNames1637501756086 implements MigrationInterface {
    name = 'fixedMtMColumnNames1637501756086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP CONSTRAINT "FK_619fa4cfb56790d92c6d1398641"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP CONSTRAINT "FK_fb55249d9cf698938fe8dfffd1f"`);
        await queryRunner.query(`DROP INDEX "IDX_619fa4cfb56790d92c6d139864"`);
        await queryRunner.query(`DROP INDEX "IDX_fb55249d9cf698938fe8dfffd1"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP CONSTRAINT "PK_37e7b0416456fd070666297603a"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD CONSTRAINT "PK_fb55249d9cf698938fe8dfffd1f" PRIMARY KEY ("commentId_1")`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP COLUMN "commentId_2"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP CONSTRAINT "PK_fb55249d9cf698938fe8dfffd1f"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP COLUMN "commentId_1"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD "comment" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD CONSTRAINT "PK_b3f25ff663a12b42df2d43aa96e" PRIMARY KEY ("comment")`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD "response" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP CONSTRAINT "PK_b3f25ff663a12b42df2d43aa96e"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD CONSTRAINT "PK_b11ae0bb3ea71361e517901bf26" PRIMARY KEY ("comment", "response")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "registered_at" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "created_at" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "isReply" SET DEFAULT '0'`);
        await queryRunner.query(`CREATE INDEX "IDX_b3f25ff663a12b42df2d43aa96" ON "comment_replies_comment" ("comment") `);
        await queryRunner.query(`CREATE INDEX "IDX_a8100f0ee0666c90624a333a2f" ON "comment_replies_comment" ("response") `);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD CONSTRAINT "FK_b3f25ff663a12b42df2d43aa96e" FOREIGN KEY ("comment") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD CONSTRAINT "FK_a8100f0ee0666c90624a333a2f6" FOREIGN KEY ("response") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP CONSTRAINT "FK_a8100f0ee0666c90624a333a2f6"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP CONSTRAINT "FK_b3f25ff663a12b42df2d43aa96e"`);
        await queryRunner.query(`DROP INDEX "IDX_a8100f0ee0666c90624a333a2f"`);
        await queryRunner.query(`DROP INDEX "IDX_b3f25ff663a12b42df2d43aa96"`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "isReply" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "registered_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP CONSTRAINT "PK_b11ae0bb3ea71361e517901bf26"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD CONSTRAINT "PK_b3f25ff663a12b42df2d43aa96e" PRIMARY KEY ("comment")`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP COLUMN "response"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP CONSTRAINT "PK_b3f25ff663a12b42df2d43aa96e"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD "commentId_1" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD CONSTRAINT "PK_fb55249d9cf698938fe8dfffd1f" PRIMARY KEY ("commentId_1")`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD "commentId_2" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" DROP CONSTRAINT "PK_fb55249d9cf698938fe8dfffd1f"`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD CONSTRAINT "PK_37e7b0416456fd070666297603a" PRIMARY KEY ("commentId_2", "commentId_1")`);
        await queryRunner.query(`CREATE INDEX "IDX_fb55249d9cf698938fe8dfffd1" ON "comment_replies_comment" ("commentId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_619fa4cfb56790d92c6d139864" ON "comment_replies_comment" ("commentId_2") `);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD CONSTRAINT "FK_fb55249d9cf698938fe8dfffd1f" FOREIGN KEY ("commentId_1") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comment_replies_comment" ADD CONSTRAINT "FK_619fa4cfb56790d92c6d1398641" FOREIGN KEY ("commentId_2") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
