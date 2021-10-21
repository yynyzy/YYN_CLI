const program = require('commander')


module.exports = helpOptions = () => {
    program.option('-d --dest <dest>', 'a destination folder,例如： -d /src/components')
    program.option('-f --framework <framework>', 'your framework')

    program.on('--help', function () {
        console.log('Other');
    })
}

