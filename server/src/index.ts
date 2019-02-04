const express = require('express');
const app = express();
const port = 3000;
const Pusher = require('pusher');
const cors = require('cors');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

let pusher = new Pusher({
    appId: '704604',
    key: 'ab3a30b5502aad545aeb',
    secret: 'be2cd7718d01258d26d6',
    cluster: 'eu',
    encrypted: true
});

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.status(200).send({service: 'Pusher activity feed API'});
});

app.post('/change', (req, res) => {
    const userId = req.body.id;
    const data = {
        userId
    };
    pusher.trigger('counter', 'user', data);
    res
        .status(200)
        .send({message: 'User was select', status: true});
});

app.post('/submit', (req, res) => {
    const {body} = req;
    const {text, name} = body; //todo
    pusher.trigger(['feeds', 'counter'], 'posts', {
        text,
        name,
        createdAt: new Date(),
        status: 'ACTIVE' //todo
    });
    res
        .status(200)
        .send({message: 'Post was successfully created', status: true});
});
