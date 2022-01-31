import chalk from "chalk";
import shell from "shelljs";
import asyncExec from "./asyncExec";
import cliPath from "./cliPath";
import Spinner from "./Spinner";
import fs from "fs";
import { join } from "path";

const globalInstall = async (dir: string, repo: string) => {
  const spinner = new Spinner().start("Installing");
  const projectPath = shell.pwd().stdout;
  const clipath = cliPath();
  fs.rmSync(join(clipath, `/${dir}`), { recursive: true, force: true });
  shell.mkdir([dir]);
  await asyncExec(`degit ${repo} ${dir}`);
  spinner.stop();
  console.log(chalk.magentaBright("Installed Successfully"));
  return projectPath;
};

export default globalInstall;
