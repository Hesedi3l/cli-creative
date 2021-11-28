const inquirer = require("inquirer");

const bootstrapConfig = require("../config/fromScratch/bootstrapConfig");
const bulmaConfig = require("../config/fromScratch/bulmaConfig");
const materializeConfig = require("../config/fromScratch/materializeConfig");
const simpleConfig = require("../config/fromScratch/simpleConfig");

async function fromScratchConfig(answers){
    const answersTemplate = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'type',
                message: 'Quelle template utiliser pour votre projet ?',
                choices: [
                    'simple',
                    'bulma',
                    'bootstrap',
                    'materialize',
                ],
            }
        ]);

    switch (answersTemplate.type) {
        case 'simple':
            await simpleConfig(answers);
            break;
        case 'bulma':
            await bulmaConfig(answers);
            break;
        case 'bootstrap':
            await bootstrapConfig(answers);
            break;
        case 'materialize':
            await materializeConfig(answers);
            break;
        default:
            break;
    }
}

module.exports = fromScratchConfig;