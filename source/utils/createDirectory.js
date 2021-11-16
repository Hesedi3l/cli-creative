function createDirectory(answers){
    const fs = require("fs");
    const dir = answers.name;
    fs.mkdir(dir, (err) => {
        if (err) {throw err;}
    });
}
module.exports = createDirectory;