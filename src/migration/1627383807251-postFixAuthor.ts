import {MigrationInterface, QueryRunner} from "typeorm";

export class postFixAuthor1627383807251 implements MigrationInterface {
    name = 'postFixAuthor1627383807251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD "author" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
