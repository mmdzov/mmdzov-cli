import { Argv } from "yargs";
import shell from "shelljs";
import globalInstall from "../utils/globalInstall";
import { join } from "path";

const tenStackInstall = (cli: Argv<{}>) => {
  cli.command(
    "i ten",
    "globally install ten-stack-starter",
    () => {},
    async (yargs) => {
      const path = await globalInstall(
        "$ten-stack",
        "https://github.com/mytls/ten-stack-starter.git"
      );
      shell.cd("/");
      shell.cd(path);
    }
  );
};

export default tenStackInstall;
