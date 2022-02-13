import { join } from "path";
import fs from "fs";
import shell from "shelljs";

const getAllNestedFiles = (rootDir: string, filePattern: string) => {
  const focusDir = fs.readdirSync(join(shell.pwd().stdout, rootDir));
  const specFiles: string[] = [];
  const searchNestedDirs = (dirs: string[]) => {
    let i: any;
    for (i in dirs) {
      const dir = dirs[i];
      const dirpath = join(shell.pwd().stdout, rootDir, dir);

      if (dir.includes(filePattern)) {
        specFiles.push(dirpath);
        return;
      } else if (dir.includes(".")) continue;

      const lastIndex = dirs.findIndex((item) => item?.includes(dir));

      let nestedDirs = fs.readdirSync(dirpath);
      nestedDirs = nestedDirs.map((item: string) => {
        item = `${dirs[lastIndex]}/${item}`;
        return item;
      });

      searchNestedDirs(nestedDirs);
    }
  };

  searchNestedDirs(focusDir);

  return specFiles;
};

export default getAllNestedFiles;
