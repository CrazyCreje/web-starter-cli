const shell = require("shelljs");
// const GitAPI = require("nodegit");

exports.react = async name => {
  // const clone =
  //   "git clone --depth=1 https://github.com/react-boilerplate/react-boilerplate.git ./res/react";

  // if (shell.exec(clone).code !== 0) {
  //   shell.echo("Error: Git clone failed");
  //   shell.exit(1);
  // }
  //if res/react exists cd into that dir and pull
  //else clone the directory
  //copy react-boilerplate's contents into new git repo
  // if (
  //   shell.rm("-rf", "./res/react/.git", "./res/react/.gitignore", "./res/react/.github").code !== 0
  // ) {
  //   shell.echo("Error: Copying react resources failed");
  //   shell.exit(1);
  // }

  if (
    shell.cp(
      "-r",
      "./templates/react/*",
      "./templates/react/.*",
      `~/web-starter-projects/${name}`
    ).code !== 0
  ) {
    shell.echo("Error: Copying react resources failed");
    shell.exit(1);
  }

  //switch working directory
  if (shell.cd(`~/web-starter-projects/${name}`).code != 0) {
    shell.echo("Error: Copying react resources failed");
    shell.exit(1);
  }

  if (shell.exec("npm install").code !== 0) {
    shell.echo("Error: npm install failed");
    //shell.exit(1); TODO make this not exit with a 1
  }


};
