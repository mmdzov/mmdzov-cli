#! /usr/bin/env node

import { Argv } from "yargs";
import shell from "shelljs";
import Spinner from "../utils/Spinner";
import chalk from "chalk";
import path, { join } from "path";
import fs from "fs";
import typingMode from "../utils/typingMode";
import asyncExec from "../utils/asyncExec";
import globalInstall from "../utils/globalInstall";
import { cwd } from "process";

const spin = new Spinner();

const cloneProject = async (args: any) => {
  let clonePath = "";

  const spinner = spin.start("Cloning project");
  if ((args?.projectName as string).match(/^[.]$/)) clonePath = "here";
  else clonePath = args?.projectName! as string;

  const projectPath = shell.pwd().stdout;
  try {
    const repo = "https://github.com/mytls/ten-stack-starter.git";

    await asyncExec(`degit ${repo} ${args.projectName}`, { windowsHide: true });
    await globalInstall("ten-stack", repo, {
      noSpinner: true,
    });

    if (clonePath !== "here") shell.cd(clonePath);
    else if (clonePath === "here") shell.cd(join(projectPath));

    spinner.stop();
    console.log(chalk.green("Successfully Cloned"));
  } catch (e: any) {
    spinner.stop();
    console.log(chalk.red("maybe directory is not empty"));
    console.warn(e);
  }

  return projectPath;
};

const initGit = async () => {
  const os = process.platform;

  if (os.includes("win")) shell.exec("rd /s /q .git", { silent: true });
  if (os.includes("linux")) shell.exec("rm -rf .git", { silent: true });
  shell.exec("git init", { silent: true });
  console.log(chalk.magenta("initialized .git folder"));
};

const installDeps = async () => {
  const spinner = spin.start("Installing dependencies");

  try {
    await asyncExec("npm i");
  } catch (e) {
    spinner.stop();
    console.error(e);
    return;
  }

  spinner.stop();
  console.log(chalk.magenta("Dependencies successfully installed"));
};

const tenStackInit = (cli: Argv<{}>) => {
  cli.command(
    "use ten <project-name>",
    "install ten-stack-starter",
    (yrg) => {},
    async (args) => {
      if (!args?.projectName) {
        console.log(chalk.red("please send valid project name"));
        return;
      }

      let projectPath = "";

      projectPath = await cloneProject(args);
      await initGit();
      await installDeps();
      const overwriteSpin = spin.start("Overwriting package.json");
      const pwdChunks = projectPath.split("\\");
      const route = path.join(shell.pwd().stdout, "/package.json");
      const result = fs.readFileSync(route).toString();
      const packageJson = JSON.parse(result);
      const projectName = pwdChunks[pwdChunks.length - 1];
      packageJson.name = projectName;
      delete packageJson.repository;
      delete packageJson.bugs;
      delete packageJson.homepage;
      packageJson.author = "";
      fs.writeFileSync(route, JSON.stringify(packageJson));
      await asyncExec("npm run pretty");
      overwriteSpin.stop();
      console.log(chalk.magenta("The codes were sorted and cleaned"));

      const initProjectSpin = spin.start("Initializing project");
      shell.mkdir(["dist"]);
      await asyncExec("tsc");
      initProjectSpin.stop();

      await asyncExec(`git add . & git commit -m "Initialized ${projectName}"`);

      typingMode("Happy Hacking :)");
    }
  );
};

export default tenStackInit;
