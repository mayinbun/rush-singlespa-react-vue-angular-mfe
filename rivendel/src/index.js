const { getAppsCollection } = require('./db');

const http = require('http');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const SSEClient = require('express-sse');

const sse = new SSEClient();
const port = process.env.PORT || '9999';

const app = express();
app.use(express.json());
app.use(compression())
app.use(cors());

const server = http.createServer(app, (req, res) => {
    let headers = {};
    // IE8 does not allow domains to be specified, just the *
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Credentials'] = false;
    headers['Access-Control-Max-Age'] = '86400'; // 24 hours
    headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
    headers['Content-Type'] = 'text/plain';
    res.writeHead(200, headers);
    res.end();
});

server.listen(port);


app.get('/', (req, res) => {
    res.send({
        app: 'Rivendel API',
    })
})

app.get('/update', (req, res) => {
    const remoteName = req.query.remoteName;
    const remoteVersion = req.query.remoteVersion;
    const remoteEntryFileName = req.query.remoteEntryFileName;
    const remoteWindowProperty = req.query.remoteWindowProperty;
    const remoteLocalUrl = req.query.remoteLocalUrl;
    const remoteCdnUrl = req.query.remoteCdnUrl;

    if (!remoteName || !remoteVersion || !remoteEntryFileName || !remoteWindowProperty) {
        return res.sendStatus(400);
    }

    const collection = getAppsCollection();

    const [found] = getAppsCollection().find({ remoteName });

    if (found) {
        found.remoteVersion = remoteVersion;
        found.remoteEntryFileName = remoteEntryFileName;
        found.remoteWindowProperty = remoteWindowProperty;
        found.remoteLocalUrl = remoteLocalUrl;
        found.remoteCdnUrl = remoteCdnUrl;

        collection.update(found);
    } else {
        collection.insert({
            remoteName,
            remoteVersion,
            remoteEntryFileName,
            remoteWindowProperty,
            remoteLocalUrl,
            remoteCdnUrl,
        })
    }

    sse.send(getAppsCollection().find());

    return res.send({
        message: 'remote updated',
    })
})

app.get('/versions', (req, res) => {
    const result = getAppsCollection().find();

    res.send(result);
})

app.get('/sse', (req, res) => {
    sse.init(req, res);
    sse.send(getAppsCollection().find());
});
