import { Argv } from "yargs";
import shell from "shelljs";
import path from "path";
import asyncExec from "../utils/asyncExec";
import fs from "fs";
import https from "https";
import { cwd } from "process";

var download = function (url: string, dest: string, cb = () => {}) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function (res: any) {
    res.pipe(file);
    file.on("finish", function () {
      file.close(cb);
    });
  });
};

const tenStackResource = (cli: Argv<{}>) => {
  cli.command(
    "ten res <res-name>",
    "add ten-stack resource",
    async () => {},
    (args: any) => {
      // const route = path.join(shell.pwd().stdout, "/src");
      // console.log(route, args);
      // download("https://github.com/mmdzov/mmdzov-cli/archive/refs/heads/main.zip",)
      console.log(cwd(), __dirname);
      // shell.cd("src");
      // shell.cd("components");
      // shell.mkdir(args?.resName);
      // shell.cd(args?.resName);
    }
  );
};

export default tenStackResource;
