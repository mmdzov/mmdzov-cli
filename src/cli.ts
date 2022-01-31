#! /usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import tenStackResource from "./ten-stack/ten-stack-resource";
import tenStackInit from "./ten-stack/ten-stack.init";
import tenStackInstall from "./ten-stack/ten-stack.install";
import tenStackUpdate from "./ten-stack/ten-stack.update";
import typingMode from "./utils/typingMode";
import Table from "cli-table";

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
      chalk.italic("mmdzov h")
    )} for full help`;
    typingMode(word);
  }
);

cli.command(
  "h",
  "mmdzov help",
  () => {},
  () => {
    var table = new Table({
      head: ["description", "command"],
    });

    table.push(
      {
        "install ten": "mmdzov i ten",
      },
      {
        "update ten": "mmdzov u ten",
      },
      {
        "initial ten project": "mmdzov use ten <project-name>",
      },
      {
        "resource ten": "mmdzov ten res <resource-name>",
      }
    );

    console.log(chalk.bold(chalk.blueBright("TEN-Stack-Starter")));
    console.log(table.toString());
  }
);

tenStackInit(cli);
tenStackResource(cli);
tenStackInstall(cli);
tenStackUpdate(cli);

cli.argv;
