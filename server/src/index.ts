const express = require('express');
const app = express();
const port = 3000;
const Pusher = require('pusher');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

let pusher = new Pusher({
    appId: '704604',
    key: 'ab3a30b5502aad545aeb',
    secret: 'be2cd7718d01258d26d6',
    cluster: 'eu',
    encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
    "message": "hello world"
});