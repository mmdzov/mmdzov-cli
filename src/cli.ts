#! /usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import tenStackResource from "./ten-stack/ten-stack-resource";
import tenStackInit from "./ten-stack/ten-stack.init";
import typingMode from "./utils/typingMode";

const cli = yargs;

cli.scriptName("mmdzov");

cli.command(
  "$0",
  "main description",
  (yrg) => {},
  () => {
    const word = `${chalk.bold(
      chalk.white(`Hi i'm mmdzov`)
    )} I make development and programming very simple. You can try ${chalk.blue(
      chalk.italic("mmdzov help")
    )} for more help`;
    typingMode(word);
  }
);

tenStackInit(cli);
tenStackResource(cli)


cli.help("h").alias("h", "help");

cli.argv;
