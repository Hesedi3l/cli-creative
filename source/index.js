const inquirer = require('inquirer');
const path = require('path');
const reactConfig = require('./config/reactConfig');
const nextConfig = require('./config/nextConfig');
const fs = require('fs')

async function buildConfig() {
    const answers = await inquirer
        .prompt([
            {
                type: 'text',
                name: 'name',
                message: 'Quel est le nom du projet ?',
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
                    'api-nest',
                    'from-scratch',
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
        default:
            break;
    }
}
buildConfig().then(r => console.log(`\x1b[33mBuild de l'application en cours ...(le build peut prendre quelques minutes)\x1b[0m`))