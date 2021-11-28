const { Listr } = require('listr2');
const fs = require("fs");
const path = require('path');

/******************************************
 * Function Tasks - Import
 ******************************************/

const waitTask = require('../utils/waitTask');
const deleteFiles = require("../utils/deleteFiles");
const cloneRepo = require('../utils/cloneRepo')
const copyFiles = require('../utils/copyFiles')
const installDependencies = require("../utils/installDependencies");

const arrayConfig = {
    github: 'https://github.com/facebook/create-react-app',
    githubPath : 'packages/cra-template/template',
    mainDir: 'packages',
    fileDelete: ['template.json','README.md'],
    dependenciesInstall: ['react-scripts', 'react', 'react-dom']
}

function reactConfig(answers) {
    const tasks = new Listr(
        [
            {
                title: 'Construction en cours...',
                task: (context, task)=> {
                    return task.newListr([
                        {
                            title: 'Clone repositories',
                            task: async () => {
                                try {
                                    return await cloneRepo(answers, arrayConfig);
                                } catch (err) {
                                    console.log(err)
                                }
                            }
                        },
                        {
                            title: 'Delete all files',
                            task: async () => {
                                try {
                                   await deleteFiles(answers, arrayConfig);
                                } catch (err) {
                                    console.log(err)
                                }
                            }
                        },
                        {
                            title: 'Create package.json',
                            task: async () => {
                                try {
                                    return await createPackageJson(answers);
                                } catch (err) {
                                    console.log(err)
                                }
                            }
                        },
                        {
                            title: 'Copy files',
                            task: async () => {
                                try {
                                    return await copyFiles(answers, arrayConfig);
                                } catch (err) {
                                    console.log(err)
                                }
                            }
                        },
                        {
                            title: 'Remove packages',
                            task: async () => {
                                try {
                                    await waitTask(2);
                                    return await fs.rmSync(path.join(process.cwd(), `${answers.name}/${arrayConfig.mainDir}`), {recursive: true});
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
            {
                title: 'Install dependencies',
                task: async () => {
                    try {
                        return await installDependencies(answers, arrayConfig);
                    } catch (err) {
                        console.log(err)
                    }
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
 * Function Tasks - createPackageJson
 ******************************************/
function createPackageJson(answers){
    return new Promise((resolve, reject) => {
        let package = {
            name: answers.name,
            version: "1.0.0",
            description: "",
            main: "index.js",
            scripts: {
                start: "react-scripts start",
                build: "react-scripts build",
                test: "react-scripts test",
                eject: "react-scripts eject"
            },
            keywords: [],
            author: "",
            license: "ISC",
        }
        fs.writeFile(`${answers.name}/package.json`,JSON.stringify(package, null, 4), (err)=>{
            if (err) {
                console.log(`error: ${err.message}`);
                return reject(err);
            }resolve();
        })
    })
}


module.exports = reactConfig;