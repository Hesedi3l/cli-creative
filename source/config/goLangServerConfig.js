const { Listr } = require('listr2');
const fs = require("fs");
const path = require('path');
/******************************************
 * Function Tasks - Import
 ******************************************/
const waitTask = require('../utils/waitTask')
const cloneRepo = require('../utils/cloneRepo')
const copyFiles = require('../utils/copyFiles')
const deleteFiles = require("../utils/deleteFiles");

const arrayConfig = {
    github: 'https://github.com/Hesedi3l/cli-creative',
    githubPath : 'source/template/goServer',
    mainDir: 'source',
    fileDelete: ['.gitignore', 'package.json', 'package-lock.json', 'README.md'],
}


function goLangServerConfig(answers){
    const tasks = new Listr(
        [
            {
                title: 'Build test-app ...',
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
        ],
        {
            concurrent: false
        }
    )
    tasks.run();
}





module.exports = goLangServerConfig;