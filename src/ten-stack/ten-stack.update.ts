import { Argv } from "yargs";
import shell from "shelljs";
import globalInstall from "../utils/globalInstall";

const tenStackUpdate = (cli: Argv<{}>) => {
  cli.command(
    "up ten",
    "globally update ten-stack-starter",
    () => {},
    async (yargs) => {
      const path = await globalInstall(
        "ten-stack",
        "https://github.com/mytls/ten-stack-starter.git"
      );
      shell.cd("/");
      shell.cd(path);
    }
  );
};

export default tenStackUpdate;
