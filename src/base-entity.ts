import { EntityData, PrimaryKey, Property } from "@mikro-orm/core";
import { randomUUID } from "node:crypto";
export abstract class BaseEntity {
	@PrimaryKey({ type: 'uuid' })
	id: string = randomUUID();

	@Property()
	createdAt= new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt = new Date();

	public assign(body: EntityData<BaseEntity>) {
		Object.assign(this, body);
	}
}
