import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateBookDto } from "~/dto/create-book.dto";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Post("/authors")
	async createAuthor() {
		return this.appService.createAuthor();
	}

	@Get("/authors")
	async getAuthors() {
		return this.appService.getAuthors();
	}

	@Post("/books")
	async createBook(@Body() body: CreateBookDto) {
		return this.appService.createBook(body.authorId);
	}

	@Get("/books")
	async getBooks() {
		return this.appService.getBooks();
	}
}
