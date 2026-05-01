-- Create "users" table
CREATE TABLE "users" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "name" character varying(255) NOT NULL,
  "email" character varying(255) NOT NULL,
  "password" character varying NOT NULL,
  CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"),
  CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
);
