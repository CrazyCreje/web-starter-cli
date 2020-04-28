const shell = require("shelljs");

exports.deps = async pm => {
  if (pm === "npm") {
    // detect package manager and install
    if (shell.exec("npm install").code !== 0) {
      shell.echo("Error: npm install failed");
      //shell.exit(1); TODO make this not exit with a 1
    }
  } else {
    if (shell.exec("yarn").code !== 0) {
      shell.echo("Error: yarn failed");
    }
  }
};
