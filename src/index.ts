import * as nativeUrl from 'url';

export class UrlBuilder {
    /** URL instance */
    private _url: URL;

    constructor(url: string) {
        this._url = new nativeUrl.URL(url);
    }

    public buildUrl(): URL {
        return this._url;
    }
}
