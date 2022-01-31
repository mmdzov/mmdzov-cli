import { describe } from "mocha";
import fs from "fs";
import { cwd } from "process";
import path, { join } from "path";
import chalk from "chalk";
import typingMode from "../utils/typingMode";
import copyAllFiles from "../utils/copyAllFiles";

// describe("ten-stack replaces", () => {
// it("should to be replace package.json", () => {
// const route = path.join(cwd(), "/src/ten-stack/package.json");
// const result = fs.readFileSync(route).toString();
// const packageJson = JSON.parse(result);
// packageJson.name = "ten-stack";
// delete packageJson.repository;
// delete packageJson.bugs;
// delete packageJson.homepage;
// fs.writeFileSync(route, JSON.stringify(packageJson));
//   });
// });

// describe("should to be beautiful console.log", () => {
//   it("should to be handle multiple colors", () => {
//     const word = `${chalk.bold(
//       chalk.white("Hi i'm mmdzov")
//     )} I make development and programming very simple. You can try ${chalk.blue(
//       chalk.italic("mmdzov help")
//     )} for more help`;
//     typingMode(word);
//   });
// });