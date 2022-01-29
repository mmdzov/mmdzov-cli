#! /usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import shell from "shelljs";

const cli = yargs;

cli.scriptName("mmdzov");

cli.command("$0", "main description cli", (yrg) => {
  console.log(chalk.blue("try mmdzov -h to more help"));
});

cli.command(
  "$0 use ten-stack <repo-name>",
  "install ten-stack-starter",
  (yrg) => {},
  (args) => {
    shell.exec(
      `degit https://github.com/mytls/ten-stack-starter.git ${args.repoName}`
    );
  }
);

cli.help("h").alias("h", "help");

cli.argv;
