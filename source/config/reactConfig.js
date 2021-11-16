function reactConfig(answers){
    const { exec } = require("child_process");
    exec(`npx create-react-app ${answers.name}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`\x1b[32mApplication prête a l'emploi\x1b[0m`);
    });
}

module.exports = reactConfig;