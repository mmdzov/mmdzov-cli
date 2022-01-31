import shell from "shelljs";

const cliPath = () => {
  shell.cd("/");
  shell.cd(__dirname);
  shell.cd("../../");
};

export default cliPath;
