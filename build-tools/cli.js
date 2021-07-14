#!/usr/bin/env node

const yargs = require('yargs')
const fetch = require('node-fetch');
const { hideBin } = require('yargs/helpers')
const { createRemoteMetaFromPackage } = require('./util');

yargs(hideBin(process.argv))
    .command('update-remote', 'updates the remote app version', (yargs) => {
        return yargs
            .option('be', {
                alias: ('api-url'),
                default: 'http://localhost:9999',
                type: 'string',
                describe: 'name of the remote app',
            })
            .option('rv', {
                alias: ('remote-version'),
                type: 'string',
                describe: 'version to update the remote app to',
            })

    }, async (argv) => {
        const backendApiUrl = argv.be;

        try {
            const meta = createRemoteMetaFromPackage();

            const result = await fetch(`${ backendApiUrl }/update?remoteName=${ meta.remoteName }&remoteVersion=${ meta.remoteVersion }&remoteEntryFileName=${ meta.remoteEntryFileName }&remoteWindowProperty=${ meta.remoteWindowProperty }&remoteLocalUrl=${meta.remoteLocalUrl}&remoteCdnUrl=${meta.remoteCdnUrl}`);

            if(result.status >= 400) {
                throw `got invalid http response code ${result.status} while trying to update remote "${meta.remoteName}"`;
            }

            console.info(`remote app "${ meta.remoteName }" updated to version "${ meta.remoteEntryFileName }"`);
        } catch (e) {
            console.error('build-tools::cli.js__ERROR:', e);
        }
    })
    .argv
