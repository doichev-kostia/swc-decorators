import { PrimaryKey, Property, BaseEntity as BasedAsF } from "@mikro-orm/core";
import { randomUUID } from "node:crypto";

export abstract class BaseEntity extends BasedAsF {
	@PrimaryKey({ type: 'uuid'})
	id?: string = randomUUID();

	@Property({ type: "timestamp" })
	createdAt?: Date = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt?: Date = new Date();
}
