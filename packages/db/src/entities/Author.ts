import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../base-entity";


@Entity()
export class Author extends BaseEntity {
	@Property()
	name: string;
}
