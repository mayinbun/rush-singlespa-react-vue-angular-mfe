const moduleFileName = 'remoteEntry.js';

const gandalfApp = {
    filename: moduleFileName,
    name: 'gandalf',
    port: 5001,
    globalUrlVariable: 'gandalfAppUrl',

    get url() {
      return `//localhost:${this.port}`;
    },
    get federationConfig() {
        return `${this.name}@[window.${this.globalUrlVariable}]/${this.filename}`
    }
}

module.exports = {
    gandalfApp
}
