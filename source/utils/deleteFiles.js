const path = require('path');
const fs = require("fs");
/******************************************
 * Function Tasks - deleteFiles
 ******************************************/
function deleteFiles(answers, arrayConfig){
    return new Promise((resolve, reject) => {
        fs.readdir(answers.name, (err, files)=>{
            if (err) {
                return reject(err);
            }
            files.forEach(file => {
                if (file !== `${arrayConfig.mainDir}` && file !== `.git`){
                    fs.unlinkSync(path.join(process.cwd(), `${answers.name}/${file}`))
                }
            })
            fs.readdir(`${answers.name}/${arrayConfig.githubPath}`, (err, files)=>{
                if (err) {
                    return reject(err);
                }
                files.forEach(file => {
                    if (arrayConfig.fileDelete.includes(file))
                        fs.unlinkSync(path.join(process.cwd(), `${answers.name}/${arrayConfig.githubPath}/${file}`))
                })
                resolve();
            })
        })
    })
}

module.exports = deleteFiles;