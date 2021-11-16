const {exec} = require("child_process");
const createDirectory = require('../utils/createDirectory.js')
let fs = require("fs-extra");

function fromScratchConfig(answers){
    createDirectory(answers);
    fs.copy('template/from-scratch', `${answers.name}`, function (err) {
        if (err) return console.error(err)
        console.log(`\x1b[32mApplication prête a l'emploi\x1b[0m`);
    });
}

module.exports = fromScratchConfig;