import { Injectable, NotFoundException } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/sqlite";
import { Book } from "~/entities/Book";
import { Author } from "~/entities/Author";

@Injectable()
export class AppService {
	constructor(private em: EntityManager) {
	}

	getHello(): string {
		return "Hello World!";
	}

	async createAuthor() {
		// @ts-ignore
		const author = this.em.create(Author, {
			name: "Jon Snow",
		});

		await this.em.persistAndFlush(author);

		return author;
	}

	async getAuthors() {
		return this.em.find(Author, {});
	}

	async createBook(authorId: string) {
		const author = await this.em.findOne(Author, {
			id: authorId
		});

		if (!author) {
			throw new NotFoundException("Author not found");
		}

		// @ts-ignore
		const book = this.em.create(Book, {
			title: "My First Book",
			author,
		});

		await this.em.persistAndFlush(book);

		return book;
	}

	async getBooks() {
		return this.em.find(Book, {});
	}
}
