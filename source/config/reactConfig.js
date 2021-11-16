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
    });
}

module.exports = reactConfig;