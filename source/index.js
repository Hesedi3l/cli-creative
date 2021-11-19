#! /usr/bin/env node

const inquirer = require('inquirer');
const randomNameGenerator = require('./utils/randomNameGenerator')
/******************************************
 * Require - Configs
******************************************/
const reactConfig = require('./config/reactConfig');
const nextConfig = require('./config/nextConfig');
const createDirectory = require('./utils/createDirectory.js')
const fromScratchConfig = require('./config/fromScratchConfig');


/******************************************
 * Principal Build
 ******************************************/

async function buildConfig() {
    const answers = await inquirer
        .prompt([
            {
                type: 'text',
                name: 'name',
                message: 'Quel est le nom du projet ?',
                default: randomNameGenerator,
            },
            {
                type: 'list',
                name: 'type',
                message: 'Quel est le type du projet ?',
                choices: [
                    'react',
                    'next',
                    'from-scratch',
                    'projet-vide',
                ],
            }
        ]);
    switch (answers.type){
        case 'react':
            await reactConfig(answers);
            break;
        case 'next':
            await nextConfig(answers);
            break;
        case 'from-scratch':
            await fromScratchConfig(answers);
            break;
        case 'projet-vide':
            await createDirectory(answers);
            break;
        default:
            break;
    }
}
buildConfig();
