#! /usr/bin/env node

const inquirer = require('inquirer');
const randomNameGenerator = require('./utils/randomNameGenerator');
/******************************************
 * Require - Configs
******************************************/
const fromScratchConfig = require('./templateConfig/fromScratchConfig');
const javascriptConfig = require('./templateConfig/javascriptConfig');
const golangConfig = require('./templateConfig/golangConfig');
/******************************************
 * Principal Build
 ******************************************/

async function buildConfig() {
    const answers = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Quel est le nom du projet ?',
                default: randomNameGenerator,
            },
            {
                type: 'list',
                name: 'type',
                message: 'Quel est le type du projet ?',
                choices: [
                    'golang',
                    'javascript',
                    'fromScratch',
                ],
            },
        ]);
    switch (answers.type) {
        case 'fromScratch':
            await fromScratchConfig(answers);
            break;
        case 'javascript':
            await javascriptConfig(answers);
            break;
        case 'golang':
            await golangConfig(answers);
            break;
        default:
            break;
    }
}
buildConfig();
