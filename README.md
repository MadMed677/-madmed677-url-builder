# UrlBuilder

## How to use

1. Configure all your routes in one single place. For an example: __routes.js__
```js

const urlBuilder = new UrlBuilder({
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

module.exports = routes;
```

2. After that import your routes and build route by name. For an example: __app.js__
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
// 'https://money.yandex.ru/transfer/search/'

const portalTransferSearchQueryPage = routes
    .application('portal')
    .action('transfer-search-page')
    .query({
        param1: 'val1',
        param2: 'val2'
    })
    .build()
;
// 'https://money.yandex.ru/transfer/search/?param1=val1&param2=val2'
```
