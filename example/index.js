import Fetcher from '../src/index.js';

const fetcher = new Fetcher({
    baseURL: 'https://jsonplaceholder.typicode.com'
});


document.getElementById('get').addEventListener('click', (e) => {
    e.preventDefault();
    fetcher.get('/posts', {userId: 1})
        .then(console.log);
});

document.getElementById('post').addEventListener('click', (e) => {
    e.preventDefault();
    const post = {
        title: 'foo',
        body: 'bar',
    };
    fetcher.post('/posts', {}, {body: JSON.stringify(post)})
        .then(console.log);
});

document.getElementById('put').addEventListener('click', (e) => {
    e.preventDefault();
    fetcher.put('/posts/1', {}, {body: JSON.stringify({title: 'foo'})})
        .then(console.log);
});

document.getElementById('delete').addEventListener('click', (e) => {
    e.preventDefault();
    fetcher.delete('/posts/1')
        .then(console.log);
});