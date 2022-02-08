import { Argv } from "yargs";
import shell from "shelljs";
import { join } from "path";
import fs from "fs";
import chalk from "chalk";
import testFiles from "./testFiles";
import Spinner from "../utils/Spinner";

const tagTest = (cli: Argv<{}>) => {
  cli.command(
    "tag-test [options]",
    "Tag tests to run one or more specific tests",
    () => {},
    (yrg) => {
      if (yrg?._[0] !== "tag-test") return;
      let spin: any = null;
      if (yrg?.w) {
        console.log(chalk.magentaBright("Running in watch mode"));
      } else spin = new Spinner().start("Wait few moment");

      const cacheDir = join(shell.pwd().stdout, ".cache");
      const cacheTestDir = join(shell.pwd().stdout, ".cache/tests");

      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
      if (!fs.existsSync(cacheTestDir)) fs.mkdirSync(cacheTestDir);

      const execute = () => {
        const tags: string[] = (yrg?.t as string)?.split(",") || [
          yrg?.t as string,
        ];
        console.log(
          `\n${chalk.yellowBright("TAGS")} [ ${chalk.red(tags.join(" , "))} ]\n`
        );
        const spinWait = new Spinner().start("Running");
        const focus = (yrg?.s as string)?.split(",");

        const projectPath = shell.pwd().stdout;

        const notfoundDirs: any[] = [];
        const testPaths = focus
          .filter((item) => !item.includes("*"))
          .map((item) => {
            const dir = join(projectPath, item);
            if (fs.existsSync(dir)) return item;
            notfoundDirs.push(item);
            return null;
          })
          .filter((item) => item);

        if (notfoundDirs.length > 0)
          return console.log(
            `${chalk.yellow("WARNING")} ${chalk.white(
              "These directories were not found :"
            )} [ ${chalk.red(notfoundDirs.join(" , "))} ]`
          );

        const someTestPaths: any[] = focus
          .map((item) => {
            if (item.includes("*")) return item;
            return null;
          })
          .filter((item) => item);

        let tests = [];

        if (someTestPaths.length > 0)
          tests = testFiles(someTestPaths as string[], yrg?.f as string, tags, {
            mode: "all",
          });

        if (testPaths.length > 0)
          tests = testFiles(testPaths as string[], yrg?.f as string, tags, {
            mode: "spec",
          });

        shell.exec(`npm run test`, { silent: true }, (code, stdout, stderr) => {
          spin?.stop();
          spinWait?.stop();
          console.clear();
          const result = stdout
            .split("\n")
            .filter((item) => item)
            .map((item) => item.trim())
            .filter((_, i) => i !== 0 && i !== 1);

          console.log(
            `${chalk.yellowBright("TAGS")} [ ${chalk.red(tags.join(" , "))} ]\n`
          );

          console.log(
            chalk.cyanBright("Results \n\n\n\t"),
            chalk.whiteBright(result.join("\n\n\t").trim())
          );
        });

        return tests;
      };

      let tests = execute();

      if (yrg?.w) {
        (tests as any[]).map((item) => {
          fs.watchFile(item?.endpoint as string, () => {
            console.clear();
            execute();
          });
        });
      }
    }
  );
};

export default tagTest;
