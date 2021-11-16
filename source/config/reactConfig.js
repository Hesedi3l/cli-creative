const path = require("path");

function reactConfig(answers){
    const { exec } = require("child_process");
    let twirlTimer = (function() {
        let P = ["\\", "|", "/", "-"];
        let x = 0;
        return setInterval(function() {
            process.stdout.write("\r" + P[x++]);
            x &= 3;
        }, 250);
    })();
    exec(`npx create-react-app ${answers.name} && cd ${answers.name}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`${twirlTimer}${twirlTimer}${twirlTimer}${twirlTimer}${twirlTimer}${twirlTimer}`)
    });
    console.log(`Votre application est configuré et prête a l'emploie`)
}

module.exports = reactConfig;