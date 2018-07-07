export class UrlBuilder {
	constructor(private readonly url: string) {}

	buildUrl(): string {
		return this.url;
	}
}
