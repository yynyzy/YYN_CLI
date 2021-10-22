const { promisify } = require("util")

const download = promisify(require("download-git-repo"))
const open = require("open")

const { vueRepo } = require("../config/repo-config")
const { commandSpawn } = require("../utils/terminal")
const { compile, writeToFile, createDirSync } = require("../utils/utils")
const createProjectAction = async (project) => {
    console.log('YYN now helps you to create a project!');
    //1.clone项目
    await download(vueRepo, project, { clone: true }).catch(err => console.log(err))

    //2.执行npm install
    const command = process.platform === "win32" ? 'npm.cmd' : 'npm'
    await commandSpawn(command, ['install'], { cwd: `./${project}` }).catch(err => console.log(err))

    //3.执行 npm run serve
    commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` }).catch(err => console.log(err))
    //4.打开浏览器
    open('http://localhost:8080')
}
//1.有对应的ejs模板
const addCpnAction = async (name, dest) => {
    //2.编译ejs模板
    const result = await compile("vue-component.ejs")
    //3.将result写入 .vue 文件中

    const targetPath = path.resolve(dest, `${name}`.vue)
    writeToFile(targetPath, result)


}

const addPageAndRoute = async (name, dest) => {
    const data = { name, lowerName: name.toLowerCase() }
    const pageResult = await compile('vue-component.ejs', data)
    const routeResult = await compile('vue-router.ejs', data)

    if (createDirSync(dest)) {
        const targetpagePath = path.resolve(dest, `${name}.vue`)
        const targetRoutePath = path.resolve(dest, 'router.js')
        writeToFile(targetpagePath, pageResult)
        writeToFile(targetRoutePath, routeResult)
    }

}

module.exports = {
    createProjectAction,
    addCpnAction,
    addPageAndRoute
}