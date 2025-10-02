import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1759362601565 implements MigrationInterface {
    name = ' $npmConfigName1759362601565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."dates_status_enum" AS ENUM('ENABLED', 'DISABLED')`);
        await queryRunner.query(`CREATE TABLE "dates" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "comments" character varying(255) NOT NULL, "status" "public"."dates_status_enum" NOT NULL DEFAULT 'ENABLED', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_401724822174c3539ee7036da15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('CLIENT', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(60) NOT NULL, "name" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "role" "public"."users_role_enum" NOT NULL DEFAULT 'CLIENT', "timezone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dates" ADD CONSTRAINT "FK_3d9b938f464df488f93028584be" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dates" DROP CONSTRAINT "FK_3d9b938f464df488f93028584be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "dates"`);
        await queryRunner.query(`DROP TYPE "public"."dates_status_enum"`);
    }

}
