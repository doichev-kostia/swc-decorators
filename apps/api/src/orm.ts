import { defineConfig, MikroORM  } from "@mikro-orm/sqlite";
import * as Entities from 'db/entities'


// ideally it should be import.meta.glob
// https://vitejs.dev/guide/features#glob-import

const entities = Object.values(Entities)
	.filter((entity) => typeof entity === 'function') as Function[];

const config = defineConfig({
	entities: entities,
	entitiesTs: entities,
	dbName: 'db.sqlite',
});

export default config;
