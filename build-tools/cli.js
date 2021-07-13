#!/usr/bin/env node

const yargs = require('yargs')
const { readFile } = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const { hideBin } = require('yargs/helpers')

yargs(hideBin(process.argv))
    .command('update', 'update the app version', (yargs) => {
        return yargs
            .option('be', {
                alias: ('backend-url'),
                default: 'http://localhost:9999',
                type: 'string',
                describe: 'name of the remote app',
            })
            .option('n', {
                alias: ('name'),
                demand: true,
                type: 'string',
                describe: 'name of the remote app',
            })
            .option('uv', {
                alias: ('update-version'),
                type: 'string',
                describe: 'version to update the app to',
            })

    }, async (argv) => {
        const name = argv.name;
        const backendApiUrl = argv.be;

        const packageJsonPath = path.resolve(__dirname, 'package.json');

        try {
            const buffer = await readFile(packageJsonPath);
            const pkg = JSON.parse(buffer);

            const version = argv.version || pkg.version;

            await fetch(`${ backendApiUrl }/update?name=${ name }&version=${ version }`);
        } catch (e) {
            console.error('build-tools:cli.js::update:error', e);
        }
    })
    .argv
