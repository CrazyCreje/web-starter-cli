//This File creates a git repository
const shell = require("shelljs");

class Git {
  constructor(name, projectDir) {
    this.repoName = name;
    this.projectDir = projectDir;
  }
  //initializes the git repository
  init() {
    shell.exec("git init " + this.projectDir + this.repoName);
  }
}

module.exports = Git;
