import {Feed, FeedStatus} from "./schema/Feed";
import {User} from "./schema/User";

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
    const user = req.body;
    try {
        pusher.trigger('counter', 'count', [user]);
    } catch (e) {
    }
    res
        .status(200)
        .send({message: 'User was select', status: true});
});

app.post('/counter', (req, res) => {
    const usr: User[] = req.body.usr;
    try {
        pusher.trigger('counter', 'count', usr);
    } catch (e) {
    }
    res
        .status(200)
        .send({message: 'counter change', status: true});
});

app.post('/submit', (req, res) => {
    const msg: Feed = req.body.msg;
    try {
        pusher.trigger('feeds', 'posts', msg);
    } catch (e) {
    }

    res
        .status(200)
        .send({message: 'Post was submit', status: true});
});