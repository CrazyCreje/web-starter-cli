//This File creates a git repository
const GitAPI = require("nodegit");
class Git {
  constructor(name) {
    this.repoName = name;
  }

  //initializes the git repository
  init() {
    //TODO - make this always go to the same directory, right now it just sticks it wherever you call
    //npm start from
    GitAPI.Repository.init("./projects/" + this.repoName, 0).then(function(
      repo
    ) {
      //if we want to commit stuff to the repository, we do it here
    });
  }
}

module.exports = Git;
