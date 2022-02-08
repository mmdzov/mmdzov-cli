import { routePattern } from "./patterns";

const addAppRoute = (text: string, name: string) => {
  const routePath = `{ path: \"/${name}\" , route: ${name.toUpperCase()}_ROUTE },`;
  const importRoute = `import ${name.toUpperCase()}_ROUTE from \"./components/${name}/${name}.routes\";`;

  let chunks = (text! as string)
    .match(routePattern)!
    .join("")
    .split(/[\{\}],?/g);

  chunks = chunks.filter((item) => item.trim().length > 0);

  chunks = chunks.map((item, i) => {
    item = item.trim();
    if (i !== 0 && i !== chunks.length - 1) {
      return `{ ${item} },`;
    }
    return item;
  });

  chunks.splice(chunks.length - 1, 0, routePath);

  let result = text.replace(routePattern, chunks.join("\n"));

  const importPattern = /(import .*)/gm;

  let imports = result.match(importPattern);

  imports!.push(importRoute);

  result = result.replace(importPattern, "");

  let data = result[result.length - 1].split("\n").filter((item) => item);

  data.unshift(...imports!);

  let _result = result.split(/\s\n/g);

  _result.unshift(data.join("\n"));

  result = _result.join("\n");

  return result;
};

export default addAppRoute;
