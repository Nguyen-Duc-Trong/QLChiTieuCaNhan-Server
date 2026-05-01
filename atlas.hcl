data "external_schema" "typeorm" {
  program = [
    "npx",
    "ts-node",
    "--project", "tsconfig.json",
    "-e",
    "console.log = console.error; const { AppDataSource } = require('./src/config/database/data-source'); const { loadEntities } = require('@ariga/atlas-provider-typeorm/build/load'); loadEntities('postgres', AppDataSource.options.entities).then(sql => process.stdout.write(sql))"
  ]
}

env "local" {
  src = data.external_schema.typeorm.url
  dev = "docker://postgres/15/dev?search_path=public"
  url = "postgres://postgres:postgres@localhost:5432/finance_db?sslmode=disable"
  
  migration {
    dir = "file://atlas/migrations"
  }

  format {
    migrate {
      diff = "{{ sql . \"  \" }}"
    }
  }
}
