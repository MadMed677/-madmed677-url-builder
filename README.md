# UrlBuilder

## Intro
A modern Javascript library for NodeJS to build urls to applications

## Installation
```bash
$ npm i --save @madmed677/url-builder
```

__1__ Import into your project
```js
const {ApplicationUrlBuilder} = require('@madmed677/url-builder');
```

__2__: Configure all your routes in one single place. For an example: __routes.js__
```js
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
            pathname: 'transfer/search',
            query: {
                param3: 'val3'
            }
        }
    }
});

module.exports = routes;
```

__3__: After that import your routes and build route by name. For an example: __app.js__
```js
const routes = require('/path/to/routes');

const portalTransferPage = routes
    .application('portal')
    .action('transfer-page')
    .build()
;
// 'https://money.yandex.ru/transfer/'

const portalTransferSearchPage = routes
    .application('portal')
    .action('transfer-search-page')
    .build()
;
// 'https://money.yandex.ru/transfer/search?foo=baz'

const portalTransferSearchQueryPage = routes
    .application('portal')
    .action('transfer-search-page')
    .build({
        query: {
            param1: 'val1',
            param2: 'val2'
        },
        hash: 'some-hash'
    })
;
// 'https://money.yandex.ru/transfer/search?param1=val1&param2=val2&param3=val3#some-hash'
```
