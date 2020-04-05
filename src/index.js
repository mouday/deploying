#!/usr/bin/env node
/**
 * commander
 * https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md
 */
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const runDeploy = require('./deploy')


program.version('1.0.0')

program
    .command('init')
    .description('init deploy config')
    .action(() => {
        const src = path.join(__dirname, 'deploying-example.json')
        const dest = path.resolve('./deploying.json')

        if (fs.existsSync(dest)) {
            console.log(`file exists : ${dest}`);
        } else {
            fs.copyFileSync(src, dest)
            console.log(`init successful, created ${dest}`);
        }
    })

program
    .command('run [name]')
    .description('run a deploy command by config')
    .action((name) => {
        console.log(name);
        if (name) {
            runDeploy(name)
        } else {
            console.log("run command require param [name]");
        }
    })

program
    .command('list', { isDefault: true })
    .description('list command')

program.parse(process.argv);

