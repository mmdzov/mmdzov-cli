import { Argv } from "yargs";
import shell from "shelljs";
import path, { join } from "path";
import asyncExec from "../utils/asyncExec";
import fs from "fs";
import https from "https";
import { cwd } from "process";
import cliPath from "../utils/cliPath";
import copyAllFiles from "./../utils/copyAllFiles";
import Spinner from "../utils/Spinner";
import chalk from "chalk";
import addAppRoute from "../utils/addAppRoute";

const tenStackResource = (cli: Argv<{}>) => {
  cli.command(
    "ten res <res-name>",
    "generate ten-stack resource",
    async () => {},
    (args: any) => {
      const spinner = new Spinner().start("Generating Resource");
      const projectPath = shell.pwd().stdout;
      const clipath = cliPath();
      const srcpath = join(clipath, "/$ten-stack/src/components/home");
      copyAllFiles(
        srcpath,
        join(`${projectPath}/src/components/`, args?.resName)
      );
      spinner.stop();

      const projectRoot = join(`${projectPath}/src/app.ts`);

      const pth = join(`${projectPath}/src/app.ts`);
      const app = fs.readFileSync(pth).toString();
      if (app.includes(`${args?.resName}.route`)) return;
      let result = addAppRoute(app, args?.resName);

      fs.writeFileSync(pth, result);

      shell.cd("/");

      shell.cd(join(projectPath));

      console.log(projectRoot);

      shell.exec(
        "npm run pretty",
        {
          silent: true,
        },
        (code, stdout, stderr) => {
          console.log(chalk.magenta("Resource Was Generated"));
        }
      );
    }
  );
};

export { tenStackResource };
