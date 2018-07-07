# UrlBuilder

## How to use

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
        },
        default: {
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

```js
const routes = require('/path/to/routes');

const portalTransferPage = routes
    .application('portal')
    .action('transfer-page')
    .build()
;
// 'https://money.yandex.ru/transfer/'
```
