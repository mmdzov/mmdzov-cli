import { Argv } from "yargs";
import shell from "shelljs";
import path, { join } from "path";
import asyncExec from "../utils/asyncExec";
import fs from "fs";
import https from "https";
import { cwd } from "process";
import cliPath from "../utils/cliPath";

const tenStackResource = (cli: Argv<{}>) => {
  cli.command(
    "ten res <res-name>",
    "add ten-stack resource",
    async () => {},
    (args: any) => {
      const projectPath = shell.pwd();
      const clipath = cliPath();
      const srcpath = join(clipath, "/$ten-stack/src/components/home");
      // shell.cd();
      // const result = fs.cp(srcpath,)
      // console.log(result);
      // const route = path.join(shell.pwd().stdout, "/src");
      // console.log(route, args);
      // download("https://github.com/mmdzov/mmdzov-cli/archive/refs/heads/main.zip",)
      // console.log(cwd(), __dirname);
      // shell.cd("src");
      // shell.cd("components");
      // shell.mkdir(args?.resName);
      // shell.cd(args?.resName);
    }
  );
};

export default tenStackResource;
