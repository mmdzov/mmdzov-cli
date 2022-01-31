import shell from "shelljs";

const cliPath = () => {
  shell.cd("/");
  shell.cd(__dirname);
  shell.cd("../../");
  return shell.pwd().stdout;
};

export default cliPath;
