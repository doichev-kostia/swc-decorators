import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "~/app.service";
import { CreateBookDto } from "~/dto/create-book.dto";
import { CreateAuthorDto } from "~/dto/create-author.dto";
import { BookDto } from "~/dto/book.dto";
import { AuthorDto } from "~/dto/author.dto";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Post("/authors")
	async createAuthor(@Body() body: CreateAuthorDto): Promise<AuthorDto> {
		return this.appService.createAuthor(body);
	}

	@Get("/authors")
	async getAuthors(): Promise<AuthorDto[]> {
		return this.appService.getAuthors();
	}

	@Post("/books")
	async createBook(@Body() body: CreateBookDto): Promise<BookDto> {
		return this.appService.createBook(body);
	}

	@Get("/books")
	async getBooks(): Promise<BookDto[]> {
		return this.appService.getBooks();
	}
}
