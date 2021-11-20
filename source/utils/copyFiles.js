const path = require('path');
const fs = require("fs");
/******************************************
 * Function Tasks - copyFiles
 ******************************************/
function copyFiles(answers, arrayConfig, filePath, outputPath){
    return new Promise((resolve, reject) => {
        const chemin = filePath || path.join(process.cwd(), `${answers.name}/${arrayConfig.githubPath}`);
        const output = outputPath || path.join(process.cwd(), `${answers.name}`);
        fs.readdir(chemin, async (err, files) => {
            if (err) {
                return reject(err);
            }
           for (const file of files) {
               const stats = await fs.statSync(path.join(chemin, file));
               if (stats.isDirectory()) {
                   await fs.mkdirSync(path.join(output, file));
                   await copyFiles(answers, arrayConfig, path.join(chemin, file), path.join(output, file));
               } else {
                   await fs.renameSync(path.join(chemin, file), path.join(output, file));
               }
           }
            resolve();
        })
    })
}
module.exports = copyFiles;