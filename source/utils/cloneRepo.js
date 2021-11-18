/******************************************
 * Function Tasks - cloneRepo
 ******************************************/
const { exec } = require("child_process");

function cloneRepo(answers, arrayConfig){
    return new Promise((resolve, reject) => {
        exec(`git clone --filter=blob:none --no-checkout --depth 1 --sparse ${arrayConfig.github} ${answers.name} && cd ${answers.name} && git sparse-checkout init --cone && git sparse-checkout add ${arrayConfig.githubPath} && git checkout`, (error, stdout, stderr) => {
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

module.exports = cloneRepo;