import { BaseEntity } from "~/base-entity";
import { Entity, Property } from "@mikro-orm/core";


@Entity()
export class Author extends BaseEntity {
	@Property()
	name: string;
}
