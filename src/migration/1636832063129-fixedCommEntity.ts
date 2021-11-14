import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedCommEntity1636832063129 implements MigrationInterface {
    name = 'fixedCommEntity1636832063129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_81ae6ed2bc49693a128b6fbc3d1"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "postIdId" TO "postId"`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "isReply" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "isReply" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "postId" TO "postIdId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_81ae6ed2bc49693a128b6fbc3d1" FOREIGN KEY ("postIdId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
