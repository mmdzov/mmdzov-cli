import chalk from "chalk";
import shell from "shelljs";
import asyncExec from "./asyncExec";
import cliPath from "./cliPath";
import Spinner from "./Spinner";

const globalInstall = async (dir: string, repo: string) => {
  const spinner = new Spinner().start("Installing");
  cliPath();
  shell.mkdir([dir]);
  shell.cd(dir);
  await asyncExec(`git clone ${repo} .`);
  spinner.stop();
  console.log(chalk.magentaBright("Installed Successfully"));
  shell.exit(1);
};

export default globalInstall;
