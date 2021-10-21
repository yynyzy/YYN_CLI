#!/usr/bin/env node
const program = require('commander')

const helpOptions = require("./lib/core/help")
const createCommand = require("./lib/core/create")
//查看版本号
program.version(require('./package.json').version)

//帮助和可选信息
helpOptions()

//
createCommand()

program.parse(process.argv)
