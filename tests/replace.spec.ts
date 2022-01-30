import { describe } from "mocha";
import fs from "fs";
import { cwd } from "process";
import path from "path";

describe("ten-stack replaces", () => {
  it("should to be replace package.json", () => {
    const route = path.join(cwd(), "/src/ten-stack/package.json");
    const result = fs.readFileSync(route).toString();
    const packageJson = JSON.parse(result);
    packageJson.name = "ten-stack";
    delete packageJson.repository;
    delete packageJson.bugs;
    delete packageJson.homepage;
    fs.writeFileSync(route, JSON.stringify(packageJson));
  });
});
