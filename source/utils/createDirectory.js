function createDirectory(answers){
    return new Promise(resolve => {
        const fs = require("fs");
        const dir = answers.name;
        fs.mkdir(dir, (err) => {
            if (err) {throw err;}
            resolve();
        });
    })
}
module.exports = createDirectory;