#! /usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import { tenStackResource } from "./ten-stack/ten-stack-resource";
import tenStackInit from "./ten-stack/ten-stack.init";
import tenStackInstall from "./ten-stack/ten-stack.install";
import tenStackUpdate from "./ten-stack/ten-stack.update";
import typingMode from "./utils/typingMode";
import Table from "cli-table";
import autoCommit from "./auto-commit/auto-commit";
import tagTest from "./tag-test/tagTest";
import tag from "./tag/tag";

const cli = yargs;

cli.scriptName("mmdzov");

cli.command(
  "h",
  "mmdzov help",
  () => {},
  () => {
    const head = ["description", "command"];

    const tenStackHelp = new Table({
      head: head,
    });

    tenStackHelp.push(
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
    console.log(tenStackHelp.toString());

    const autoCommitHelp = new Table({
      head,
    });

    autoCommitHelp.push({
      "auto commit": 'mmdzov auto-commit  -s 5 -m "<commit-msg>" --path <dir>',
    });

    console.log("\n");
    console.log(chalk.bold(chalk.blueBright("Auto-Commit")));
    console.log(autoCommitHelp.toString());
    console.log(
      chalk.cyanBright(
        "-s === commit speed/sec , -m === commit message , -p === push speed/sec optional , --path project directory"
      )
    );

    const singleTestHelp = new Table({
      head,
    });

    singleTestHelp.push({
      "single-test": "mmdzov tag --root src --focus spec.ts",
    });

    console.log("\n");
    console.log(chalk.bold(chalk.blueBright("mocha single-test auto-watch")));
    console.log(singleTestHelp.toString());
    console.log(
      chalk.cyanBright(
        `--root === Where should I look for tests ? , --focus === Mark the test file. such as test.ts or spec.ts. For example, the names of all your test files have spec.ts, such as foo.spec.ts or bar.spec.ts
      I need to know what kind of files to look for `
      )
    );
  }
);

tenStackInit(cli);
tenStackResource(cli);
tenStackInstall(cli);
tenStackUpdate(cli);
autoCommit(cli);
tagTest(cli);
tag(cli);

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

cli.argv;
