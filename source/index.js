#! /usr/bin/env node

const inquirer = require('inquirer');
const reactConfig = require('./config/reactConfig');
const nextConfig = require('./config/nextConfig');
const apiConfig = require('./config/apiConfig');
const createDirectory = require('./utils/createDirectory.js')
const fromScratchConfig = require('./config/fromScratchConfig');
const num = 8;
const randomNameGenerator = num => {
    let res = '';
    for(let i = 0; i < num; i++){
        const random = Math.floor(Math.random() * 27);
        res += String.fromCharCode(97 + random);
    };
    return res;
};

async function buildConfig() {
    const answers = await inquirer
        .prompt([
            {
                type: 'text',
                name: 'name',
                message: 'Quel est le nom du projet ?',
                default: randomNameGenerator(num),
            },
            {
                type: 'list',
                name: 'type',
                message: '🐖 Quel est le type du projet ?',
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
            reactConfig(answers);
            break;
        case 'next':
            nextConfig(answers);
            break;
        case 'api-express':
            apiConfig(answers);
            break;
        case 'from-scratch':
            fromScratchConfig(answers);
            break;
        case 'projet-vide':
            createDirectory(answers);
            break;
        default:
            break;
    }
}
buildConfig().then(r => console.log(`\x1b[33mBuild de l'application en cours ... (le build peut prendre quelques minutes)\x1b[0m`));
