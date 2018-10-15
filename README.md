# js-fetcher

A simple fetcher class to better window.fetch interface

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
 fetcher.get('/v01/users').then(res => res.json());
 fetcher.post('/v01/user', {}, { credentials: 'include', body: JSON.stringify({foo: 'bar'}) });
 
 // Using the token generator:
 const generator = new TokenGenerator({
    url: 'http://api.com/oauth/token',
    clientId: 123,
    clientSecret: 'secret123456789'
 });
 fetcher.setTokenGenerator(generator);
 // Now, before every fetch requests, the library will check if the current Bearer token (if present) is valid and will try to get a new one if necessary.
 // The new token will be used as Authentication: Bearer <Token> header
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