import { Injectable, NotFoundException } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/sqlite";
import { Book } from "~/entities/Book";
import { Author } from "~/entities/Author";
import { CreateAuthorDto } from "~/dto/create-author.dto";
import { CreateBookDto } from "~/dto/create-book.dto";

@Injectable()
export class AppService {
	constructor(private em: EntityManager) {
	}

	getHello(): string {
		return "Hello World!";
	}

	async createAuthor(data: CreateAuthorDto) {
		// @ts-ignore
		const author = this.em.create(Author, {
			name: data.name,
		});

		await this.em.persistAndFlush(author);

		return author;
	}

	async getAuthors() {
		return this.em.find(Author, {});
	}

	async createBook(data: CreateBookDto) {
		const author = await this.em.findOne(Author, {
			id: data.authorId
		});

		if (!author) {
			throw new NotFoundException("Author not found");
		}

		// @ts-ignore
		const book = this.em.create(Book, {
			title: data.title,
			author,
		});

		await this.em.persistAndFlush(book);

		return book;
	}

	async getBooks() {
		return this.em.find(Book, {});
	}
}
