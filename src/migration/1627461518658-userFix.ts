import {MigrationInterface, QueryRunner} from "typeorm";

export class userFix1627461518658 implements MigrationInterface {
    name = 'userFix1627461518658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "about" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "about" SET NOT NULL`);
    }

}
