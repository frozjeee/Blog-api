import {MigrationInterface, QueryRunner} from "typeorm";

export class createdLikesViews1638522067751 implements MigrationInterface {
    name = 'createdLikesViews1638522067751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_likes_post" ("post" integer NOT NULL, "likedUser" integer NOT NULL, CONSTRAINT "PK_b5abc3ede5722e3d1d0a4935f13" PRIMARY KEY ("post", "likedUser"))`);
        await queryRunner.query(`CREATE INDEX "IDX_74141a0d2740298ec4c8e48329" ON "user_likes_post" ("post") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f61bcbafdc8a95002a11d830c" ON "user_likes_post" ("likedUser") `);
        await queryRunner.query(`CREATE TABLE "user_dislikes_post" ("post" integer NOT NULL, "dislikedUser" integer NOT NULL, CONSTRAINT "PK_d94aa0ab3d94c47654b96ffa119" PRIMARY KEY ("post", "dislikedUser"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1f48a8c8c22fe156fb4774d5c8" ON "user_dislikes_post" ("post") `);
        await queryRunner.query(`CREATE INDEX "IDX_85555626dd50bf98fc9073431b" ON "user_dislikes_post" ("dislikedUser") `);
        await queryRunner.query(`CREATE TABLE "user_views_post" ("post" integer NOT NULL, "viewedUser" integer NOT NULL, CONSTRAINT "PK_8613f7c1c49c28663ac61b0ebe9" PRIMARY KEY ("post", "viewedUser"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5c45eb5ce43a25be0575793260" ON "user_views_post" ("post") `);
        await queryRunner.query(`CREATE INDEX "IDX_504a84ee5757a4c30706903c45" ON "user_views_post" ("viewedUser") `);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "isReply" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user_likes_post" ADD CONSTRAINT "FK_74141a0d2740298ec4c8e483295" FOREIGN KEY ("post") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_likes_post" ADD CONSTRAINT "FK_0f61bcbafdc8a95002a11d830c5" FOREIGN KEY ("likedUser") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_dislikes_post" ADD CONSTRAINT "FK_1f48a8c8c22fe156fb4774d5c82" FOREIGN KEY ("post") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_dislikes_post" ADD CONSTRAINT "FK_85555626dd50bf98fc9073431bd" FOREIGN KEY ("dislikedUser") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_views_post" ADD CONSTRAINT "FK_5c45eb5ce43a25be05757932604" FOREIGN KEY ("post") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_views_post" ADD CONSTRAINT "FK_504a84ee5757a4c30706903c45f" FOREIGN KEY ("viewedUser") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_views_post" DROP CONSTRAINT "FK_504a84ee5757a4c30706903c45f"`);
        await queryRunner.query(`ALTER TABLE "user_views_post" DROP CONSTRAINT "FK_5c45eb5ce43a25be05757932604"`);
        await queryRunner.query(`ALTER TABLE "user_dislikes_post" DROP CONSTRAINT "FK_85555626dd50bf98fc9073431bd"`);
        await queryRunner.query(`ALTER TABLE "user_dislikes_post" DROP CONSTRAINT "FK_1f48a8c8c22fe156fb4774d5c82"`);
        await queryRunner.query(`ALTER TABLE "user_likes_post" DROP CONSTRAINT "FK_0f61bcbafdc8a95002a11d830c5"`);
        await queryRunner.query(`ALTER TABLE "user_likes_post" DROP CONSTRAINT "FK_74141a0d2740298ec4c8e483295"`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "isReply" SET DEFAULT false`);
        await queryRunner.query(`DROP INDEX "IDX_504a84ee5757a4c30706903c45"`);
        await queryRunner.query(`DROP INDEX "IDX_5c45eb5ce43a25be0575793260"`);
        await queryRunner.query(`DROP TABLE "user_views_post"`);
        await queryRunner.query(`DROP INDEX "IDX_85555626dd50bf98fc9073431b"`);
        await queryRunner.query(`DROP INDEX "IDX_1f48a8c8c22fe156fb4774d5c8"`);
        await queryRunner.query(`DROP TABLE "user_dislikes_post"`);
        await queryRunner.query(`DROP INDEX "IDX_0f61bcbafdc8a95002a11d830c"`);
        await queryRunner.query(`DROP INDEX "IDX_74141a0d2740298ec4c8e48329"`);
        await queryRunner.query(`DROP TABLE "user_likes_post"`);
    }

}
