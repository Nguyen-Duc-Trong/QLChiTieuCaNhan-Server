-- Create enum type "transactions_type_enum"
CREATE TYPE "transactions_type_enum" AS ENUM ('MONEYIN', 'MONEYOUT');
-- Create enum type "categories_type_enum"
CREATE TYPE "categories_type_enum" AS ENUM ('MONEYIN', 'MONEYOUT');
-- Create "categories" table
CREATE TABLE "categories" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "name" character varying(255) NOT NULL,
  "type" "categories_type_enum" NULL,
  CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
);
-- Create "transactions" table
CREATE TABLE "transactions" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL,
  "money" numeric(10) NOT NULL,
  "type" "transactions_type_enum" NULL,
  "categories_id" uuid NOT NULL,
  "description" character varying NOT NULL,
  "date" timestamp NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now(),
  "categoriesId" uuid NULL,
  CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"),
  CONSTRAINT "FK_a5e0d18be8ee3613080bca63484" FOREIGN KEY ("categoriesId") REFERENCES "categories" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
