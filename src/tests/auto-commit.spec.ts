import { exec } from "child_process";
import { describe } from "mocha";

describe("should to be add commit", () => {
  exec(
    'mmdzov auto-commit -s 1 -m "hello world" --path C:\\Users\\pars\\Desktop\\@mmdzov\\autocommit',
    (err, stdout, stderr) => {
      //   console.log(err, stdout, stderr);
    }
  );
});
