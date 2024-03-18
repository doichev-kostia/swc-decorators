import { defineConfig, MikroORM  } from "@mikro-orm/sqlite";

const config = defineConfig({
	entities: ['./build/entities/**/*.js'],
	entitiesTs: ['./src/entities/**/*.ts'],
	dbName: 'db.sqlite',
});

export default config;
