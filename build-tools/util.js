const path = require('path');
const fs = require('fs');

function getPackageJsonPath() {
    return path.resolve(process.cwd(), 'package.json');
}

function sanitizeUrl(url) {
    return url.endsWith('/') ? url : url + '/'
}

function createRemoteMetaFromPackage() {
    try {
        const pkg = JSON.parse(fs.readFileSync(getPackageJsonPath()));

        if(!pkg.remoteLocalUrl) {
            throw 'please define custom property "remoteLocalUrl" in your remotes package.json';
        }

        if(!pkg.remoteCdnUrl) {
            throw 'please define custom property "remoteCdnUrl" in your remotes package.json';
        }

        return {
            remoteName: pkg.name,
            remoteVersion: pkg.version,
            remoteEntryFileName: `remoteEntry_${ pkg.name }_${ pkg.version }.js`,
            remoteWindowProperty: `__remote__${pkg.name}__`,
            remoteLocalUrl: sanitizeUrl(pkg.remoteLocalUrl),
            remoteCdnUrl: sanitizeUrl(pkg.remoteCdnUrl)
        }

    } catch (e) {
        throw e;
    }
}


exports.getPackageJsonPath = getPackageJsonPath;
exports.createRemoteMetaFromPackage = createRemoteMetaFromPackage;
exports.sanitizeUrl = sanitizeUrl;
