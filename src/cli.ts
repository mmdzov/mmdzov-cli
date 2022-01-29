#! /usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";

const cli = yargs;

cli.scriptName("mmdzov");

cli.command("$0", "main description cli", (yrg) => {
  console.log(chalk.blue("try mmdzov -h to more help"));
});

cli.help("h").alias("h", "help");

cli.argv;
