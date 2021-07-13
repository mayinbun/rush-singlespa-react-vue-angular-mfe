#!/usr/bin/env node

const yargs = require('yargs')
const { readFile } = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const { hideBin } = require('yargs/helpers')
const { createRemoteMetaFromPackage } = require('./util');

yargs(hideBin(process.argv))
    .command('update-remote', 'updates the remote app version', (yargs) => {
        return yargs
            .option('be', {
                alias: ('backend-url'),
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

            await fetch(`${ backendApiUrl }/update?name=${ meta.remoteName }&version=${ meta.remoteEntryFileName }`);

            console.info(`remote app "${ meta.remoteName }" updated to version "${ meta.remoteEntryFileName }"`);
        } catch (e) {
            console.error('build-tools:cli.js::update:error', e);
        }
    })
    .argv
