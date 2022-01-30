import chalk from "chalk";

const typingMode = (word: string) => {
  const chunks = word.split("");
  let index = 0;

  const intv = setInterval(() => {
    console.clear();
    const calc = index === chunks.length;
    console.log(
      chalk.blueBright(`${chunks.slice(0, index).join("")}${calc ? "" : "|"}`)
    );
    if (index >= chunks.length) clearInterval(intv);
    else index++;
  }, 100);
};

export default typingMode;
