# js-fetcher

[![Build Status](https://travis-ci.com/docomodigital/js-fetcher.svg?branch=master)](https://travis-ci.com/docomodigital/js-fetcher)
[![Coverage Status](https://coveralls.io/repos/github/docomodigital/js-fetcher/badge.svg?branch=master)](https://coveralls.io/github/docomodigital/js-fetcher?branch=master)
[![npm version](https://badge.fury.io/js/%40docomodigital%2Fjs-fetcher.svg)](https://badge.fury.io/js/%40docomodigital%2Fjs-fetcher)
[![Greenkeeper badge](https://badges.greenkeeper.io/docomodigital/js-fetcher.svg)](https://greenkeeper.io/)

A simple fetcher class to better [window.fetch](https://developer.mozilla.org/it/docs/Web/API/Fetch_API) interface

## Usage
```javascript
import Fetcher from '@docomodigital/js-fetcher';

const fetcher = new Fetcher({
    baseURL: 'http://api.com/api/v1',
    options: {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
})

 // set an Authorization header for all requests
 fetcher.options.headers['Authorization'] = 'Bearer <TOKEN>';
 fetcher.get('/v01/users').then(res => res.json());
 fetcher.post('/v01/user', {}, { credentials: 'include', body: JSON.stringify({foo: 'bar'}) });
```


## Installation

### NPM
```bash
npm install --save @docomodigital/js-fetcher
```

## Documentation

To read documentation, go to:

[http://docomodigital.github.io/js-fetcher/latest](http://docomodigital.github.io/js-fetcher/latest)

or run the following command inside the js-fetcher folder: 
```bash
npm run doc:open
```