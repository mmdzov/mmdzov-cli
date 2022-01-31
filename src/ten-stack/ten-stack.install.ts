import { Argv } from "yargs";
import shell from "shelljs";
import Spinner from "./../utils/Spinner";
import chalk from "chalk";
import cliPath from "../utils/cliPath";
import globalInstall from "../utils/globalInstall";

const tenStackInstall = (cli: Argv<{}>) => {
  cli.command(
    "i ten",
    "globally install ten-stack-starter",
    () => {},
    (yargs) => {
      globalInstall(
        "$ten-stack",
        "https://github.com/mytls/ten-stack-starter.git"
      );
    }
  );
};

export default tenStackInstall;
