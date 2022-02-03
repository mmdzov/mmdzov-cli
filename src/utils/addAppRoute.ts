const addAppRoute = (text: string, name: string) => {
  const chunks = (text! as string)
    .match(/(router.*\[.*\])/g)!
    .join("")
    .split(/[\{\}],?/g);

  let additemToChunk = chunks.map((item, index) => {
    if (index !== 0 && index !== chunks.length - 1) return `{${item}},`;
    return false;
  });

  let filteredChunks: string[] = additemToChunk.filter(
    (item) => item
  ) as string[];

  filteredChunks.push(`{ path: \"/${name}\" , route: ${name}Route },`);

  const index = chunks.findIndex((_, index) => index === chunks.length - 2);

  chunks.splice(1, index, ...filteredChunks);

  let joined = chunks.join("");

  let result = text.replace(/(router.*\[.*\],)/g, joined + ",");

  const importPattern = /(import .*)/gm;

  let imports = result.match(importPattern);

  imports!.push(
    `import ${name}Route from \"./components/${name}/${name}.routes\";`
  );

  result = result.replace(importPattern, "");

  let data = result[result.length - 1].split("\n").filter((item) => item);

  data.unshift(...imports!);

  let _result = result.split(/\s\n/g);

  _result.unshift(data.join("\n"));

  result = _result.join("\n");

  return result;
};

export default addAppRoute;
