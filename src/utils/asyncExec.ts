import { exec, ExecOptions } from "child_process";

function asyncExec(cmd: string, options: Partial<ExecOptions> = {}) {
  return new Promise((res, rej) => {
    exec(cmd, options, (err, stdout, stderr) => {
      if (err) rej(err);
      res(stdout ? stdout : stderr);
    });
  });
}

export default asyncExec;
