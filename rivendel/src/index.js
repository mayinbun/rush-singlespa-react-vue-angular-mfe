const { getAppsCollection } = require('./db');

const cors = require('cors');
const express = require('express');
const SSE = require('express-sse');
const bodyparser = require('body-parser');

const port = process.env.PORT || '9999';
const app = express();

app.use(bodyparser.json());
app.use(cors());

const sse = new SSE();

app.get('/', (req, res) => {
    res.send({
        app: 'Rivendel API',
    })
})

app.get('/update', (req, res) => {
    const name = req.query.name;
    const version = req.query.version;

    if (!name || !version) {
        return res.sendStatus(400);
    }

    const collection = getAppsCollection();

    const [found] = getAppsCollection().find({ name });

    if (found) {
        found.version = version

        collection.update(found);
    } else {
        collection.insert({
            name,
            version,
        })
    }

    sse.send(getAppsCollection().find());

    return res.send({
        name,
        version,
        message: 'version updated',
    })
})

app.get('/versions', (req, res) => {
    const result = getAppsCollection().find();

    res.send(result);
})

app.get('/events', (req, res) => {
    sse.init(req, res);
    sse.send(getAppsCollection().find());
});

app.listen(port, () => {
    console.info(`Rivendel running on: ${ port }`);
})
