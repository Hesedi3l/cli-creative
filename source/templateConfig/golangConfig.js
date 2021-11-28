const inquirer = require("inquirer");

const serverConfig = require("../config/golang/goLangServerConfig");

async function golangConfig(answers){
    const answersTemplate = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'type',
                message: 'Quelle template utiliser pour votre projet ?',
                choices: [
                    'webServer',
                ],
            }
        ]);

    switch (answersTemplate.type) {
        case 'webServer':
            await serverConfig(answers);
            break;
        default:
            break;
    }
}

module.exports = golangConfig;