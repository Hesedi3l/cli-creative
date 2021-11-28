const inquirer = require("inquirer");

const reactConfig = require("../config/javascript/reactConfig");
const nextConfig = require("../config/javascript/nextConfig");
const apiConfig = require("../config/javascript/apiConfig");

async function javascriptConfig(answers){
    const answersTemplate = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'type',
                message: 'Quelle template utiliser pour votre projet ?',
                choices: [
                    'react',
                    'next',
                    'apiExpress',
                ],
            }
        ]);

    switch (answersTemplate.type) {
        case 'react':
            await reactConfig(answers);
            break;
        case 'next':
            await nextConfig(answers);
            break;
        case 'apiExpress':
            await apiConfig(answers);
            break;
        default:
            break;
    }
}

module.exports = javascriptConfig;