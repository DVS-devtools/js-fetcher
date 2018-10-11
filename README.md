## js-fetcher

A simple fetcher class to better window.fetch interface

### Example
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

### Api

#### setTokenGenerator(tokenGenerator: TokenGenerator)
Add a tokenGenerator class to generate the Auth token.
It must have the `generate` method that returns a Promise with the valid token
```javascript
import { TokenGenerator } from '@docomodigital/js-fetcher';
const tokenGenerator = new TokenGenerator({
    url: 'http://api.com/api/auth/refresh',
    clientId: 1,
    clientSecret: 'secret'
});
fetcher.setTokenGenerator(tokenGenerator);
``` 

#### get(url: string, params: any = {}, body: any = {}, parse: boolean = true)
Perform a GET request
```javascript
fetcher.get('/api/v1/users', {page: 1, limit: 10})
    .then(users => {
        // Do something with the json result...
    });
```

#### post(url: string, params: any = {}, body: any = {}, parse: boolean = true)
Perform a POST request
```javascript
fetcher.post('/api/v1/users', {}, { 
    body: JSON.stringify({name: 'foo', email: 'foo@bar.baz' })
}).then(res => {
     // Do something with the json result...
});
```

#### head(url: string, params: any = {}, body: any = {}, parse: boolean = true)
Perform an HEAD request
```javascript
fetcher.head('/api/v1/users')
    .then(res => {
        // Do something with the json result...
    });
```

#### put(url: string, params: any = {}, body: any = {}, parse: boolean = true)
Perform a PUT request
```javascript
fetcher.put('/api/v1/users/1', {}, {name: 'foo'})
    .then(res => {
        // Do something with the json result...
    });
```

#### delete(url: string, params: any = {}, body: any = {}, parse: boolean = true)
Perform a DELETE request
```javascript
fetcher.delete('/api/v1/users/1')
    .then(res => {
        // Do something with the json result...
    });
```