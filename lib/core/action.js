const { promisify } = require("util")

const download = promisify(require("download-git-repo"))

const { vueRepo } = require("../config/repo-config")
const { commandSpawn } = require("../utils/terminal")

const createProjectAction = async (project) => {
    console.log('YYN now helps you to create a project!');
    //1.clone项目
    await download(vueRepo, project, { clone: true }).catch(err => console.log(err))

    //2.执行npm install
    const command = process.platform === "win32" ? 'npm.cmd' : 'npm'
    await commandSpawn(command, ['install'], { cwd: `./${project}` }).catch(err => console.log(err))

    //3.执行 npm run serve
    //4.打开浏览器
}

module.exports = {
    createProjectAction
}