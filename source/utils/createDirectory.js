function createDirectory(answers){
    const fs = require("fs");
    const dir = answers.name;
    fs.mkdir(dir, (err) => {
        if (err) {throw err;}
        console.log(`Directory [${answers.name}] created.`);
    });
}
module.exports = createDirectory;