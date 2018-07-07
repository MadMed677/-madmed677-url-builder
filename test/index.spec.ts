import {UrlBuilder} from '../src';

describe('UrlBuilderService', () => {
    describe('UrlBuilder', () => {
        it('should run ".buildUrl" method succeessful', () => {
            const urlBuilder = new UrlBuilder('https://my-awesome-url.com');

            expect(urlBuilder.buildUrl().toString()).toBe('https://my-awesome-url.com/');
        });
    });
});
