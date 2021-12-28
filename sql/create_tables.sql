-- Adminer 4.7.7 PostgreSQL dump

\connect "rent";


DROP TABLE IF EXISTS "tariffs";
DROP SEQUENCE IF EXISTS tariffs_id_seq;
CREATE SEQUENCE tariffs_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."tariffs" (
    "name" character varying(255) NOT NULL,
    "price_per_day" numeric(6,2) NOT NULL,
    "id" integer DEFAULT nextval('tariffs_id_seq') NOT NULL,
    "max_rent_sessions_days" smallint DEFAULT '30' NOT NULL,
    CONSTRAINT "tariffs_id" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "tariff_rules";
DROP SEQUENCE IF EXISTS tariff_rules_id_seq;
CREATE SEQUENCE tariff_rules_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."tariff_rules" (
    "tariff_id" integer NOT NULL,
    "start_day" integer NOT NULL,
    "end_day" integer NOT NULL,
    "discount" integer,
    "id" integer DEFAULT nextval('tariff_rules_id_seq') NOT NULL,
    CONSTRAINT "tariff_rules_id" PRIMARY KEY ("id"),
    CONSTRAINT "tariff_rules_tariff_id_fkey" FOREIGN KEY (tariff_id) REFERENCES tariffs(id) ON DELETE CASCADE NOT DEFERRABLE
) WITH (oids = false);


DROP TABLE IF EXISTS "rent_sessions";
DROP SEQUENCE IF EXISTS rent_sessions_id_seq;
CREATE SEQUENCE rent_sessions_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."rent_sessions" (
    "id" integer DEFAULT nextval('rent_sessions_id_seq') NOT NULL,
    "car_id" integer NOT NULL,
    "tariff_id" integer NOT NULL,
    "start_date" date NOT NULL,
    "end_date" date NOT NULL,
    "cost" numeric(12,2) NOT NULL,
    CONSTRAINT "rent_sessions_id" PRIMARY KEY ("id"),
    CONSTRAINT "rent_sessions_tariff_id_fkey" FOREIGN KEY (tariff_id) REFERENCES tariffs(id) ON DELETE RESTRICT NOT DEFERRABLE
) WITH (oids = false);


-- 2021-12-28 15:13:19.136694+00
