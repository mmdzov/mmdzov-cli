#!/usr/bin/env node

/* eslint-disable regexp/prefer-plus-quantifier */
/* eslint-disable regexp/prefer-d */
/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-fs-filename */

import getAllNestedFiles from "../utils/getAllNestedFiles";
import { join } from "path";
import fs, { readFileSync } from "fs";
import shell from "shelljs";
import enq from "enquirer";
import { Argv } from "yargs";
import chalk from "chalk";

const { Select } = require("enquirer");

const getAllTags = (files: string[]) => {
  const tags = [];
  for (const i in files) {
    const file = files[i];
    const result = fs.readFileSync(file).toString();
    const pattern = /#[a-z0-9]{1,}/gi;

    let taglist = result.match(pattern);
    if (taglist) {
      taglist = taglist.reduce((prev: any, curr: any) => {
        if (!prev.includes(curr)) {
          prev.push(curr);
          return prev;
        }
        return prev;
      }, []);
      tags.push(...taglist!);
    }
  }
  return tags;
};

const tag = (cli: Argv<{}>) => {
  cli.command(
    "tag [options]",
    "",
    () => {},
    (yrg: any) => {
      const mainDir = join(shell.pwd().stdout);
      const file = fs
        .readdirSync(mainDir)
        ?.filter((item) => item.includes("mocharc"));
      if (file?.length === 0)
        return console.log(chalk.red("mocharc.json Not Found"));
      const mocharc = file[0];

      const readMocharc = readFileSync(join(mainDir, mocharc)).toString();

      const mocharcJson = JSON.parse(readMocharc);

      const trimd = mocharcJson.spec
        ?.split("*")
        ?.filter((item: any) => item && item !== "/" && !item.includes("."))
        ?.join("");

      const rootDir = yrg?.root || trimd || "src";
      const specFile = yrg?.focus || mocharcJson?.file || "spec.ts";

      const specFiles = getAllNestedFiles(rootDir, specFile);
      const tags = getAllTags(specFiles);

      const prmt = new (enq as any).Select({
        name: "tags",
        message: "Pick a tag!",
        choices: tags,
      });

      prmt
        .run()
        .then((tag: string) => {
          shell.exec(`npx mocha -g ${tag} -w`);
        })
        .catch(console.error);
    }
  );
};

export default tag;
