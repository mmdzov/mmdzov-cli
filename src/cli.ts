#! /usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import shell from "shelljs";
import fs from "fs";
import path from "path";

const cli = yargs;

cli.scriptName("mmdzov");

cli.command("$0", "main description cli", (yrg) => {
  console.log(chalk.blue("try mmdzov -h to more help"));
});

cli.command(
  "$0 use ten-stack <project-name>",
  "install ten-stack-starter",
  (yrg) => {},
  (args) => {
    if (!args?.projectName) {
      console.log(chalk.red("please send valid project name"));
      return;
    }
    if ((args?.projectName as string).match(/^[.]$/)) {
      shell.exec("git clone https://github.com/mytls/ten-stack-starter.git .");
    }
    shell.exec(
      `degit https://github.com/mytls/ten-stack-starter.git ${args.projectName}`
    );
    shell.exec("npm i");
    const pwdChunks = shell.pwd().split("\\");
    const route = path.join(shell.pwd(), "/package.json");
    const result = fs.readFileSync(route).toString();
    const packageJson = JSON.parse(result);
    packageJson.name = pwdChunks[pwdChunks.length - 1];
    delete packageJson.repository;
    delete packageJson.bugs;
    delete packageJson.homepage;
    fs.writeFileSync(route, JSON.stringify(packageJson));
  }
);

cli.help("h").alias("h", "help");

cli.argv;
