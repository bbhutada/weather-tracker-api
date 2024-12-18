import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRainDataTable1734489100291 implements MigrationInterface {
  name = 'CreateRainDataTable1734489100291';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rain_data"
       (
           "id"        uuid              NOT NULL DEFAULT uuid_generate_v4(),
           "userId"    character varying NOT NULL,
           "rain"      boolean           NOT NULL,
           "timestamp" TIMESTAMP         NOT NULL DEFAULT now(),
           CONSTRAINT "PK_99bce5b734d1da2fc0302597950" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(`CREATE INDEX "userId_index" ON "rain_data" ("userId") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."userId_index"`);
    await queryRunner.query(`DROP TABLE "rain_data"`);
  }
}
