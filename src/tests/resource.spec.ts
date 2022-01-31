import { describe } from "mocha";
import { join } from "path";
import copyAllFiles from "../utils/copyAllFiles";
import { cwd } from "process";

describe("should to be copy and paste files", () => {
  it("should to be generate new resource", () => {
    const dest =
      "C:\\Users\\pars\\Desktop\\@mmdzov\\mmdzov\\$ten-stack\\src\\components\\home";
    const pth = join(dest);

    copyAllFiles(pth, join(cwd(), "/resource-example"));
  });
});

// describe("should to be customize resource", () => {
//   const dest = join(cwd(), "/resource-example/home.controller.ts");
//   const file = fs.readFileSync(dest).toString();
//   let rs = file.replace(/home/gm, "test");
//   rs = rs.replace(/Home/gm, "Test");
//   fs.writeFileSync(dest, rs);
// });
