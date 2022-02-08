import { importsPattern, tagPattern } from "../utils/patterns";
import shell from "shelljs";
import fs from "fs";
import { join } from "path";

const cacheTests = (files: string[], allowTags: string[]) => {
  let tests: any[] = [];

  files.map((item) => {
    const data = fs.readFileSync(item).toString();
    let getTags: any[] | null = data.match(tagPattern);

    if (getTags) {
      getTags = getTags!.filter((item) => {
        return allowTags.includes(
          item
            .split("\n")[0]
            .replace(/\/\/.*#/, "")
            .trim()
        );
      });
    }

    const imports = data
      .match(importsPattern)!
      .join("\n")
      .split(";")
      .map((item) => item.trim())
      .filter((item) => item);

    let fNameChunks = item.split("\\");
    const filename = fNameChunks[fNameChunks.length - 1].replace(
      "spec",
      "test"
    );
    if (getTags)
      tests.push({
        tests: getTags,
        imports: imports,
        endpoint: item,
        filename,
        cache: join(shell.pwd().stdout, `.cache/tests/${filename}`),
      });
  });

  tests.map((item, i) => {
    try {
      const imports = (item.imports as string[])
        ?.map((imp) => {
          let getEndpoints: string = eval(
            imp.match(/\".*/g)?.join('"').toString()!
          );
          if (!getEndpoints) return null;
          if (getEndpoints?.includes("/")) {
            getEndpoints = join(tests[i].endpoint, "../", getEndpoints);
          }
          imp = imp.replace(
            /\".*/g,
            `\"${getEndpoints.replace(/\\/g, "\\\\")}\";`
          );

          return imp;
        })
        .filter((item) => item);

      const readyToSave = `
              ${imports.join("\n").toString()}

              ${tests[i].tests.join("\n\n").toString()}
              `;

      fs.writeFileSync(item.cache, readyToSave);
    } catch (e) {}
  });

  return tests;
};

export default cacheTests;
