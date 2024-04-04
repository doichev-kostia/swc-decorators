import { IsString } from "class-validator";

export class CreateBookDto {
	@IsString()
	title: string;

	@IsString()
	authorId: string;
}
