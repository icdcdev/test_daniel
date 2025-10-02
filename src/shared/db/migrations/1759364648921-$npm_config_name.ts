import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1759364648921 implements MigrationInterface {
    name = ' $npmConfigName1759364648921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "vin" character varying NOT NULL, "year" character varying NOT NULL, "model" character varying NOT NULL, "plates" character varying NOT NULL, "color" character varying NOT NULL, "ownerId" integer, CONSTRAINT "UQ_8288ce015b69c5856cf54e07a67" UNIQUE ("vin"), CONSTRAINT "UQ_db5f28cb0044406c03fe993cf82" UNIQUE ("plates"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."dates_status_enum" AS ENUM('ENABLED', 'DISABLED')`);
        await queryRunner.query(`CREATE TABLE "dates" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "comments" character varying(255) NOT NULL, "status" "public"."dates_status_enum" NOT NULL DEFAULT 'ENABLED', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "vehicleId" integer, CONSTRAINT "PK_401724822174c3539ee7036da15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('CLIENT', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(60) NOT NULL, "name" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "role" "public"."users_role_enum" NOT NULL DEFAULT 'CLIENT', "timezone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_c0a0d32b2ae04801d6e5b9e5c80" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dates" ADD CONSTRAINT "FK_3d9b938f464df488f93028584be" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dates" ADD CONSTRAINT "FK_f100c730847c9ab6a1b8d320675" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dates" DROP CONSTRAINT "FK_f100c730847c9ab6a1b8d320675"`);
        await queryRunner.query(`ALTER TABLE "dates" DROP CONSTRAINT "FK_3d9b938f464df488f93028584be"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_c0a0d32b2ae04801d6e5b9e5c80"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "dates"`);
        await queryRunner.query(`DROP TYPE "public"."dates_status_enum"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
