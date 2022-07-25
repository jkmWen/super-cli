#!/usr/bin/env node
// import package from '../package.json';
const chalk = require("chalk");
const { Command } = require("commander");
const minimist = require("minimist");
const { create } = require("../lib/logger");
const package = require("../package.json");

// 获取package.version
const { version } = package;
const program = new Command();

// 定义当前版本
program.version(
    `super-cli: ${version}`,
    "-v, --version",
    "output the current super-cli version"
);

// 定义create命令
program
    .command("create <app-name>")
    .description("Create a new super project.")
    .option("-f, --force", "Overwrite target direstory if it exits")
    .alias("c")
    .action((name, options) => {
        if (minimist(process.argv.slice(3))._.length > 1) {
            const info = `Info: Youo provided more than one argument. The first one will be used as this app's name, this rest are ignored. `
            console.log(chalk.yellow(info));
        }
        create(name, options);
    })

// 解析运行参数（必须且要放在最后一行）
program.parse(process.argv);