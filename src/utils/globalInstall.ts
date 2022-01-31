import chalk from "chalk";
import shell from "shelljs";
import asyncExec from "./asyncExec";
import cliPath from "./cliPath";
import Spinner from "./Spinner";
import fs from "fs";
import { join } from "path";
import { Ora } from "ora";

const globalInstall = async (
  dir: string,
  repo: string,
  config: { noSpinner?: boolean } = {
    noSpinner: false,
  }
) => {
  let spinner: Ora;
  if (!config.noSpinner) {
    spinner = new Spinner().start("Installing");
  }
  const projectPath = shell.pwd().stdout;
  const clipath = cliPath();
  fs.rmSync(join(clipath, `/$${dir}`), { recursive: true, force: true });
  shell.mkdir(["$" + dir]);
  await asyncExec(`degit ${repo} $${dir}`);
  if (!config.noSpinner) {
    (spinner! as Ora).stop();
    console.log(chalk.magentaBright("Installed Successfully"));
  }
  return projectPath;
};

export default globalInstall;
