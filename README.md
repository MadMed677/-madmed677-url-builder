# UrlBuilder

## How to use

__1__: Configure all your routes in one single place. For an example: __routes.js__

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
            pathname: 'transfer/search'
        }
    }
});

module.exports = routes;
```

__2__: After that import your routes and build route by name. For an example: __app.js__
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
// 'https://money.yandex.ru/transfer/search'

const portalTransferSearchQueryPage = routes
    .application('portal')
    .action('transfer-search-page')
    .build({
        query: {
            param1: 'val1',
            param2: 'val2'
        }
    })
;
// 'https://money.yandex.ru/transfer/search?param1=val1&param2=val2'
```
