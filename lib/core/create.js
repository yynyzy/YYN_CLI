const program = require('commander')
const { createProjectAction, addCpnAction, addPageAndRoute } = require('./action')

module.exports = createCommand = () => {
    program.
        command('create <project> [others...]')
        .description('clone repository')
        .action(
            createProjectAction
        )

    program.
        command('addcpn <name>')
        .description('add vue component')
        .action((name) => {
            addCpnAction(name, program.dest || 'src/components')
        }
        )

    program.
        command('addPage <page>')
        .description('add page')
        .action((page) => {
            addPageAndRoute(page, program.dest || 'src/pages')
        }
        )
}