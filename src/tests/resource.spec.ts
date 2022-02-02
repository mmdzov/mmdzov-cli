import { describe } from "mocha";
import { join } from "path";
import copyAllFiles from "../utils/copyAllFiles";
import { cwd } from "process";
import addAppRoute from "./../utils/addAppRoute";
import fs from "fs";

const dest = "C:\\Users\\pars\\Desktop\\@mmdzov\\mmdzov\\$ten-stack\\src";

describe("should to be copy and paste files", async () => {
  // const resName = "shop";
  // it("should to be generate new resource", () => {
  //   const pth = join(dest, `\\components\\${resName}`);

  //   copyAllFiles(pth, join(cwd(), "/resource-example"));
  // });
  // const pth = join(dest, "\\app.ts");
  // const app = fs.readFileSync(pth).toString();
  // if (app.includes(`${resName}.route`)) return;
  // let result = addAppRoute(app, resName);
  // console.log(result);

  // fs.writeFileSync(pth, result);
});

// describe("should to be customize resource", () => {
//   const dest = join(cwd(), "/resource-example/home.controller.ts");
//   const file = fs.readFileSync(dest).toString();
//   let rs = file.replace(/home/gm, "test");
//   rs = rs.replace(/Home/gm, "Test");
//   fs.writeFileSync(dest, rs);
// });
