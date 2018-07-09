import {ApplicationUrlBuilder, Builder} from '../src';

describe('#ApplicationUrlBuilder', () => {
    test('should throw error "Have to pass routes"', () => {
        const urlBuilder = new ApplicationUrlBuilder({
            applications: {
                installments: {
                    protocol: 'https',
                    host: 'kassa.yandex.ru'
                }
            }
        });

        expect(() => {
            urlBuilder.routes({});
        }).toThrowError();
    });

    test('should build routes successful', () => {
        const urlBuilder = new ApplicationUrlBuilder({
            applications: {
                installments: {
                    protocol: 'https',
                    host: 'kassa.yandex.ru'
                },
                checkout: {
                    protocol: 'https',
                    host: 'kassa.yandex.ru'
                },
                portal: {
                    protocol: 'https',
                    host: 'money.yandex.ru'
                }
            }
        });

        const routes = urlBuilder.routes({
            portal: {
                'main-page': {
                    pathname: ''
                },
                'transfer-page': {
                    pathname: 'transfer'
                },
                'transfer-search-page': {
                    pathname: 'transfer/search'
                }
            }
        });

        expect(routes).toEqual([
            {
                applicationName: 'portal',
                routes: [
                    {
                        name: 'main-page',
                        params: {
                            pathname: ''
                        }
                    },
                    {
                        name: 'transfer-page',
                        params: {
                            pathname: 'transfer'
                        }
                    },
                    {
                        name: 'transfer-search-page',
                        params: {
                            pathname: 'transfer/search'
                        }
                    }
                ],
                config: {
                    protocol: 'https',
                    host: 'money.yandex.ru'
                }
            }
        ]);
    });
});
