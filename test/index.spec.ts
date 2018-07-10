import {ApplicationUrlBuilder, Builder} from '../src';
import {IRoute} from '../src/url-builder.interface';
import {ApplicationBuilder} from '../src/application-builder';

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

        expect(routes).toBeInstanceOf(ApplicationBuilder);
        // expect(routes).toEqual([
        //     {
        //         applicationName: 'portal',
        //         routes: [
        //             {
        //                 name: 'main-page',
        //                 params: {
        //                     pathname: ''
        //                 }
        //             },
        //             {
        //                 name: 'transfer-page',
        //                 params: {
        //                     pathname: 'transfer'
        //                 }
        //             },
        //             {
        //                 name: 'transfer-search-page',
        //                 params: {
        //                     pathname: 'transfer/search'
        //                 }
        //             }
        //         ],
        //         config: {
        //             protocol: 'https',
        //             host: 'money.yandex.ru'
        //         }
        //     }
        // ]);
    });

    test('should build "main-page" action', () => {
        const urlBuilder = new ApplicationUrlBuilder({
            applications: {
                portal: {
                    protocol: 'https',
                    host: 'money.yandex.ru'
                }
            }
        });

        const routes = urlBuilder.routes({
            portal: {
                'main-page': {
                    pathname: '/'
                },
            }
        });

        const buildedUrl = routes.application('portal').action('main-page').build();

        expect(buildedUrl).toBe('https://money.yandex.ru/');
    });

    test('should build "transfer-search-page" action', () => {
        const urlBuilder = new ApplicationUrlBuilder({
            applications: {
                installments: {
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
                'transfer-search-page': {
                    pathname: 'transfer/search'
                }
            }
        });

        const buildedUrl = routes
            .application('portal')
            .action('transfer-search-page')
            .build()
        ;

        expect(buildedUrl).toBe('https://money.yandex.ru/transfer/search');
    });

    test('should build "transfer-search-page" action with query parameters', () => {
        const urlBuilder = new ApplicationUrlBuilder({
            applications: {
                installments: {
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
                'transfer-search-page': {
                    pathname: 'transfer/search'
                }
            }
        });

        const buildedUrl = routes
            .application('portal')
            .action('transfer-search-page')
            .build({
                query: {
                    param1: 'var1',
                    param2: 'var2'
                }
            })
        ;

        expect(buildedUrl).toBe('https://money.yandex.ru/transfer/search?param1=var1&param2=var2');
    });

    test('should build "transfer-search-page" action with query parameters and hash', () => {
        const urlBuilder = new ApplicationUrlBuilder({
            applications: {
                installments: {
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
                'transfer-search-page': {
                    pathname: 'transfer/search'
                }
            }
        });

        const buildedUrl = routes
            .application('portal')
            .action('transfer-search-page')
            .build({
                query: {
                    param1: 'var1',
                    param2: 'var2'
                },
                hash: 'hello-world'
            })
        ;

        expect(buildedUrl).toBe('https://money.yandex.ru/transfer/search?param1=var1&param2=var2#hello-world');
    });

    test('should build "transfer-search-page" action default query parameters', () => {
        const urlBuilder = new ApplicationUrlBuilder({
            applications: {
                installments: {
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
                'transfer-search-page': {
                    pathname: 'transfer/search',
                    query: {
                        param1: 'var1',
                        param2: 'var2'
                    }
                }
            }
        });

        const buildedUrl = routes
            .application('portal')
            .action('transfer-search-page')
            .build({
                hash: 'hello-world'
            })
        ;

        expect(buildedUrl).toBe('https://money.yandex.ru/transfer/search?param1=var1&param2=var2#hello-world');
    });

    test('should build "transfer-search-page" action default query and custom query parameters', () => {
        const urlBuilder = new ApplicationUrlBuilder({
            applications: {
                installments: {
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
                'transfer-search-page': {
                    pathname: 'transfer/search',
                    query: {
                        param1: 'var1',
                        param2: 'var2'
                    }
                }
            }
        });

        const buildedUrl = routes
            .application('portal')
            .action('transfer-search-page')
            .build({
                query: {
                    param3: 'var3'
                },
                hash: 'hello-world'
            })
        ;

        expect(buildedUrl).toBe(
            'https://money.yandex.ru/transfer/search?param1=var1&param2=var2&param3=var3#hello-world'
        );
    });
});
