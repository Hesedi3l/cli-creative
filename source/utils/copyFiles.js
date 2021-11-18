const path = require('path');
const fs = require("fs");
/******************************************
 * Function Tasks - copyFiles
 ******************************************/
function copyFiles(answers, arrayConfig, filePath, outputPath){
    return new Promise((resolve, reject) => {
        const chemin = filePath || path.join(process.cwd(), `${answers.name}/${arrayConfig.githubPath}`);
        const output = outputPath || path.join(process.cwd(), `${answers.name}`);
        console.log(chemin)
        fs.readdir(chemin, (err, files) => {
            if (err) {
                return reject(err);
            }
            files.forEach(async file => {
                const stats = await fs.statSync(path.join(chemin, file));
                if (stats.isDirectory()) {
                    await fs.mkdirSync(path.join(output, file));
                    copyFiles(answers, path.join(chemin, file), path.join(output, file))
                } else{
                    await fs.renameSync(path.join(chemin, file), path.join(output, file));
                }
            })
            resolve();
        })
    })
}
module.exports = copyFiles;