const { Listr } = require('listr2');
const fs = require("fs");
const { exec } = require("child_process");
const path = require('path');




function nextConfig(answers){
    const tasks = new Listr(
        [
            {
                title: 'Construction en cours ...',
                task: (context, task)=> {
                    return task.newListr([
                        {
                            task: async () => {
                                try {
                                    return await installNextCreateApp(answers);
                                } catch (err) {
                                    console.log(err)
                                }
                            }
                        }
                    ],{
                        concurrent: false
                    })
                }
            },
        ],
        {
            concurrent: false
        }
    )
    tasks.run();
}
/******************************************
 * Function Tasks - installDependencies
 ******************************************/
function installNextCreateApp(answers){
    return new Promise((resolve, reject) => {
        exec(`npx create-next-app ${answers.name}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                return;
            }
            console.log(`stdout: ${stdout}`);
            resolve();
        });
    })
}

module.exports = nextConfig;