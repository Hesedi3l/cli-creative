const path = require('path');
const fs = require("fs");
const { exec } = require("child_process");

/******************************************
 * Function Tasks - installDependencies
 ******************************************/
function installDependencies(answers, arrayConfig){
    return new Promise((resolve, reject) => {
        exec(`cd ${answers.name} && npm install ${arrayConfig.dependenciesInstall.join(' ')}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return reject(error);
            }
            if (stderr) {
                return reject(error);
            }
            console.log(`stdout: ${stdout}`);
            resolve();
        });
    })
}

module.exports = installDependencies;