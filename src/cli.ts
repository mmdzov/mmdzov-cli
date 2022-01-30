#! /usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import tenStackInit from "./ten-stack/ten-stack.init";
import shell, { config } from "shelljs";

const cli = yargs;

cli.scriptName("mmdzov");

cli.command("$0", "main description cli", (yrg) => {
  console.log(chalk.blue("try mmdzov -h to more help"));
});

tenStackInit(cli);

cli.help("h").alias("h", "help");

cli.argv;
