import fs from "fs";
import { join } from "path";

const copyAllFiles = (input: string, output: string) => {
  const out = output.split("\\");
  const outpath = out.filter((_, index) => index !== out.length - 1).join("\\");
  const outdir = out.filter((_, index) => index === out.length - 1).join("\\");
  const outputdest = `${outpath}\\${outdir}`;
  try {
    fs.opendirSync(outputdest).closeSync();
  } catch (e: any) {
    if (e.code === "ENOENT") fs.mkdirSync(outputdest);
  }
  const dir = fs.readdirSync(input);

  for (let i in dir) {
    const item = dir[i];
    if (!fs.existsSync(join(outputdest, item))) {
      fs.writeFileSync(
        join(outputdest, item),
        fs.readFileSync(join(input, item))
      );
    }
  }
};

export default copyAllFiles;
