#! /usr/bin/env node

import { Argv } from "yargs";
import shell from "shelljs";
import Spinner from "../utils/Spinner";
import chalk from "chalk";
import { exec, ExecOptions } from "child_process";
import path from "path";
import fs from "fs";
import typingMode from "../utils/TypingMode";

const spin = new Spinner();

function asyncExec(cmd: string, options: Partial<ExecOptions> = {}) {
  return new Promise((res, rej) => {
    exec(cmd, options, (err, stdout, stderr) => {
      if (err) rej(err);
      res(stdout ? stdout : stderr);
    });
  });
}

const cloneProject = async (args: any) => {
  let clonePath = "";

  const spinner = spin.start("Cloning project");
  if ((args?.projectName as string).match(/^[.]$/)) clonePath = "here";
  else clonePath = args?.projectName! as string;

  try {
    await asyncExec(
      `degit https://github.com/mytls/ten-stack-starter.git ${args.projectName}`,
      { windowsHide: true }
    );
    if (clonePath !== "here") shell.cd(clonePath);

    spinner.stop();
    console.log(chalk.green("Successfully Cloned"));
  } catch (e: any) {
    spinner.stop();
    console.log(chalk.red("maybe directory is not empty"));
    console.warn(e);
  }
  return clonePath;
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
  console.log(chalk.green("Dependencies successfully installed"));
};

const tenStackInit = (cli: Argv<{}>) => {
  cli.command(
    "use ten-stack <project-name>",
    "install ten-stack-starter",
    (yrg) => {},
    async (args) => {
      if (!args?.projectName) {
        console.log(chalk.red("please send valid project name"));
        return;
      }

      let clonePath = "";

      clonePath = await cloneProject(args);
      await initGit();
      await installDeps();
      const overwriteSpin = spin.start("Overwriting package.json");
      const pwdChunks = shell.pwd().stdout.split("\\");
      const route = path.join(shell.pwd().stdout, "/package.json");
      const result = fs.readFileSync(route).toString();
      const packageJson = JSON.parse(result);
      const projectName =
        clonePath === "here" ? pwdChunks[pwdChunks.length - 1] : clonePath;
      packageJson.name = projectName;
      delete packageJson.repository;
      delete packageJson.bugs;
      delete packageJson.homepage;
      packageJson.author = "";
      fs.writeFileSync(route, JSON.stringify(packageJson));
      await asyncExec("npm run pretty");
      overwriteSpin.stop();
      console.log(chalk.green("The codes were sorted and cleaned"));

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
