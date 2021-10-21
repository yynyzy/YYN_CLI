const program = require('commander')
const { createProjectAction } = require('./action')
module.exports = createCommand = () => {
    program.
        command('create <project> [others...]')
        .description('clone repository')
        .action((project, others) => {
            createProjectAction(project)
        })
}