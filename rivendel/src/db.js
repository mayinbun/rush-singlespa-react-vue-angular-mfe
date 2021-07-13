const loki = require('lokijs');

const db = new loki('rivendel.db.json', {
    autoload: true,
    autosave: true,
});

const apps = db.addCollection('apps', {
    exact: ['remoteName', 'remoteVersion', 'remoteEntryFileName', 'remoteWindowProperty', 'remoteLocalUrl', 'remoteCdnUrl'],
    unique: ['remoteName'],
    autoupdate: true,
});


module.exports = {
    db,
    apps,
    getAppsCollection() {
        return db.getCollection('apps');
    },
}
