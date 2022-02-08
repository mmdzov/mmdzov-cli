import { join } from "path";
import shell from "shelljs";
import fs from "fs";
import cacheTests from "./cacheTests";

const testFiles = (
  dirs: string[],
  specFile: string,
  allowTags: string[],
  { mode }: { mode: "all" | "spec" }
) => {
  let files: any[] = [];
  let filenames: any[] = [];

  dirs.map((dir) => {
    const basePath = shell.pwd().stdout;
    let baseDir: string = "";
    let testFiles: any[] = [];

    if (mode === "all") baseDir = join(basePath, dir.split("*")[0]);
    else {
      const focusDir = join(basePath, dir);
      const allFiles = fs.readdirSync(join(baseDir, focusDir));
      files = allFiles.map((item) => {
        return join(focusDir, item);
      });
      const f = fs.readdirSync(focusDir);
      filenames.push(...f);
      return;
    }

    const dirs = fs
      .readdirSync(baseDir)
      .filter(
        (item) =>
          !item.includes(".ts") &&
          !item.includes(".js") &&
          !item.includes(".json")
      );

    const fetchNestedFiles = (...item: string[]) => {
      let nestedDirs: any[] = [];

      nestedDirs.push(...fs.readdirSync(join(baseDir, ...item)));

      if (nestedDirs.filter((i) => !i.includes(specFile)).length === 0) {
        nestedDirs.map((i) => {
          fetchNestedFiles(...item, i);
        });
        return;
      }
      testFiles.push(
        ...nestedDirs
          .filter((item) => item.includes(specFile as string))
          .map((i) => {
            filenames.push(i);
            return join(baseDir, ...item, i);
          })
      );
    };

    dirs.map((item) => {
      fetchNestedFiles(item);
      return null;
    });

    files.push(...testFiles);
    return { dir, files };
  });

  let tests = cacheTests(files, allowTags);

  return tests;
};

export default testFiles;
