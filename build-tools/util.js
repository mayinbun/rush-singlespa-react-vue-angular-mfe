const path = require('path');
const fs = require('fs');

function getPackageJsonPath() {
    return path.resolve(process.cwd(), 'package.json');
}

function createRemoteMetaFromPackage() {
    try {
        const pkg = JSON.parse(fs.readFileSync(getPackageJsonPath()));

        return {
            remoteName: pkg.name,
            remoteEntryFileName: `remoteEntry_${ pkg.name }_${ pkg.version }.js`,
        }

    } catch (e) {
        throw new Error(e);
    }
}


exports.getPackageJsonPath = getPackageJsonPath;
exports.createRemoteMetaFromPackage = createRemoteMetaFromPackage;
