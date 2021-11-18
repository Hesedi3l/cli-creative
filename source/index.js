#! /usr/bin/env node

const inquirer = require('inquirer');
const path = require("path");
const randomNameGenerator = require('./utils/randomNameGenerator')
/******************************************
 * Require - Configs
******************************************/
const reactConfig = require('./config/reactConfig');
const nextConfig = require('./config/nextConfig');
const apiConfig = require('./config/apiConfig');
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
                default: randomNameGenerator(),
            },
            {
                type: 'text',
                name: 'directory',
                message: 'Indiquez le chemin du répertoire',
                default: path.basename(process.cwd()),
            },
            {
                type: 'list',
                name: 'type',
                message: 'Quel est le type du projet ?',
                choices: [
                    'react',
                    'next',
                    'api-express',
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
        case 'api-express':
            apiConfig(answers);
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
