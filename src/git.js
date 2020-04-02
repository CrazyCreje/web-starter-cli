//This File creates a git repository
const shell = require("shelljs");

class Git {
  constructor(name) {
    this.repoName = name;
  }

  //initializes the git repository
  init() {
    shell.exec("git init ~/web-starter-projects/" + this.repoName)
  }
}

module.exports = Git;
