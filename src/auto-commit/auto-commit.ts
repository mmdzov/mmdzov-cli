import { Argv } from "yargs";
import shell from "shelljs";
import { join } from "path";
import chalk from "chalk";
import fs from "fs";

const autoCommit = (cli: Argv<{}>) => {
  cli.command(
    "auto-commit [options]",
    "auto commit",
    () => {},
    (yrg) => {
      if (!yrg._.includes("auto-commit")) return;
      const { s: speed, p: pushSpeed, m: message, path } = yrg;
      if (!path) {
        console.log(chalk.redBright("path not defined --path=yourpath"));
        return;
      }

      shell.cd("/");
      shell.cd(join(path as string));

      const currentPath = shell.pwd().stdout;

      const file1 = `test1.txt`;
      const file2 = `test2.txt`;

      const removeFile = async (file: string) => {
        const os = process.platform;

        if (os.includes("win")) shell.exec(`del ${file}`, { silent: true });
        if (os.includes("linux")) shell.exec(`rm ${file}`, { silent: true });
      };

      setInterval(() => {
        if (fs.existsSync(join(currentPath, `/${file1}`))) {
          removeFile(file1);
          shell.touch(`${file2}`);
        } else if (fs.existsSync(join(currentPath, `/${file2}`))) {
          removeFile(file2);
          shell.touch(`${file1}`);
        } else shell.touch(`${file1}`);

        if (!pushSpeed) {
          shell.exec(
            `git add . & git commit -m \"${message}\" & git push -u origin main`,
            { silent: true }
          );
        }
      }, +(speed as number) * 1000);

      if (pushSpeed) {
        setInterval(() => {
          shell.exec(
            `git add . & git commit -m \"${message}\" & git push -u origin main`,
            { silent: true }
          );
        }, +(pushSpeed as number) * 1000);
      }
    }
  );
};

export default autoCommit;
