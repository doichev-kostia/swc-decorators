import { Entity, EntityData, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "~/base-entity";
import { Author } from "~/entities/Author";

@Entity()
export class Book extends BaseEntity {
	@Property()
	title: string;

	@ManyToOne(() => Author)
	author: Author;
}
