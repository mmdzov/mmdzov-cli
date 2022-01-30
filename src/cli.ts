#! /usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import shell from "shelljs";
import fs from "fs";
import path from "path";
import { Spinner } from "cli-spinner";

const cli = yargs;

const spin = (title: string): Spinner => {
  const s = new Spinner(`${title}... %s`);
  s.setSpinnerString(1);
  return s;
};

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

    let clonePath = "";
    const clone = spin("cloning project");
    clone.start();
    if ((args?.projectName as string).match(/^[.]$/)) {
      shell.exec("git clone https://github.com/mytls/ten-stack-starter.git .");
      clonePath = "here";
    } else {
      shell.exec(
        `degit https://github.com/mytls/ten-stack-starter.git ${args.projectName}`
      );
      clonePath = args?.projectName! as string;
    }
    clone.stop(true);

    if (clonePath !== "here") shell.cd(clonePath);

    const installModules = spin("installing dependencies");

    installModules.start();
    shell.exec("npm i");
    installModules.stop(true);

    const overwriteFiles = spin("overwriting package.json");
    overwriteFiles.start();
    const pwdChunks = shell.pwd().stdout.split("\\");
    const route = path.join(shell.pwd().stdout, "/package.json");
    const result = fs.readFileSync(route).toString();
    const packageJson = JSON.parse(result);
    packageJson.name = pwdChunks[pwdChunks.length - 1];
    delete packageJson.repository;
    delete packageJson.bugs;
    delete packageJson.homepage;
    packageJson.author = "";
    fs.writeFileSync(route, JSON.stringify(packageJson));
    shell.exec("npm run pretty");
    overwriteFiles.stop(true);

    const initProject = spin("initializing project");

    initProject.start();
    shell.mkdir(["dist"]);
    shell.exec("tsc");
    initProject.stop(true);

    console.log(chalk.blue("Happy Hacking :)"));
  }
);

cli.help("h").alias("h", "help");

cli.argv;
