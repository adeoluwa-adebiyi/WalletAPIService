import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDB1618150375484 implements MigrationInterface {
    name = 'InitDB1618150375484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "currency_symbol_enum" AS ENUM('NGN', 'USD')`);
        await queryRunner.query(`CREATE TABLE "currency" ("id" SERIAL NOT NULL, "symbol" "currency_symbol_enum" NOT NULL, "description" character varying, CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exchange_rate" ("id" SERIAL NOT NULL, "from" integer NOT NULL, "to" integer NOT NULL, CONSTRAINT "UQ_7d7c724e18481fe9a76491f9c89" UNIQUE ("from", "to"), CONSTRAINT "PK_5c5d27d2b900ef6cdeef0398472" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "lastName" character varying, "dob" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "balance" numeric NOT NULL DEFAULT '0', "ownerId" integer, "currencyId" integer, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_811b584ced5705c8937beaea070" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_811b584ced5705c8937beaea070"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "exchange_rate"`);
        await queryRunner.query(`DROP TABLE "currency"`);
        await queryRunner.query(`DROP TYPE "currency_symbol_enum"`);
    }

}
