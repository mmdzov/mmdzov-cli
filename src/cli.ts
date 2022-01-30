#! /usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import tenStackInit from "./ten-stack/ten-stack.init";
import typingMode from "./utils/TypingMode";

const cli = yargs;

cli.scriptName("mmdzov");

cli.command(
  "$0",
  "main description cli",
  (yrg) => {},
  () => {
    const word = "try mmdzov -h to more help";
    typingMode(word);
  }
);

tenStackInit(cli);

cli.help("h").alias("h", "help");

cli.argv;
