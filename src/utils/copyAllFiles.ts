import fs from "fs";
import { join } from "path";

const copyAllFiles = (input: string, output: string) => {
  const out = output.split("\\");
  const outpath = out.filter((_, index) => index !== out.length - 1).join("\\");
  const outdir: string = out.filter((_, index) => index === out.length - 1)[0];
  const outputdest = `${outpath}\\${outdir}`;
  try {
    fs.opendirSync(outputdest).closeSync();
  } catch (e: any) {
    if (e.code === "ENOENT") fs.mkdirSync(outputdest);
  }
  const dir = fs.readdirSync(input);

  for (let i in dir) {
    let item = dir[i];
    item = item.replace(/home/gm, outdir);
    if (!fs.existsSync(join(outputdest, item))) {
      const file = fs.readFileSync(join(input, dir[i])).toString();

      const resourceName = outdir
        .split("")
        .map((item, index) => {
          if (index === 0) return item.toUpperCase();
          return item.toLowerCase();
        })
        .join("");

      let overwrite = file.replace(/home/gm, outdir);

      overwrite = overwrite.replace(/Home/gm, resourceName);

      if (item.includes("spec")) {
        overwrite = overwrite
          .replace(/test GET \//gm, `test GET /${outdir}`)
          .replace(/.get(.*)/gm, `.get(\"/${outdir}\")`);
      }

      if (item.includes("route")) {
        overwrite = overwrite.replace(/.get(\(\"\/")/gm, `.get(\"/${outdir}\"`);
      }

      fs.writeFileSync(join(outputdest, item), overwrite);
    }
  }
};

export default copyAllFiles;
