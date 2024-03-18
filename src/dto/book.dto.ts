import { IsString, IsUUID } from "class-validator";

export class BookDto {
	@IsUUID()
	id: string;

	@IsString()
	title: string;
}
